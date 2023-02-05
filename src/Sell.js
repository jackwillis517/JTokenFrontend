import { useState } from "react";
import { Spin, message } from "antd";

const Sell = ({ tokenContract, exchangeContract }) => {
  const [approveAmount, setApproveAmount] = useState(0);
  const [sellAmount, setSellAmount] = useState(0);
  const [sellLoading, setSellLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const approveSale = async (e) => {
    e.preventDefault();
    if (!tokenContract || !exchangeContract) {
      messageApi.open({
        type: "warning",
        content: "Please connect to MetaMask",
      });
      return;
    }

    await tokenContract
      .approve(exchangeContract.address, approveAmount)
      .then(
        messageApi.open({ type: "warning", content: "Please Approve the Sale" })
      )
      .catch((error) => {
        console.log(error);
        messageApi.open({ type: "error", content: "Approval Rejected :(" });
      });
  };

  const sellToken = async (e) => {
    e.preventDefault();
    if (!tokenContract || !exchangeContract) {
      messageApi.open({
        type: "warning",
        content: "Please connect to MetaMask",
      });
      return;
    }

    setSellLoading(true);
    try {
      const tx = await exchangeContract.functions
        .sell(sellAmount)
        .catch((error) => {
          console.log(error.message);
          setSellLoading(false);
          messageApi.open({
            type: "error",
            content: "Sale Rejected :(  | Make Sure You Have Sufficient JToken",
          });
        });
      tokenContract.on("Transfer", () => {
        setSellLoading(false);
      });
      await tx.wait();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {contextHolder}
      <div className="flex justify-center">
        <div className="bg-[#383738] rounded-lg py-3 mt-5 shadow-2xl shadow-black">
          <form>
            <div className="mb-2 px-4">
              <label className="text-2xl text-white">Sell JToken</label>
              <h2 className="text-md pt-2 pb-2 text-white">
                1 JToken = 0.0001 ETH
              </h2>
            </div>
            <input
              className="bg-zinc-900 text-white rounded-md px-2 py-2 w-96 ml-3 mr-3 mb-2 hover:ring-1 ring-slate-500"
              type="number"
              placeholder="1 JToken"
              step="1"
              id="approveAmount"
              onChange={(e) => setApproveAmount(e.target.value)}
            />
            <div className="flex justify-center">
              <button
                className="bg-[#1954d3] text-white rounded-lg px-4 py-2 ml-3 mr-3 my-2 w-52 hover:bg-[#f15619]"
                onClick={approveSale}
              >
                Approve
              </button>
            </div>
            <div className="mt-4">
              <input
                className="bg-zinc-900 text-white rounded-md px-2 py-2 w-96 ml-3 mr-3 mb-2 hover:ring-1 ring-slate-500"
                type="number"
                placeholder="1 JToken"
                step="1"
                id="sellAmount"
                onChange={(e) => setSellAmount(e.target.value)}
              />
              <div className="flex justify-center">
                <button
                  className="bg-[#1954d3] text-white rounded-lg px-4 py-2 ml-3 mr-3 my-2 w-52 hover:bg-[#ec1008]"
                  onClick={sellToken}
                >
                  {sellLoading ? (
                    <Spin size="small" tip="Pending..." />
                  ) : (
                    "Sell"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sell;
