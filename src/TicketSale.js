import web3 from "./web3";

// the address where the code is deployed and the abi of the contract, 0x7665EdEBcFa7bCe1F6A508C91e221e6a4eccc89A, 0x5c875B91f4Bd7e028D8035b00F771177d772382E
 
// this is the deployed address from remix editor 0xd9145CCE52D386f254917e481eB44e9943F39138
const address = "0xd9145CCE52D386f254917e481eB44e9943F39138";
const abi = [
  {
    inputs: [ [Object], [Object] ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [ [Object] ],
    name: 'acceptResale',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [ [Object] ],
    name: 'acceptSwap',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ [Object] ],
    name: 'buyTicket',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'checkResale',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [ [Object] ],
    name: 'getTicketOf',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'numTickets',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [ [Object] ],
    name: 'offerSwap',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [ [Object] ],
    name: 'ownerToTicket',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [ [Object] ],
    name: 'resaleTicket',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [ [Object] ],
    name: 'resaleTickets',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [ [Object] ],
    name: 'swapOffers',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'ticketPrice',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [ [Object] ],
    name: 'tickets',
    outputs: [ [Object], [Object], [Object], [Object] ],
    stateMutability: 'view',
    type: 'function'
  }
];



export default new web3.eth.Contract(abi, address);
