import BlockChain from "./BlockChain.js";

const chain = [
  {
    sender: "Ana",
    receiver: "Pedro",
    amount: 500,
  },
  {
    sender: "Pedro",
    receiver: "Ana",
    amount: 100,
  },
  {
    sender: "Laura",
    receiver: "Lucas",
    amount: 1_000,
  },
  {
    sender: "Lucas",
    receiver: "Laura",
    amount: 50,
  },
];

const difficulty = 5;
const blockChain = new BlockChain(difficulty);

for (let block of chain) {
  blockChain.addBlock(block);
}

console.log("\n--- GENERATED CHAIN ---\n");
console.log(blockChain.getChain());
