import { createHash } from "node:crypto";

export default class BlockChain {
  constructor(difficulty = 5) {
    this.chain = [];
    this.difficulty = difficulty;
  }

  getChain() {
    return this.chain;
  }

  isValidHashDifficulty(hash, difficulty) {
    let count = 0;

    for (let i of hash) {
      count++;
      if (i !== "0") {
        break;
      }
    }

    return count > difficulty;
  }

  generateHash(block) {
    let nonce = 0;

    block.nonce = nonce;

    let hash = createHash("sha256").update(JSON.stringify(block)).digest("hex");

    while (!this.isValidHashDifficulty(hash, this.difficulty)) {
      nonce++;
      block.nonce = nonce;
      hash = createHash("sha256").update(JSON.stringify(block)).digest("hex");
    }

    return hash;
  }

  addBlock(block) {
    block.timestamp = new Date().getTime();

    if (this.chain.length === 0) {
      block.previousHash = null;
    } else {
      block.previousHash = this.chain[this.chain.length - 1].hash;
    }

    block.hash = this.generateHash(block);
    this.chain.push(block);
  }
}
