import React from "react";
import axios from "axios";

function TransferHistory({ chain, wallet, transfers, setTransfers }) {
  async function getTokenTransfers() {
    const response = await axios.get("http://localhost:8080/tokenTransfers", {
      params: {
        address: wallet,
        chain: chain,
      },
    });

    if (response.data) {
      setTransfers(response.data);
    }
  }
  return (
    <>
      <h1>Transfer History</h1>
      <div>
        <button onClick={getTokenTransfers}>Fetch Transfers</button>
        <table>
          <tr>
            <th>No</th>
            <th>Token</th>
            <th>Amount</th>
            <th>From</th>
            <th>To</th>
            <th>Date</th>
          </tr>
          {transfers.length > 0 &&
            transfers.map((e, key) => {
              return (
                <tr>
                  <td>{key + 1}</td>
                  <td>{e.symbol}</td>
                  <td>
                    {(Number(e.value) / Number(`1e${e.decimals}`)).toFixed(3)}
                  </td>
                  <td>{e.from_address}</td>
                  <td>{e.to_address}</td>
                  <td>{e.block_timestamp}</td>
                </tr>
              );
            })}
        </table>
      </div>
    </>
  );
}

export default TransferHistory;
