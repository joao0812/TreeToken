# 🌳 TreeToken - ERC20 Custom Token dApp

Este projeto é uma aplicação descentralizada (dApp) composta por:

- Um contrato inteligente ERC20 pausável chamado **TreeToken**
- Um frontend em **React + Vite** que interage com o contrato na rede **Sepolia**
- Um sistema de funcionalidades administrativas como *pause*, *mint*, *burn*, *airdrop* e transferências de tokens.
---

## 📦 Estrutura do Projeto
├── frontend # Frontend em React + Vite  
│ ├── src/  
│ └── vite.config.ts  
├── HardHat # Backend (contratos e deploys)  
│ ├── contracts/ # Contrato TreeToken.sol  
│ ├── scripts/ # Script de deploy  
│ ├── typechain-types/ # Tipagens geradas automaticamente  
│ └── hardhat.config.ts  
├── README.md

---

## 🚀 Tecnologias Utilizadas

- [Solidity ^0.8.20](https://docs.soliditylang.org/)
- [Hardhat](https://hardhat.org/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Vite](https://vitejs.dev/)
- [Ethers.js](https://docs.ethers.org/)
- [React.js](https://react.dev/)
- [MetaMask](https://metamask.io/)

---

## ⚙️ Contrato TreeToken.sol

### Funcionalidades principais:

- `mint(uint amount)`: Gera novos tokens para o owner.
- `burn(address, amount)`: Queima tokens de uma conta.
- `airDrop(address[], amount)`: Envia tokens para múltiplas contas (máx. 3 por chamada).
- `getBalance(address)`: Consulta saldo de um endereço.
- `pause()` e `unpause()`: Pausa e retoma todas as transferências.

O contrato herda de:
- `ERC20Pausable`
- `Ownable`

---

## 📄 Requisitos

- Node.js v18+
- MetaMask
- Conta com saldo ETH Sepolia para pagar o gas
> É  possível adiquirir Tokens sepolia ETH nos link: [PoW](https://sepolia-faucet.pk910.de/#/details/69d42136-912e-414a-8b5f-139c16507644) e [Alchemy Faucet Sepolia](https://www.alchemy.com/faucets/arbitrum-sepolia)

---

## 🛠️ Instalação

### 1. Clone o projeto:
```bash
git clone [https://github.com/seu-usuario/tree-token.git](https://github.com/joao0812/TreeToken.git)
cd Tree - Soluções ESG Integradas
```

## 🔧 Backend (Hardhat)

### 2. Instale as dependências
```bash
cd HardHat
npm install
```

### 3. Compilar contratos:
Use o comando:
```bash
npm run compile

OU

npm run clean:compile
```

#### 3.1 Scripts disponíveis
```bash
# Limpa os artefatos e cache
npm run clean

# Compila os contratos
npm run compile

# Limpa e compila
npm run clean:compile

# Faz deploy para a rede Sepolia
npm run deploy
```

### 4. Deploy do contrato:
Use o comando:
```bash
npm run deploy
```
> ⚠️ **Atenção:** Esse script retorna o endereço do contrato deployado na rede, certifique-se de atualizar corretamente o arquivo `.env` depois de executar o deploy.


### 6. Crie um `.env` com:
```env
PRIVATE_KEY=<Sua Chave Privada>
PRIVATE_KEY2=<Sua Chave Privada>
ALCHEMY_API_KEY=R8b7OEA1_dfsZrqsMKBmFqFE7a8BI94x
ALCHEMY_SEPOLIA_ENDPOINT=https://eth-sepolia.g.alchemy.com/v2/R8b7OEA1_dfsZrqsMKBmFqFE7a8BI94x

CONTRACT_ADDRESS=<Endereço do contrato>
```



## 💻 Frontend (Vite + React)

### 6. Instale as dependências
```bash
cd ../frontend
npm install
```
### 7. Crie um `.env` com:
```env
VITE_PRIVATE_KEY=<Sua Chave Privada>
VITE_PRIVATE_KEY2=<Sua Chave Privada>
VITE_ALCHEMY_API_KEY=R8b7OEA1_dfsZrqsMKBmFqFE7a8BI94x
VITE_ALCHEMY_SEPOLIA_ENDPOINT=https://eth-sepolia.g.alchemy.com/v2/R8b7OEA1_dfsZrqsMKBmFqFE7a8BI94x

VITE_CONTRACT_ADDRESS=<Endereço do contrato>
```
> **Atenção:** O Vite, por questões de segurança, **só expõe ao código as variáveis de ambiente que começarem com `VITE_`**. Certifique-se de que todas as variáveis de ambiente que precisam ser acessadas no código estejam prefixadas com `VITE_` no arquivo `.env` do seu projeto. Variáveis sem esse prefixo **não estarão disponíveis** no código do lado do cliente.
> 
### 8. Scripts disponíveis
Use o seguinte comando para iniciar a interface do projeto:
```bash
# Ambiente de desenvolvimento
npm run dev
```


