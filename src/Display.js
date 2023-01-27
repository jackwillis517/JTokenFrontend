import { useState } from "react";

const Display = ({ signer, tokenContract, exchangeContract }) => {
  const [balance, setBalance] = useState(0);

  const updateValues = async (e) => {
    e.preventDefault();
    if (!tokenContract || !exchangeContract) {
      alert("Please connect to Metamask.");
      return;
    }
    const newBalance = await exchangeContract.viewBalance();
    setBalance(newBalance);
    console.log(parseInt(balance));
  };

  return (
    <div>
      <div className="flex justify-center ">
        <div className="bg-[#373738] rounded-lg py-3 px-4 mt-5 w-96 shadow-2xl shadow-black">
          <h1 className="text-2xl text-white" id="balanceDisplay">
            JToken Balance: {parseInt(balance)}
          </h1>
          <button
            className="bg-[#1954d3] text-white rounded-lg px-4 py-2 ml-3 mr-3 my-2 w-52 hover:bg-[#f15619]"
            onClick={updateValues}
          >
            Update Your Balance
          </button>
        </div>
      </div>
    </div>
  );
};

export default Display;
