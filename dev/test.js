import Blockchain from "./blockchain.js"
const bchain = new Blockchain();
bchain.createNewBlock(2341,"12WESAQQSAQZJND","CHAN3A4DU1X3DJ")
bchain.createNewTransaction(777,"ABCDEF","HIJKLMNO","Gift")
bchain.createNewBlock(2351,"12WESAQQSAQZJND","CHAN3A4DU1X3DJ")
console.log(bchain)

//testing hash
const currentBlockData = [
    {
      index: 1,
      transactions: [],
      nonce: 2341,
      hash: 'CHAN3A4DU1X3DJ',
      previousBlockHash: '12WESAQQSAQZJND',
      timestamp: 1618454440143
    },
    {
      index: 2,
      transactions: [Array],
      nonce: 2353,
      hash: 'CHAN3A4DU1X3DJ',
      previousBlockHash: '12WESAQQSAQZJND',
      timestamp: 1618454440143
    }
  ]
const previousBlockHash = "1qaz2wsx3edc4rfv5tgb6yhn7ujm8ik9ol0p"
const nonce = bchain.proofOfWork(previousBlockHash,currentBlockData)
console.log(nonce)
console.log(bchain.hashBlock(previousBlockHash,currentBlockData,nonce))