import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function Nfts({ wallet, chain, nfts, setNfts, filteredNfts, setFilteredNfts }) {
  const [nameFilter, setNameFilter] = useState("");
  const [idFilter, setIdFilter] = useState("");

  useEffect(() => {
    if (idFilter.length === 0 && nameFilter.length === 0) {
      return setFilteredNfts(nfts);
    }

    let fiNfts = [];

    for (let i = 0; i < nfts.length; i++) {
      if (nfts[i].name.includes(nameFilter) && idFilter.length === 0) {
        fiNfts.push(nfts[i]);
      } else if (
        nfts[i].token_id.includes(idFilter) &&
        nameFilter.length === 0
      ) {
        fiNfts.push(nfts[i]);
      } else if (
        nfts[i].token_id.includes(idFilter) &&
        nfts[i].name.includes(nameFilter)
      ) {
        fiNfts(nfts[i]);
      }

      setFilteredNfts(fiNfts);
    }
  }, [nameFilter, idFilter]);

  async function getUserNfts() {
    const response = await axios.get("http://localhost:8080/nftBalance", {
      params: {
        address: wallet,
        chain: chain,
      },
    });

    if (response.data.result) {
      nftProcessing(response.data.result);
    }

    function nftProcessing(t) {
      for (let i = 0; i < t.length; i++) {
        let meta = JSON.parse(t[i].metadata);
        if (meta && meta.image) {
          if (meta.image.includes(".")) {
            t[i].image = meta.image;
          } else {
            t[i].image = "http://www.ipfs.com/" + meta.image;
          }
        }
      }

      setNfts(t);
      setFilteredNfts(t);
    }
  }
  return (
    <>
      <h1>Portfolio NFTs</h1>
      <div>
        <button onClick={getUserNfts}>Fetch NFTs</button>
        <span> Name Filter </span>
        <input
          onChange={(e) => setNameFilter(e.target.value)}
          value={nameFilter}
        ></input>

        <span> Id Filter </span>
        <input
          onChange={(e) => setIdFilter(e.target.value)}
          value={idFilter}
        ></input>
        <br />

        {filteredNfts.length > 0 &&
          filteredNfts.map((e) => {
            return (
              <>
                {e.image && <img src={e.image} width={200} alt="" />}
                <span>Name: {e.name}</span>
                <span>(ID:: {e.token_id})</span>
                <br />
              </>
            );
          })}
      </div>
    </>
  );
}

export default Nfts;
