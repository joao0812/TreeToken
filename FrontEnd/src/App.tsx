import "./App.css";
import { MetamaskProvider } from "./contexts/MetamaskContext";

import ConnectMetamask from "./component/button/connect-metamask";
import UserCard from "./component/card/user-data";
import ChainSupply from "./component/card/chain-supply";
import PauseToggleButton from "./component/button/pause-toggle";
import BurnForm from "./component/form/burn-form";
import MintForm from "./component/form/mint-form";
import TransferForm from "./component/form/transfer-form";
import AirdropForm from "./component/form/airdrop-form";

function App() {
  return (
    <div className="min-h-screen min-w-screen bg-gray-50 p-6">
      <MetamaskProvider>
        <div className="grid grid-cols-1 gap-6">
          <div className="flex justify-between">
            <ConnectMetamask />
            <PauseToggleButton />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className=" rounded-lg p-6">
              <ChainSupply />
            </div>
            <div className=" rounded-lg p-6">
              <UserCard />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg p-6">
            <AirdropForm />
            <TransferForm />
            <BurnForm />
            <MintForm />
          </div>
        </div>
      </MetamaskProvider>
    </div>
  );
}

export default App;
