import { useMetamask } from "../../contexts/MetamaskContext";
import { FaCheckCircle } from "react-icons/fa";


export default function ConnectMetamask() {
    const { isConnected, connectWallet } = useMetamask();
    return(
        <button
        onClick={connectWallet}
        disabled={isConnected}
        className={`flex items-center gap-2 min-w-38 h-12 px-6 py-3 text-white font-medium rounded-xl transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 ${
            isConnected
              ? "bg-green-500 font-semibold"
              : "bg-[#6829CD] hover:bg-[#5c24b8] active:scale-95 active:shadow-inner focus:ring-[#a47aff] hover:cursor-pointer shadow-md"
          }`}
        >
      {isConnected ? "Connected  " : "Connect Wallet  "}
      {isConnected && <FaCheckCircle />}
    </button>
    )
}