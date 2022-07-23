import { hash, isHashProofed } from "./helpers.js";

export default class BlockChain {
  constructor(difficulty = 4) {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = difficulty;
    this.prefix = "0";
  }

  createGenesisBlock() {
    const payload = {
      sequence: 0,
      timestamp: +new Date(),
      data: "Genesis Block",
      previousHash: "",
    };

    return {
      header: {
        nonce: 0,
        hash: hash(payload),
      },
      payload,
    };
  }

  getLatestBlock() {
    return this.chain.at(-1) || null;
  }

  getChain() {
    return this.chain;
  }

  getLatestBlockHash() {
    return this.getLatestBlock().header.hash;
  }

  createBlock(data) {
    const payload = {
      sequence: this.getLatestBlock().payload.sequence + 1,
      timestamp: new Date().getTime(),
      data,
      previousHash: this.getLatestBlockHash(),
    };

    console.log(
      `Creating block with payload: ${JSON.stringify(payload, null, 2)}`
    );

    return payload;
  }

  mineBlock(blockPayload) {
    let nonce = 0;
    let startTime = +new Date();

    while (true) {
      const blockHash = hash(JSON.stringify(blockPayload));
      const powHash = hash(blockHash + nonce);

      if (
        isHashProofed({
          hash: powHash,
          difficulty: this.difficulty,
          prefix: this.prefix,
        })
      ) {
        const endTime = +new Date();
        const reducedHash = powHash.slice(0, 12);
        const timeTaken = (endTime - startTime) / 100;

        console.log(
          `Block mined in ${timeTaken} seconds. Hash is: ${reducedHash} (${nonce} attempts)`
        );

        return {
          minedBlock: {
            payload: blockPayload,
            header: {
              nonce,
              hash: blockHash,
            },
          },
        };
      }

      nonce++;
    }
  }

  verifyBlock(block) {
    if (block.payload.previousHash !== this.getLatestBlockHash()) {
      console.error(
        `Block ${block.payload.sequence} is not valid. Previous hash does not match.`
      );
      return;
    }

    const powHash = hash(
      hash(JSON.stringify(block.payload)) + block.header.nonce
    );

    if (
      !isHashProofed({
        hash: powHash,
        difficulty: this.difficulty,
        prefix: this.prefix,
      })
    ) {
      console.error(
        `Block ${block.payload.sequence} is not valid. Nonce is not valid and cannot be verified.`
      );

      return false;
    }
    return true;
  }

  sendBlock(block) {
    if (this.verifyBlock(block)) {
      this.chain.push(block);
      console.log(`Block added to chain: ${JSON.stringify(block, null, 2)}`);
    }

    return this.chain;
  }
}
