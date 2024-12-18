import "./App.css";
import { useState } from "react";
import WalletInputs from "./components/WalletInputs";
import NativeTokens from "./components/NativeTokens";
import Tokens from "./components/Tokens";
import PortfolioValue from "./components/PortfolioValue";
import TransferHistory from "./components/TransferHistory";

function App() {
  const [wallet, setWallet] = useState(
    "0xCE23f6f27E7b4D759b0AB64cce95394A21719d1a"
  );
  const [chain, setChain] = useState("0x1");
  const [nativeBalance, setNativeBalance] = useState(0);
  const [nativeValue, setNativeValue] = useState(0);
  const [tokens, setTokens] = useState([]);
  const [transfers, setTransfers] = useState([]);

  return (
    <div className="App">
      <WalletInputs
        chain={chain}
        setChain={setChain}
        wallet={wallet}
        setWallet={setWallet}
      />
      <NativeTokens
        wallet={wallet}
        chain={chain}
        nativeBalance={nativeBalance}
        setNativeBalance={setNativeBalance}
        nativeValue={nativeValue}
        setNativeValue={setNativeValue}
      />
      <Tokens
        wallet={wallet}
        chain={chain}
        tokens={tokens}
        setTokens={setTokens}
      />
      <PortfolioValue nativeValue={nativeValue} tokens={tokens} />
      <TransferHistory
        chain={chain}
        wallet={wallet}
        transfers={transfers}
        setTransfers={setTransfers}
      />
    </div>
  );
}

export default App;
