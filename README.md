# Metadata Receiver

This is a small set of contracts and deployment script, meant for deploying a proxied ERC20 token with an exposed mint function and a MetadataReceiver contract.

Using the Transaction Builder feature of GnosisSafe, someone can perform an ERC20 token transfer to an arbitrary address and also send arbitrary bytes to be cheaply emitted by the MetadataReceiver.

## Deployment instructions

1. install `npx`

```

npm install npx
```

2. install `hardhat`

```
npx install hardhat
```

3. compile

```
npx hardhat compile
```

4. configure local .env to look like .env.example. you only need to configure the `*_URL` arg for the network you are interested in.

if you want to introduce a new network, you can do that by editing `hardhat.config.ts`.

5. deploy

```
npx hardhat run scripts/deploy.ts --network {NETWORK}
```

where `{NETWORK}` is one-of: mainnet, goerli, ropsten, rinkey, etc...

## Live Deployments

### Rinkeby

Metadata Receiver: https://rinkeby.etherscan.io/address/0x76BD419fBa96583d968b422D4f3CB2A70bf4CF40
(no erc20 or proxy)

### Goerli
