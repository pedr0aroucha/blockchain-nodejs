import BlockChain from "./BlockChain.js";

const difficulty = Number(process.argv[2]) || 4;
const blockChain = new BlockChain(difficulty);

const blockNumber = Number(process.argv[3]) || 10;
let chain = blockChain.chain;

for (let i = 0; i < blockNumber; i++) {
  const data = {
    sender: `Sender ${i}`,
    recipient: `Recipient ${i}`,
    amount: Math.floor(Math.random() * 100) + 1,
  };

  const block = blockChain.createBlock(data);
  const mineInfo = blockChain.mineBlock(block);
  chain = blockChain.sendBlock(mineInfo.minedBlock);
}

console.log("\n--- GENERATED CHAIN ---\n");
console.log(blockChain.getChain());
