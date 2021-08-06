import express from "express";
import Blockchain from "./blockchain.js";
import { v4 as uuid } from 'uuid';

const chain = new Blockchain()
const nodeAddress = uuid().replaceAll("-","")

const app = express()

app.use(express.json())

app.get("/blockchain", (req,res) => {
    res.send(chain);
})

app.post("/transaction", (req,res,next) => {
    const newBlockIndex = chain.createNewTransaction(req.body.amount, req.body.sender, req.body.reciever, req.body.remarks);
    res.json({"blockIndex":newBlockIndex,"note":"Transaction will be added to Blockchain"}) ;
})

app.get("/mine", (req,res) => {
    const lastBlock = chain.getLatBlock();
    const previousBlockHash = lastBlock.hash;
    const currentBlockData = {
        transactions:chain.pendingTransactions,
        index:lastBlock.index + 1
    }
    const nonce = chain.proofOfWork(previousBlockHash, currentBlockData);
    const blockHash = chain.hashBlock(previousBlockHash, currentBlockData,nonce)
    chain.createNewTransaction(7.77, "00", nodeAddress)
    const newBlock = chain.createNewBlock(nonce, previousBlockHash, blockHash )
    res.json({"note":"New Block mined and Reward recieved", newBlock:newBlock})

})
app.get("/home",(req,res) => {
    res.send("Welcome to Desi Blockchain");
})

app.listen(3000);