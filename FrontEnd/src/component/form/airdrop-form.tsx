import { useState } from "react";
import { useMetamask } from "../../contexts/MetamaskContext";
import useTransferToken from "../../hooks/useTransferToken";
import useAirdropTokens from "../../hooks/useAirdrop";

export default function AirdropForm() {
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS || "";
  const { signer, isConnected } = useMetamask();
  const { airdropToken, isLoadingAirdrop } = useAirdropTokens(contractAddress, signer);
  const [addressAccounts, setAddressAccounts] = useState<string[]>([""]);
  const [amountValue, setAmountValue] = useState<string>("");

  if (!isConnected) return null;

  const handleTextChange = (index: number, value: string) => {
    const updatedInputs = [...addressAccounts];
    updatedInputs[index] = value;
    setAddressAccounts(updatedInputs);
  };

  const addTextInput = () => {
    if (addressAccounts.length < 3) {
        setAddressAccounts([...addressAccounts, ""]);
    }
  };

  const submitAirdrop = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(addressAccounts);
    if (!amountValue || addressAccounts.length == 0) return;
    await airdropToken(addressAccounts, BigInt(amountValue));
  };


  return (
    <form
      onSubmit={submitAirdrop}
      className="w-full mx-auto p-4 bg-white shadow-lg rounded text-black"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2">
        AirDrop
      </h2>

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

      {addressAccounts.map((value, index) => (
        <div className="mb-4" key={index}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Account {index + 1}
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => handleTextChange(index, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-500"
            placeholder={`Texto ${index + 1}`}
          />
        </div>
      ))}

      {addressAccounts.length < 3 && (
        <button
          type="button"
          onClick={addTextInput}
          className="mb-4 text-purple-600 hover:underline font-medium text-sm"
        >
          + Add Account
        </button>
      )}

      <button
        type="submit"
        className="w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
      >
        Enviar
      </button>
      {isLoadingAirdrop && (
        <div className="mt-2 text-center text-sm text-gray-500">
          Sending tokens..
        </div>
      )}
    </form>
  );
}
