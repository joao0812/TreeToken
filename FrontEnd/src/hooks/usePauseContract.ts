import { useEffect, useState } from "react";
import { ethers } from "ethers";

import type { TreeToken } from "../../../HardHat/typechain-types/contracts/TreeToken";
import { TreeToken__factory } from "../../../HardHat/typechain-types/factories/contracts/TreeToken__factory";

const usePauseContract = (
  contractAddress: string,
  signer: ethers.JsonRpcSigner | null
) => {
  const [loadingPause, setLoadingPause] = useState<boolean>(true);
  const [pause, setPause] = useState<boolean>(false);

  useEffect(() => {
    if (!signer) return;
    const getPaused = async () => {
      try {
        const contract = TreeToken__factory.connect(contractAddress, signer);
        const pausedState = await contract.paused();
        setPause(pausedState);
      } catch (error) {
        console.error("Erro to get contract pause status:", error);
      } finally {
        setLoadingPause(false);
      }
    };
    getPaused();
  }, [contractAddress, signer]);

  const pauseContract = async () => {
    try {
      const contract = TreeToken__factory.connect(contractAddress, signer);
      await contract.pause();
      setPause(true);
    } catch (error) {
      alert(`Error to trying pause contract: ${contractAddress}`);
    } finally {
      setLoadingPause(false);
    }
  };

  const unpauseContract = async () => {
    try {
      const contract = TreeToken__factory.connect(contractAddress, signer);
      await contract.unpause();
      setPause(false);
    } catch (error) {
      alert(`Error to trying unpause contract: ${contractAddress}`);
    } finally {
      setLoadingPause(false);
    }
  };

  const togglePause = () => {
    pause ? unpauseContract() : pauseContract();
  };

  return { togglePause, pause };
};

export default usePauseContract;
