// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract FHEOperations is SepoliaConfig {
    using FHE for *;
    
    // Advanced FHE mathematical operations
    function fheAdd(externalEuint32 a, externalEuint32 b, bytes calldata inputProof) 
        public pure returns (externalEuint32) {
        euint32 internalA = FHE.fromExternal(a, inputProof);
        euint32 internalB = FHE.fromExternal(b, inputProof);
        euint32 result = FHE.add(internalA, internalB);
        return FHE.toExternal(result);
    }
    
    function fheSub(externalEuint32 a, externalEuint32 b, bytes calldata inputProof) 
        public pure returns (externalEuint32) {
        euint32 internalA = FHE.fromExternal(a, inputProof);
        euint32 internalB = FHE.fromExternal(b, inputProof);
        euint32 result = FHE.sub(internalA, internalB);
        return FHE.toExternal(result);
    }
    
    function fheMul(externalEuint32 a, externalEuint32 b, bytes calldata inputProof) 
        public pure returns (externalEuint32) {
        euint32 internalA = FHE.fromExternal(a, inputProof);
        euint32 internalB = FHE.fromExternal(b, inputProof);
        euint32 result = FHE.mul(internalA, internalB);
        return FHE.toExternal(result);
    }
    
    function fheDiv(externalEuint32 a, externalEuint32 b, bytes calldata inputProof) 
        public pure returns (externalEuint32) {
        euint32 internalA = FHE.fromExternal(a, inputProof);
        euint32 internalB = FHE.fromExternal(b, inputProof);
        euint32 result = FHE.div(internalA, internalB);
        return FHE.toExternal(result);
    }
    
    function fheMod(externalEuint32 a, externalEuint32 b, bytes calldata inputProof) 
        public pure returns (externalEuint32) {
        euint32 internalA = FHE.fromExternal(a, inputProof);
        euint32 internalB = FHE.fromExternal(b, inputProof);
        euint32 result = FHE.mod(internalA, internalB);
        return FHE.toExternal(result);
    }
    
    // Comparison operations
    function fheEq(externalEuint32 a, externalEuint32 b, bytes calldata inputProof) 
        public pure returns (ebool) {
        euint32 internalA = FHE.fromExternal(a, inputProof);
        euint32 internalB = FHE.fromExternal(b, inputProof);
        return FHE.eq(internalA, internalB);
    }
    
    function fheLt(externalEuint32 a, externalEuint32 b, bytes calldata inputProof) 
        public pure returns (ebool) {
        euint32 internalA = FHE.fromExternal(a, inputProof);
        euint32 internalB = FHE.fromExternal(b, inputProof);
        return FHE.lt(internalA, internalB);
    }
    
    function fheLe(externalEuint32 a, externalEuint32 b, bytes calldata inputProof) 
        public pure returns (ebool) {
        euint32 internalA = FHE.fromExternal(a, inputProof);
        euint32 internalB = FHE.fromExternal(b, inputProof);
        return FHE.le(internalA, internalB);
    }
    
    function fheGt(externalEuint32 a, externalEuint32 b, bytes calldata inputProof) 
        public pure returns (ebool) {
        euint32 a, externalEuint32 b, bytes calldata inputProof) 
        public pure returns (ebool) {
        euint32 internalA = FHE.fromExternal(a, inputProof);
        euint32 internalB = FHE.fromExternal(b, inputProof);
        return FHE.gt(internalA, internalB);
    }
    
    function fheGe(externalEuint32 a, externalEuint32 b, bytes calldata inputProof) 
        public pure returns (ebool) {
        euint32 internalA = FHE.fromExternal(a, inputProof);
        euint32 internalB = FHE.fromExternal(b, inputProof);
        return FHE.ge(internalA, internalB);
    }
    
    // Financial calculations
    function calculateCompoundInterest(
        externalEuint32 principal,
        externalEuint32 rate,
        externalEuint32 time,
        bytes calldata inputProof
    ) public pure returns (externalEuint32) {
        euint32 internalPrincipal = FHE.fromExternal(principal, inputProof);
        euint32 internalRate = FHE.fromExternal(rate, inputProof);
        euint32 internalTime = FHE.fromExternal(time, inputProof);
        
        // Compound interest: A = P(1 + r/n)^(nt)
        // Simplified version: A = P * (1 + r)^t
        euint32 one = FHE.asEuint32(10000); // 1.0000 in basis points
        euint32 ratePlusOne = FHE.add(one, internalRate);
        euint32 powerResult = FHE.pow(ratePlusOne, internalTime);
        euint32 result = FHE.mul(internalPrincipal, powerResult);
        
        return FHE.toExternal(result);
    }
    
    function calculateSimpleInterest(
        externalEuint32 principal,
        externalEuint32 rate,
        externalEuint32 time,
        bytes calldata inputProof
    ) public pure returns (externalEuint32) {
        euint32 internalPrincipal = FHE.fromExternal(principal, inputProof);
        euint32 internalRate = FHE.fromExternal(rate, inputProof);
        euint32 internalTime = FHE.fromExternal(time, inputProof);
        
        // Simple interest: I = P * r * t
        euint32 interest = FHE.mul(FHE.mul(internalPrincipal, internalRate), internalTime);
        interest = FHE.div(interest, FHE.asEuint32(10000)); // Convert from basis points
        
        return FHE.toExternal(interest);
    }
    
    function calculateLoanToValueRatio(
        externalEuint32 loanAmount,
        externalEuint32 collateralValue,
        bytes calldata inputProof
    ) public pure returns (externalEuint32) {
        euint32 internalLoanAmount = FHE.fromExternal(loanAmount, inputProof);
        euint32 internalCollateralValue = FHE.fromExternal(collateralValue, inputProof);
        
        // LTV = (loan amount / collateral value) * 100
        euint32 ratio = FHE.div(internalLoanAmount, internalCollateralValue);
        ratio = FHE.mul(ratio, FHE.asEuint32(100));
        
        return FHE.toExternal(ratio);
    }
    
    function calculateDebtToIncomeRatio(
        externalEuint32 monthlyDebt,
        externalEuint32 monthlyIncome,
        bytes calldata inputProof
    ) public pure returns (externalEuint32) {
        euint32 internalDebt = FHE.fromExternal(monthlyDebt, inputProof);
        euint32 internalIncome = FHE.fromExternal(monthlyIncome, inputProof);
        
        // DTI = (monthly debt / monthly income) * 100
        euint32 ratio = FHE.div(internalDebt, internalIncome);
        ratio = FHE.mul(ratio, FHE.asEuint32(100));
        
        return FHE.toExternal(ratio);
    }
    
    // Risk assessment functions
    function calculateRiskScore(
        externalEuint32 creditScore,
        externalEuint32 loanAmount,
        externalEuint32 collateralValue,
        externalEuint32 loanDuration,
        bytes calldata inputProof
    ) public pure returns (externalEuint32) {
        euint32 internalCreditScore = FHE.fromExternal(creditScore, inputProof);
        euint32 internalLoanAmount = FHE.fromExternal(loanAmount, inputProof);
        euint32 internalCollateralValue = FHE.fromExternal(collateralValue, inputProof);
        euint32 internalLoanDuration = FHE.fromExternal(loanDuration, inputProof);
        
        // Risk score calculation (simplified)
        // Higher credit score = lower risk
        // Higher LTV = higher risk
        // Longer duration = higher risk
        
        euint32 ltv = FHE.div(internalLoanAmount, internalCollateralValue);
        euint32 durationRisk = FHE.mul(internalLoanDuration, FHE.asEuint32(10));
        
        // Risk score = (1000 - credit score) + (ltv * 100) + duration risk
        euint32 baseRisk = FHE.sub(FHE.asEuint32(1000), internalCreditScore);
        euint32 ltvRisk = FHE.mul(ltv, FHE.asEuint32(100));
        euint32 totalRisk = FHE.add(FHE.add(baseRisk, ltvRisk), durationRisk);
        
        return FHE.toExternal(totalRisk);
    }
    
    // Utility functions
    function fheMin(externalEuint32 a, externalEuint32 b, bytes calldata inputProof) 
        public pure returns (externalEuint32) {
        euint32 internalA = FHE.fromExternal(a, inputProof);
        euint32 internalB = FHE.fromExternal(b, inputProof);
        ebool aIsLess = FHE.lt(internalA, internalB);
        euint32 result = FHE.select(aIsLess, internalA, internalB);
        return FHE.toExternal(result);
    }
    
    function fheMax(externalEuint32 a, externalEuint32 b, bytes calldata inputProof) 
        public pure returns (externalEuint32) {
        euint32 internalA = FHE.fromExternal(a, inputProof);
        euint32 internalB = FHE.fromExternal(b, inputProof);
        ebool aIsGreater = FHE.gt(internalA, internalB);
        euint32 result = FHE.select(aIsGreater, internalA, internalB);
        return FHE.toExternal(result);
    }
    
    function fheAbs(externalEuint32 a, bytes calldata inputProof) 
        public pure returns (externalEuint32) {
        euint32 internalA = FHE.fromExternal(a, inputProof);
        // For uint32, absolute value is the same as the value itself
        return FHE.toExternal(internalA);
    }
    
    // Statistical functions
    function fheAverage(
        externalEuint32[] calldata values,
        bytes calldata inputProof
    ) public pure returns (externalEuint32) {
        require(values.length > 0, "Array cannot be empty");
        
        euint32 sum = FHE.asEuint32(0);
        euint32 count = FHE.asEuint32(values.length);
        
        for (uint256 i = 0; i < values.length; i++) {
            euint32 value = FHE.fromExternal(values[i], inputProof);
            sum = FHE.add(sum, value);
        }
        
        euint32 average = FHE.div(sum, count);
        return FHE.toExternal(average);
    }
    
    function fheSum(
        externalEuint32[] calldata values,
        bytes calldata inputProof
    ) public pure returns (externalEuint32) {
        euint32 sum = FHE.asEuint32(0);
        
        for (uint256 i = 0; i < values.length; i++) {
            euint32 value = FHE.fromExternal(values[i], inputProof);
            sum = FHE.add(sum, value);
        }
        
        return FHE.toExternal(sum);
    }
}
