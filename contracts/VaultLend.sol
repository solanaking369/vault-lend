// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract VaultLend is SepoliaConfig {
    using FHE for *;
    
    struct Loan {
        euint32 loanId;
        euint32 amount;
        euint32 interestRate;
        euint32 duration;
        euint32 collateralValue;
        bool isActive;
        bool isRepaid;
        address borrower;
        address lender;
        uint256 createdAt;
        uint256 dueDate;
        string purpose;
    }
    
    struct LendingPool {
        euint32 poolId;
        euint32 totalLiquidity;
        euint32 availableLiquidity;
        euint32 totalLoans;
        euint32 defaultRate;
        bool isActive;
        address poolOwner;
        string name;
        string description;
    }
    
    struct Repayment {
        euint32 repaymentId;
        euint32 amount;
        euint32 interestPaid;
        uint256 timestamp;
        address payer;
    }
    
    mapping(uint256 => Loan) public loans;
    mapping(uint256 => LendingPool) public lendingPools;
    mapping(uint256 => Repayment) public repayments;
    mapping(address => euint32) public borrowerCreditScore;
    mapping(address => euint32) public lenderReputation;
    mapping(address => euint32) public totalBorrowed;
    mapping(address => euint32) public totalLent;
    
    uint256 public loanCounter;
    uint256 public poolCounter;
    uint256 public repaymentCounter;
    
    address public owner;
    address public verifier;
    euint32 public platformFee;
    
    event LoanCreated(uint256 indexed loanId, address indexed borrower, uint32 amount);
    event LoanFunded(uint256 indexed loanId, address indexed lender, uint32 amount);
    event LoanRepaid(uint256 indexed loanId, uint32 amount, uint32 interest);
    event PoolCreated(uint256 indexed poolId, address indexed owner, string name);
    event PoolLiquidityAdded(uint256 indexed poolId, uint32 amount);
    event CreditScoreUpdated(address indexed borrower, uint32 score);
    event ReputationUpdated(address indexed lender, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
        platformFee = FHE.asEuint32(250); // 2.5% platform fee (250 basis points)
    }
    
    function createLoan(
        externalEuint32 amount,
        externalEuint32 interestRate,
        externalEuint32 duration,
        externalEuint32 collateralValue,
        string memory purpose,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(purpose).length > 0, "Purpose cannot be empty");
        
        uint256 loanId = loanCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        euint32 internalInterestRate = FHE.fromExternal(interestRate, inputProof);
        euint32 internalDuration = FHE.fromExternal(duration, inputProof);
        euint32 internalCollateralValue = FHE.fromExternal(collateralValue, inputProof);
        
        loans[loanId] = Loan({
            loanId: FHE.asEuint32(0), // Will be set properly later
            amount: internalAmount,
            interestRate: internalInterestRate,
            duration: internalDuration,
            collateralValue: internalCollateralValue,
            isActive: true,
            isRepaid: false,
            borrower: msg.sender,
            lender: address(0),
            createdAt: block.timestamp,
            dueDate: block.timestamp + 30 days, // Default 30 days, will be updated with actual duration
            purpose: purpose
        });
        
        emit LoanCreated(loanId, msg.sender, 0); // Amount will be decrypted off-chain
        return loanId;
    }
    
    function fundLoan(
        uint256 loanId,
        uint256 poolId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public {
        require(loans[loanId].borrower != address(0), "Loan does not exist");
        require(loans[loanId].isActive, "Loan is not active");
        require(loans[loanId].lender == address(0), "Loan already funded");
        require(lendingPools[poolId].isActive, "Pool is not active");
        
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        // Update loan with lender
        loans[loanId].lender = msg.sender;
        
        // Update pool liquidity
        lendingPools[poolId].availableLiquidity = FHE.sub(lendingPools[poolId].availableLiquidity, internalAmount);
        lendingPools[poolId].totalLoans = FHE.add(lendingPools[poolId].totalLoans, FHE.asEuint32(1));
        
        // Update lender stats
        totalLent[msg.sender] = FHE.add(totalLent[msg.sender], internalAmount);
        
        emit LoanFunded(loanId, msg.sender, 0); // Amount will be decrypted off-chain
    }
    
    function repayLoan(
        uint256 loanId,
        externalEuint32 amount,
        externalEuint32 interestAmount,
        bytes calldata inputProof
    ) public {
        require(loans[loanId].borrower == msg.sender, "Only borrower can repay");
        require(loans[loanId].isActive, "Loan is not active");
        require(!loans[loanId].isRepaid, "Loan already repaid");
        
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        euint32 internalInterestAmount = FHE.fromExternal(interestAmount, inputProof);
        
        uint256 repaymentId = repaymentCounter++;
        
        repayments[repaymentId] = Repayment({
            repaymentId: FHE.asEuint32(0), // Will be set properly later
            amount: internalAmount,
            interestPaid: internalInterestAmount,
            timestamp: block.timestamp,
            payer: msg.sender
        });
        
        // Mark loan as repaid
        loans[loanId].isRepaid = true;
        loans[loanId].isActive = false;
        
        // Update borrower stats
        totalBorrowed[msg.sender] = FHE.add(totalBorrowed[msg.sender], internalAmount);
        
        emit LoanRepaid(loanId, 0, 0); // Amounts will be decrypted off-chain
    }
    
    function createLendingPool(
        string memory name,
        string memory description,
        externalEuint32 initialLiquidity,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(name).length > 0, "Pool name cannot be empty");
        require(bytes(description).length > 0, "Pool description cannot be empty");
        
        uint256 poolId = poolCounter++;
        
        euint32 internalLiquidity = FHE.fromExternal(initialLiquidity, inputProof);
        
        lendingPools[poolId] = LendingPool({
            poolId: FHE.asEuint32(0), // Will be set properly later
            totalLiquidity: internalLiquidity,
            availableLiquidity: internalLiquidity,
            totalLoans: FHE.asEuint32(0),
            defaultRate: FHE.asEuint32(0),
            isActive: true,
            poolOwner: msg.sender,
            name: name,
            description: description
        });
        
        emit PoolCreated(poolId, msg.sender, name);
        return poolId;
    }
    
    function addLiquidityToPool(
        uint256 poolId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public {
        require(lendingPools[poolId].poolOwner == msg.sender, "Only pool owner can add liquidity");
        require(lendingPools[poolId].isActive, "Pool is not active");
        
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        lendingPools[poolId].totalLiquidity = FHE.add(lendingPools[poolId].totalLiquidity, internalAmount);
        lendingPools[poolId].availableLiquidity = FHE.add(lendingPools[poolId].availableLiquidity, internalAmount);
        
        emit PoolLiquidityAdded(poolId, 0); // Amount will be decrypted off-chain
    }
    
    function updateCreditScore(
        address borrower,
        externalEuint32 score,
        bytes calldata inputProof
    ) public {
        require(msg.sender == verifier, "Only verifier can update credit score");
        require(borrower != address(0), "Invalid borrower address");
        
        euint32 internalScore = FHE.fromExternal(score, inputProof);
        borrowerCreditScore[borrower] = internalScore;
        
        emit CreditScoreUpdated(borrower, 0); // Score will be decrypted off-chain
    }
    
    function updateLenderReputation(
        address lender,
        externalEuint32 reputation,
        bytes calldata inputProof
    ) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(lender != address(0), "Invalid lender address");
        
        euint32 internalReputation = FHE.fromExternal(reputation, inputProof);
        lenderReputation[lender] = internalReputation;
        
        emit ReputationUpdated(lender, 0); // Reputation will be decrypted off-chain
    }
    
    function getLoanInfo(uint256 loanId) public view returns (
        uint8 amount,
        uint8 interestRate,
        uint8 duration,
        uint8 collateralValue,
        bool isActive,
        bool isRepaid,
        address borrower,
        address lender,
        uint256 createdAt,
        uint256 dueDate,
        string memory purpose
    ) {
        Loan storage loan = loans[loanId];
        return (
            0, // FHE.decrypt(loan.amount) - will be decrypted off-chain
            0, // FHE.decrypt(loan.interestRate) - will be decrypted off-chain
            0, // FHE.decrypt(loan.duration) - will be decrypted off-chain
            0, // FHE.decrypt(loan.collateralValue) - will be decrypted off-chain
            loan.isActive,
            loan.isRepaid,
            loan.borrower,
            loan.lender,
            loan.createdAt,
            loan.dueDate,
            loan.purpose
        );
    }
    
    function getPoolInfo(uint256 poolId) public view returns (
        uint8 totalLiquidity,
        uint8 availableLiquidity,
        uint8 totalLoans,
        uint8 defaultRate,
        bool isActive,
        address poolOwner,
        string memory name,
        string memory description
    ) {
        LendingPool storage pool = lendingPools[poolId];
        return (
            0, // FHE.decrypt(pool.totalLiquidity) - will be decrypted off-chain
            0, // FHE.decrypt(pool.availableLiquidity) - will be decrypted off-chain
            0, // FHE.decrypt(pool.totalLoans) - will be decrypted off-chain
            0, // FHE.decrypt(pool.defaultRate) - will be decrypted off-chain
            pool.isActive,
            pool.poolOwner,
            pool.name,
            pool.description
        );
    }
    
    function getBorrowerCreditScore(address borrower) public view returns (uint8) {
        return 0; // FHE.decrypt(borrowerCreditScore[borrower]) - will be decrypted off-chain
    }
    
    function getLenderReputation(address lender) public view returns (uint8) {
        return 0; // FHE.decrypt(lenderReputation[lender]) - will be decrypted off-chain
    }
    
    function calculateInterest(
        externalEuint32 principal,
        externalEuint32 rate,
        externalEuint32 time,
        bytes calldata inputProof
    ) public pure returns (externalEuint32) {
        // This function would calculate compound interest using FHE operations
        // Implementation would depend on specific FHE library capabilities
        euint32 internalPrincipal = FHE.fromExternal(principal, inputProof);
        euint32 internalRate = FHE.fromExternal(rate, inputProof);
        euint32 internalTime = FHE.fromExternal(time, inputProof);
        
        // Simple interest calculation: principal * rate * time / 10000 (for basis points)
        euint32 interest = FHE.mul(FHE.mul(internalPrincipal, internalRate), internalTime);
        interest = FHE.div(interest, FHE.asEuint32(10000));
        
        // Return as external encrypted value
        return FHE.toExternal(interest);
    }
    
    function liquidateCollateral(uint256 loanId) public {
        require(loans[loanId].lender == msg.sender, "Only lender can liquidate");
        require(loans[loanId].isActive, "Loan is not active");
        require(block.timestamp > loans[loanId].dueDate, "Loan not yet due");
        
        // Mark loan as inactive
        loans[loanId].isActive = false;
        
        // In a real implementation, collateral would be transferred to lender
        // This is a simplified version
    }
    
    function withdrawPlatformFees() public {
        require(msg.sender == owner, "Only owner can withdraw fees");
        
        // In a real implementation, accumulated platform fees would be transferred
        // This is a simplified version
    }
}
