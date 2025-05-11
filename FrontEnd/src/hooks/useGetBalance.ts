import { useEffect, useState } from "react";
import { ethers } from "ethers";

import type { TreeToken } from "../../../HardHat/typechain-types/contracts/TreeToken";
import { TreeToken__factory } from "../../../HardHat/typechain-types/factories/contracts/TreeToken__factory";

const useGetBalance = (
  contractAddress: string,
  signer: ethers.JsonRpcSigner | null,
  account: string | null,
  formatted: boolean = false
) => {
  const [balance, setBalance] = useState<bigint | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [symbol, setSymbol] = useState<string | null>(null);
  const [supply, setSupply] = useState<bigint | null>(null);

  useEffect(() => {
    const getBalance = async () => {
    if(!signer || !account) return;
      try {
        const contract = TreeToken__factory.connect(contractAddress, signer);
        const result = await contract.getBalance(account);
        const supp = await contract.totalSupply();
        const symb = await contract.symbol();
        setSymbol(symb);

        if(formatted) {
            const deci = await contract.decimals();
            const factor = 10n ** BigInt(deci);
            const resultFormatted = result / factor;
            const suppFormatted = supp / factor;
            setBalance(resultFormatted);
            setSupply(suppFormatted);
        } else {
            setBalance(result);       
            setSupply(supp);
        }
        console.log(result);
      } catch (error) {
        setError(`Error to trying get balance from: ${account}`)
      } finally {
        setLoading(false);
      }
    };
    if(account) getBalance();
  }, [contractAddress, signer, account]);

  return {balance, loading, error, symbol, supply}

};

export default useGetBalance;
