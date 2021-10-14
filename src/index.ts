import * as CrptoJS from "crypto-js";

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
  static calculateBlockHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string =>
    CrptoJS.SHA256(index + previousHash + timestamp + data).toString();

  static validateStructure = (aB: Block): boolean =>
    typeof aB.index === "number" &&
    typeof aB.hash === "string" &&
    typeof aB.previousHash === "string" &&
    typeof aB.timestamp === "number" &&
    typeof aB.data === "string";
}

const genesisBlock: Block = new Block(0, "123213214", "", "hello", 12345);

let blockChain: Block[] = [genesisBlock];

const getBlockChain = (): Block[] => blockChain;
const getLatestBlockChain = (): Block => blockChain[blockChain.length - 1];
const getNewTimestamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const prevBlock: Block = getLatestBlockChain();
  const newIndex: number = prevBlock.index + 1;
  const newTimestamp: number = getNewTimestamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    prevBlock.hash,
    newTimestamp,
    data
  );
  const newBlock = new Block(
    newIndex,
    newHash,
    prevBlock.hash,
    data,
    newTimestamp
  );
  addBlock(newBlock);
  return newBlock;
};

const getHashForBlock = (aB: Block): string =>
  Block.calculateBlockHash(aB.index, aB.previousHash, aB.timestamp, aB.data);

const isBlockValid = (candiBlock: Block, prevBlock: Block): boolean => {
  if (!Block.validateStructure(candiBlock)) {
    return false;
  } else if (prevBlock.index + 1 !== candiBlock.index) {
    return false;
  } else if (prevBlock.hash !== candiBlock.previousHash) {
    return false;
  } else if (getHashForBlock(candiBlock) !== candiBlock.hash) {
    return false;
  } else {
    return true;
  }
};

const addBlock = (candiBlock: Block): void => {
  if (isBlockValid(candiBlock, getLatestBlockChain())) {
    blockChain.push(candiBlock);
  }
};

createNewBlock("1111");
createNewBlock("2222");
createNewBlock("3333");
console.log(blockChain);
export {};
