import { useEffect, useState } from "react";
import { ethers } from "ethers";

import type { TreeToken } from "../../../HardHat/typechain-types/contracts/TreeToken";
import { TreeToken__factory } from "../../../HardHat/typechain-types/factories/contracts/TreeToken__factory";

const useGetOwner = (
  contractAddress: string,
  signer: ethers.JsonRpcSigner | null
) => {
  const [owner, setOwner] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);

  useEffect(() => {
    if (!contractAddress || !signer) return;
    const getContractOwner = async () => {
      try {
        const contract = TreeToken__factory.connect(contractAddress);
        const contractOwner = await contract.owner();
        const userAddress = await signer.getAddress();
        console.log(contractAddress)
        console.log(userAddress)
        setOwner(contractOwner);
        setIsOwner(userAddress.toLowerCase() === contractOwner.toLowerCase());
        
      } catch (error) {
        console.error("Erro to get contract owner:", error);
      } 
    };
    getContractOwner();
  }, [contractAddress, signer]);

  return { owner, isOwner };
};

export default useGetOwner;
