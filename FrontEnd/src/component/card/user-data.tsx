import { useMetamask } from "../../contexts/MetamaskContext";
import { FaWallet } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import useGetBalance from "../../hooks/useGetBalance";

export default function UserCard() {
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS || "";
  const { account, signer, isConnected } = useMetamask();
  const { balance, loading, error, symbol } = useGetBalance(
    contractAddress,
    signer,
    account,
    true
  );

  if (!isConnected) return null;

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <div className="flex items-center justify-between space-x-4 mb-4 h-16">
        <div
          className={`p-3 bg-green-100 rounded-full ${
            error ? "text-red-600" : "text-green-600"
          }`}
        >
          <FaWallet className="text-xl" />
        </div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Carteira Conectada
          </h2>
          <div className="flex justify-end w-full">
            <button
              onClick={copyAddress}
              className="text-gray-600 text-sm hover:text-gray-800 p-1 rounded-full"
              title="Copy address"
            >
              <FaCopy />
            </button>
            <p className="text-sm text-gray-600">
              {account
                ? `${account.slice(0, 6)}...${account.slice(-4)}`
                : "Conta não conectada"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-2 text-sm text-gray-700">
        {loading && <p className="text-blue-500">Carregando saldo...</p>}

        {!loading && error && <p className="text-red-500">{error}</p>}

        {!loading && !error && balance !== null && (
          <div
            className={`mt-4 flex items-center justify-between p-2 rounded-md ${
              error ? "bg-red-100" : "bg-green-100"
            }`}
          >
            <p className="text-md text-gray-600">Saldo:</p>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900 text-xl">
                {balance}
              </span>
              <span className="text-sm text-gray-500">{symbol}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
