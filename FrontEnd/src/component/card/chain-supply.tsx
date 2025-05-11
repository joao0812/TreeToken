import { useMetamask } from "../../contexts/MetamaskContext";
import { FaBitcoin } from "react-icons/fa";
import useGetBalance from "../../hooks/useGetBalance";

export default function ChainSupply() {
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS || "";
  const { account, signer, isConnected } = useMetamask();
  const { supply, loading, error, symbol } = useGetBalance(
    contractAddress,
    signer,
    account,
    true
  );

  if (!isConnected) return null;

  return (
    <div className="max-w-md p-6 bg-white shadow-lg rounded-2xl">
      <div className="flex items-center justify-between space-x-4 mb-4 h-16">
        <div className="p-3 bg-yellow-100 rounded-full text-yellow-500">
          <FaBitcoin className="text-xl" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800 text-center">
          Total Supply
        </h2>
      </div>

      <div className="text-sm text-gray-700">
        {loading && <p className="text-blue-500">Carregando saldo...</p>}

        {!loading && error && <p className="text-red-500">{error}</p>}

        {!loading && !error && supply !== null && (
          <div className="flex items-center justify-between bg-yellow-100 p-2 rounded-md mt-4">
            <p className="text-md text-gray-600">Saldo:</p>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900 text-xl">
                {supply}
              </span>
              <span className="text-md text-gray-500">{symbol}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
