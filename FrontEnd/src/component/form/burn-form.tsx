import { useState } from "react";
import useBurnToken from "../../hooks/useBurnToken";
import { useMetamask } from "../../contexts/MetamaskContext";

export default function BurnForm() {
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS || "";
  const { signer, isConnected } = useMetamask();
  const { burnToken, isLoadingBurn } = useBurnToken(contractAddress, signer);
  const [addressAccount, setAddressAccount] = useState<string>("");
  const [amountValue, setAmountValue] = useState<string>("");

  const submitBurn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amountValue || !addressAccount) return;
    await burnToken(addressAccount, BigInt(amountValue));
  };

  if (!isConnected) return null;

  return (
    <form
      onSubmit={submitBurn}
      className="w-full mx-auto p-4 bg-white shadow-lg rounded text-black"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2">
        Burn Token
      </h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Account
        </label>
        <input
          type="text"
          value={addressAccount}
          onChange={(e) => setAddressAccount(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-500"
          placeholder="Digite algo..."
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Amount
        </label>
        <input
          type="number"
          value={amountValue}
          onChange={(e) => setAmountValue(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-500"
          placeholder="Digite um número"
        />
      </div>

      <button
        disabled={isLoadingBurn}
        type="submit"
        className="w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
      >
        Burn Tokens
      </button>
      {isLoadingBurn && (
        <div className="mt-2 text-center text-sm text-gray-500">
          Burning tokens..
        </div>
      )}
    </form>
  );
}
