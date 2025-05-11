import { useMetamask } from "../../contexts/MetamaskContext";
import usePauseContract from "../../hooks/usePauseContract"

export default function PauseToggleButton() {
    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS || "";
    const { signer, isConnected } = useMetamask();
    const { togglePause, pause } = usePauseContract(contractAddress, signer);
    if (!isConnected) return null;
    return(
    <div className="flex items-center flex-col gap-2">
      <span className="text-sm text-gray-700 transform">
      {pause ? "Paused (click to unpause contract)" : "Active (click to pause contract)"}
      </span>
      <button
        onClick={togglePause}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
            pause ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            pause ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
    )
}