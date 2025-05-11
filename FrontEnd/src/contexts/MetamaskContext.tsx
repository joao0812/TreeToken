import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

import type { IUseMetamask } from "../types/IUseMetamask";

const MetamaskContext = createContext<IUseMetamask | undefined>(undefined);

export const MetamaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userWeb3, setUserWeb3] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
      if (typeof window !== "undefined" && window.ethereum) {
        const web3Instance = new ethers.BrowserProvider(window.ethereum);
        setUserWeb3(web3Instance);
      }
  }, []);

  const connectWallet = async () => {
    if (userWeb3 && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        const signerWeb3 = await userWeb3.getSigner();
        setSigner(signerWeb3)
        setIsConnected(true);
      } catch (error) {
        console.error("Erro ao conectar a carteira:", error);
      }
    } else {
      console.error("MetaMask não encontrado");
    }
  };

  return (
    <MetamaskContext.Provider
      value={{ userWeb3, account, isConnected, signer, connectWallet }}
    >
      {children}
    </MetamaskContext.Provider>
  );
};

export const useMetamask = (): IUseMetamask => {
  const context = useContext(MetamaskContext);
  if (!context)
    throw new Error("useMetamask deve ser usado dentro de um MetamaskProvider");
  return context;
};
