// import Web3 from "web3";

// if (window.ethereum) {
//   window.ethereum.request({ method: "eth_requestAccounts" });
// } else {
//   console.error("No Ethereum provider found. Install MetaMask.");
// }
// const web3 = new Web3(window.ethereum);
// console.log("Web3: ", web3);

// export default web3;


import Web3 from "web3";
window.ethereum.request({ method: "eth_requestAccounts" });
const web3 = new Web3(window.ethereum);
export default web3;