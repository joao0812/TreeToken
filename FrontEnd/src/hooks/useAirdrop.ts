import { useState } from "react";
import { ethers } from "ethers";

import type { TreeToken } from "../../../HardHat/typechain-types/contracts/TreeToken";
import { TreeToken__factory } from "../../../HardHat/typechain-types/factories/contracts/TreeToken__factory";

const useAirdropTokens = (
  contractAddress: string,
  signer: ethers.JsonRpcSigner | null
) => {
  const [isLoadingAirdrop, setisLoadingAirdrop] = useState<boolean>(false);

  const airdropToken = async (accounts: string[], amount: bigint) => {
    if (!signer) return;
    setisLoadingAirdrop(true);
    try {
      const contract = TreeToken__factory.connect(contractAddress, signer);
      await contract.airDrop(accounts, amount);
    } catch (error) {
      console.log(error);
      alert(`Error to trying airdrop token from: ${accounts}`);
    } finally {
      setisLoadingAirdrop(false);
    }
  };

  return { airdropToken, isLoadingAirdrop };
};

export default useAirdropTokens;
