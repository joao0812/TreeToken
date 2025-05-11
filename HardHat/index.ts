import express from 'express';
import * as dotenv from 'dotenv'
dotenv.config();

import { TokenRepository } from './src/infra/repositories/TreeTokenRepository';
import { TreeTokenService } from './src/app/TreeToken.service';
import { TreeTokenController } from './src/interfaces/TreeToken.controller';

import { ethers } from "ethers";
import { createProviderAndSigner } from './src/config/providers';

const startServer = async () => {
    const {provider, signer} = await createProviderAndSigner()
    const contractAddress = process.env.CONTRACT_ADDRESS || "";
    
    const tokenRepository = new TokenRepository(contractAddress, signer);
    const treeTokenService = new TreeTokenService(tokenRepository);
    const treeTokenController = new TreeTokenController(treeTokenService);
    
    const app = express();
    const PORT = 3000;
    
    app.get("/show", (req, res) => treeTokenController.getBalance(req, res));
    
    
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`)
    })
};

startServer();