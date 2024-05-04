import { useContext, useState } from "react";
import { GameContext } from "../contexts/game-context";
import { contract } from "../utils/constants";
import {
  TransactionButton,
  useActiveAccount,
  useSendTransaction,
} from "thirdweb/react";
import { claimKitten } from "../thirdweb/84532/0x5ca3b8e5b82d826af6e8e9ba9e4e8f95cbc177f4";
import { claimTo } from "thirdweb/extensions/erc1155";

const ClaimKittenButton: React.FC = () => {
  const { refetch } = useContext(GameContext);
  const address = useActiveAccount()?.address;
  const [error, setError] = useState<Error | null>(null);
  const { mutate: sendTx, data: transactionResult } = useSendTransaction();

  const onClick = async () => {
    const transaction = claimTo({
      contract: contract,
      to: address!,
      tokenId: 0n,
      quantity: 1n,
    });
    sendTx(transaction);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* <button onClick={onClick}>Claim Kitten</button> */}
      <TransactionButton
        transaction={() => {
          return claimTo({
            contract: contract,
            to: address!,
            tokenId: 0n,
            quantity: 1n,
          });
        }}
        onError={(error) => setError(error)}
        onClick={() => setError(null)}
        onTransactionConfirmed={(resut) => {
          refetch();
        }}
      >
        Claim Kitten
      </TransactionButton>
      {error && (
        <p className="mt-2 text-xs first-letter:capitalize text-red-400 max-w-xs text-center">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default ClaimKittenButton;
