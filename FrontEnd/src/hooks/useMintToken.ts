import { useState } from "react";
import { ethers } from "ethers";

import type { TreeToken } from "../../../HardHat/typechain-types/contracts/TreeToken";
import { TreeToken__factory } from "../../../HardHat/typechain-types/factories/contracts/TreeToken__factory";

const useMintToken = (
  contractAddress: string,
  signer: ethers.JsonRpcSigner | null
) => {
  const [isLoadingMint, setIsLoadingMint] = useState<boolean>(false);

  const mintToken = async (amount: bigint) => {
    if (!signer) return;
    setIsLoadingMint(true);
    try {
      const contract = TreeToken__factory.connect(contractAddress, signer);
      await contract.mint(amount);
    } catch (error) {
      console.log(error);
      alert(`Error to trying mint token from contract: ${contractAddress}`);
    } finally {
      setIsLoadingMint(false);
    }
  };

  return { mintToken, isLoadingMint };
};

export default useMintToken;
