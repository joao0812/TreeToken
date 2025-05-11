import { ethers } from "ethers";
export interface IUseMetamask {
  userWeb3: ethers.BrowserProvider | null;
  account: string | null;
  isConnected: boolean;
  signer: ethers.JsonRpcSigner | null;
  connectWallet: () => Promise<void>;
}
