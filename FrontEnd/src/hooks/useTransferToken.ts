import { useState } from "react";
import { ethers } from "ethers";

import type { TreeToken } from "../../../HardHat/typechain-types/contracts/TreeToken";
import { TreeToken__factory } from "../../../HardHat/typechain-types/factories/contracts/TreeToken__factory";

const useTransferToken = (
  contractAddress: string,
  signer: ethers.JsonRpcSigner | null
) => {
  const [isLoadingTransfer, setIsLoadingTransfer] = useState<boolean>(false);

  const transferToken = async (account: string, amount: bigint) => {
    if (!signer) return;
    setIsLoadingTransfer(true);
    try {
      const contract = TreeToken__factory.connect(contractAddress, signer);
      await contract.transfer(account, amount);
    } catch (error) {
      console.log(error);
      alert(`Error to trying transfer token from: ${account}`);
    } finally {
      setIsLoadingTransfer(false);
    }
  };

  return { transferToken, isLoadingTransfer };
};

export default useTransferToken;
