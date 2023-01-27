import "bootstrap/dist/css/bootstrap.min.css";
import Buy from "./Buy";
import Sell from "./Sell";
import NavbarTopper from "./Navbar";
import { useState, useEffect } from "react";
import { connect, getContracts } from "./contract";

function App() {
  const [tokenContract, setTokenContract] = useState(null);
  const [exchangeContract, setExchangeContract] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
      if (accounts.length > 0) {
        handleInitialization();
      } else setConnected(false);
    });
  }, []);

  const handleInitialization = () => {
    setConnected(true);
    getContracts().then(({ tokenContract, exchangeContract }) => {
      setTokenContract(tokenContract);
      setExchangeContract(exchangeContract);
    });
  };

  const connectCallback = async () => {
    const { tokenContract, exchangeContract } = await connect();
    setTokenContract(tokenContract);
    setExchangeContract(exchangeContract);
    if (tokenContract && exchangeContract) {
      setConnected(true);
    }
  };

  return (
    <div className="bg-gradient-to-r from-red-500 to-orange-500 h-screen">
      <NavbarTopper connect={connectCallback} connected={connected} />
      <div className="container">
        <Buy
          tokenContract={tokenContract}
          exchangeContract={exchangeContract}
        />
        <Sell
          tokenContract={tokenContract}
          exchangeContract={exchangeContract}
        />
      </div>
    </div>
  );
}

export default App;
