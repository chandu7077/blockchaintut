import sha256 from "sha256";

class Blockchain {
    constructor() {
        this.chain = []
        this.pendingTransactions = []
        this.createNewBlock(411613,'3','4')
    }

    createNewBlock(nonce, previousBlockHash, hash) {
        const block = {
            index: this.chain.length + 1,
            transactions: this.pendingTransactions,
            nonce: nonce,
            hash: hash,
            previousBlockHash: previousBlockHash,
            timestamp: Date.now()
        };
    
        this.pendingTransactions = [];
        this.chain.push(block);
        return block;
    }

    getLatBlock() {
        return this.chain[this.chain.length -1]
    }

    createNewTransaction(amount,sender,reciever,remarks) {
        const transaction = {
            amount: amount,
            sender: sender,
            reciever: reciever,
            remarks: remarks
        }

        this.pendingTransactions.push(transaction)
        return this.getLatBlock()["index"] + 1;
    }

    hashBlock(previousBlockHash, currentBlockData, nonce) {
        const data = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
        const hash = sha256(data);
        return hash
    }

    proofOfWork(previousBlockHash, currentBlockData) {
        let nonce = 0;
        let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce)
        while(hash.substring(0,1)!="0") {
            nonce = nonce + 1;
            hash = this.hashBlock(previousBlockHash, currentBlockData, nonce)
        }
        return nonce;
    }
}

export default Blockchain;