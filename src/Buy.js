import { useEffect, useState } from "react";
import { Spin, message } from "antd";

const Buy = ({ tokenContract, exchangeContract }) => {
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [approved, setApproved] = useState(0);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    updateApproved();
    updateBalance();
  });

  window.ethereum.on("accountsChanged", () => {
    updateApproved();
    updateBalance();
  });

  window.ethereum.on("connect", () => {
    updateApproved();
    updateBalance();
  });

  const updateBalance = async () => {
    const newBalance = await exchangeContract.viewBalance();
    setBalance(parseInt(newBalance));
  };

  const updateApproved = async () => {
    const newApproved = await exchangeContract.viewApproved();
    setApproved(parseInt(newApproved));
  };

  try {
    tokenContract.on("Approval", () => {
      updateApproved();
    });
  } catch (error) {
    console.error(error);
  }

  const buyToken = async (e) => {
    e.preventDefault();
    if (!tokenContract || !exchangeContract) {
      messageApi.open({
        type: "warning",
        content: "Please connect to MetaMask",
      });
      return;
    }

    setLoading(true);
    try {
      const tx = await exchangeContract.functions
        .buy(amount, { value: amount * 100000000000000 })
        .catch((error) => {
          console.log(error.message);
          messageApi.open({ type: "error", content: "Purchase Rejected :(" });
          setLoading(false);
        });
      tokenContract.on("Transfer", () => {
        setLoading(false);
        updateBalance();
      });
      await tx.wait();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {contextHolder}
      <div className="flex justify-center ">
        <div className="bg-[#373738] rounded-lg py-3 px-4 mt-5 w-96 shadow-2xl shadow-black">
          <h1 className="text-2xl text-white text-center" id="balanceDisplay">
            JToken Balance: {balance}
          </h1>
          <h1
            className="text-2xl text-white text-center pt-2"
            id="balanceDisplay"
          >
            Approved for Sale: {approved}
          </h1>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="bg-[#373738] rounded-lg py-3 mt-5 shadow-2xl shadow-black">
          <form onSubmit={buyToken}>
            <div className="mb-2 px-4">
              <label className="text-2xl text-white">Buy JToken</label>
              <h2 className="text-md pt-2 pb-2 text-white">
                1 JToken = 0.0001 ETH
              </h2>
            </div>
            <input
              className="bg-zinc-900 text-white rounded-md px-2 py-2 w-96 ml-3 mr-3 mb-2 hover:ring-1 ring-slate-500"
              type="number"
              placeholder="1 JToken"
              step="1"
              id="buyAmount"
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="flex justify-center">
              <button className="bg-[#1954d3] text-white rounded-lg px-4 py-2 ml-3 mr-3 my-2 w-52 hover:bg-[#0f850f]">
                {loading ? <Spin size="small" tip="Pending..." /> : "Purchase"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Buy;
