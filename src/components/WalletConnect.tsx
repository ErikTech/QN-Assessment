import {
  getWalletConnection,
  disconnectWallet,
} from "../redux/walletConnectionSlice";
import { useAppDispatch, useAppSelector } from "../util/hooks";

const WalletConnect = () => {
  const dispatch = useAppDispatch();

  const connect = (e) => {
    e.preventDefault();
    dispatch(getWalletConnection());
  };

  const disconnect = (e) => {
    e.preventDefault();
    dispatch(disconnectWallet());
  };

  const address = useAppSelector(
    (state) => state?.walletConnection?.wallets[0]?.address
  );

  const balance = useAppSelector(
    (state) => state?.walletConnection?.wallets[0]?.balance
  );

  const connected = useAppSelector(
    (state) => state?.walletConnection?.wallets?.length > 0
  );

  return (
    <div>
      {connected ? (
        <div className="border-2 border-green-500 px-4 py-4 text-center">
          <div className="status text-center font-bold text-green-600">Connected!</div>
          <div>Address: {address}</div>
          <div>Balance: ETH {balance.ETH}</div>
          <button
            className="mx-auto uppercase font-bold mt-6 w-96 rounded-xl border-2 p-6 border-red-600 hover:border-red-300 hover:text-white focus:text-red-900 text-red-600 hover:bg-red-600 text-center"
            onClick={disconnect}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <div>
          <div className="uppercase status text-center text-red-600">Not Connected to a wallet!</div>
          <button
            className="uppercase font-bold mt-6 w-96 rounded-xl border-2 p-6 border-green-600 hover:text-white focus:text-green-600 text-green-600 hover:bg-green-600  text-center"
            onClick={connect}
          >
            Connect
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
