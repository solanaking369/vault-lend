import { useState, useCallback } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import ContractService from '@/services/contractService';
import { toast } from 'sonner';

export const useContract = () => {
  const { web3, account, isConnected } = useWallet();
  const [loading, setLoading] = useState(false);
  const [contractService, setContractService] = useState<ContractService | null>(null);

  // Initialize contract service when wallet connects
  const initializeContract = useCallback(() => {
    if (web3 && account && isConnected) {
      const service = new ContractService(web3, account);
      setContractService(service);
    }
  }, [web3, account, isConnected]);

  // Create encrypted loan
  const createLoan = useCallback(async (
    amount: number,
    interestRate: number,
    duration: number,
    collateralValue: number,
    purpose: string
  ) => {
    if (!contractService) {
      toast.error('Contract service not initialized');
      return null;
    }

    setLoading(true);
    try {
      const result = await contractService.createEncryptedLoan(
        amount,
        interestRate,
        duration,
        collateralValue,
        purpose
      );
      
      toast.success('Encrypted loan created successfully!');
      return result;
    } catch (error: any) {
      toast.error(`Failed to create loan: ${error.message}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, [contractService]);

  // Fund a loan
  const fundLoan = useCallback(async (loanId: number, poolId: number, amount: number) => {
    if (!contractService) {
      toast.error('Contract service not initialized');
      return null;
    }

    setLoading(true);
    try {
      const result = await contractService.fundLoan(loanId, poolId, amount);
      toast.success('Loan funded successfully!');
      return result;
    } catch (error: any) {
      toast.error(`Failed to fund loan: ${error.message}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, [contractService]);

  // Repay loan
  const repayLoan = useCallback(async (loanId: number, amount: number, interestAmount: number) => {
    if (!contractService) {
      toast.error('Contract service not initialized');
      return null;
    }

    setLoading(true);
    try {
      const result = await contractService.repayLoan(loanId, amount, interestAmount);
      toast.success('Loan repaid successfully!');
      return result;
    } catch (error: any) {
      toast.error(`Failed to repay loan: ${error.message}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, [contractService]);

  // Get loan information
  const getLoanInfo = useCallback(async (loanId: number) => {
    if (!contractService) {
      toast.error('Contract service not initialized');
      return null;
    }

    try {
      const result = await contractService.getLoanInfo(loanId);
      return result;
    } catch (error: any) {
      toast.error(`Failed to get loan info: ${error.message}`);
      return null;
    }
  }, [contractService]);

  // FHE operations
  const fheAdd = useCallback(async (a: number, b: number) => {
    if (!contractService) {
      toast.error('Contract service not initialized');
      return null;
    }

    try {
      const result = await contractService.fheAdd(a, b);
      return result;
    } catch (error: any) {
      toast.error(`FHE addition failed: ${error.message}`);
      return null;
    }
  }, [contractService]);

  const fheMul = useCallback(async (a: number, b: number) => {
    if (!contractService) {
      toast.error('Contract service not initialized');
      return null;
    }

    try {
      const result = await contractService.fheMul(a, b);
      return result;
    } catch (error: any) {
      toast.error(`FHE multiplication failed: ${error.message}`);
      return null;
    }
  }, [contractService]);

  // Calculate encrypted interest
  const calculateInterest = useCallback(async (principal: number, rate: number, time: number) => {
    if (!contractService) {
      toast.error('Contract service not initialized');
      return null;
    }

    try {
      const result = await contractService.calculateEncryptedInterest(principal, rate, time);
      return result;
    } catch (error: any) {
      toast.error(`Interest calculation failed: ${error.message}`);
      return null;
    }
  }, [contractService]);

  // Get loan events
  const getLoanEvents = useCallback(async (fromBlock: number = 0, toBlock: number | string = 'latest') => {
    if (!contractService) {
      toast.error('Contract service not initialized');
      return null;
    }

    try {
      const result = await contractService.getLoanCreatedEvents(fromBlock, toBlock);
      return result;
    } catch (error: any) {
      toast.error(`Failed to get loan events: ${error.message}`);
      return null;
    }
  }, [contractService]);

  return {
    loading,
    contractService,
    initializeContract,
    createLoan,
    fundLoan,
    repayLoan,
    getLoanInfo,
    fheAdd,
    fheMul,
    calculateInterest,
    getLoanEvents
  };
};

export default useContract;
