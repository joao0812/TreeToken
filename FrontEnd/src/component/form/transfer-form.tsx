import { useState } from "react";
import { useMetamask } from "../../contexts/MetamaskContext";
import useTransferToken from "../../hooks/useTransferToken";

export default function TransferForm() {
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS || "";
  const { signer, isConnected } = useMetamask();
  const { transferToken, isLoadingTransfer } = useTransferToken(contractAddress, signer);
  const [addressAccount, setAddressAccount] = useState<string>("");
  const [amountValue, setAmountValue] = useState<string>("");

  const submitTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amountValue || !addressAccount) return;
    await transferToken(addressAccount, BigInt(amountValue));
  };

  if (!isConnected) return null;

  return (
    <form
      onSubmit={submitTransfer}
      className="w-full mx-auto p-4 bg-white shadow-lg rounded text-black"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2">
        Transfer Token
      </h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          To
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
        disabled={isLoadingTransfer}
        type="submit"
        className="w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
      >
        Transfer Tokens
      </button>
      {isLoadingTransfer && (
        <div className="mt-2 text-center text-sm text-gray-500">
          Transfering tokens..
        </div>
      )}
    </form>
  );
}
