import "./App.css";
import { useState } from "react";
import WalletInputs from "./components/WalletInputs";
import NativeTokens from "./components/NativeTokens";

function App() {
  const [wallet, setWallet] = useState("");
  const [chain, setChain] = useState("0x1");
  const [nativeBalance, setNativeBalance] = useState(0);
  const [nativeValue, setNativeValue] = useState(0);

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
        nativeValue={nativeBalance}
        setNativeValue={setNativeValue}
      />
    </div>
  );
}

export default App;
