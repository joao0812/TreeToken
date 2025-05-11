import { useState } from "react";
import { ethers } from "ethers";

import type { TreeToken } from "../../../HardHat/typechain-types/contracts/TreeToken";
import { TreeToken__factory } from "../../../HardHat/typechain-types/factories/contracts/TreeToken__factory";

const useBurnToken = (
  contractAddress: string,
  signer: ethers.JsonRpcSigner | null
) => {
  const [isLoadingBurn, setIsLoadingBurn] = useState<boolean>(false);

  const burnToken = async (account: string, amount: bigint) => {
    if (!signer) return;
    setIsLoadingBurn(true);
    try {
      const contract = TreeToken__factory.connect(contractAddress, signer);
      await contract.burn(account, amount);
    } catch (error) {
      alert(`Error to trying burn token from: ${account}`);
    } finally {
      setIsLoadingBurn(false);
    }
  };

  return { burnToken, isLoadingBurn };
};

export default useBurnToken;
