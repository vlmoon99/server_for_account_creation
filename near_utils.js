const { connect, keyStores, utils, Account } = require("near-api-js");
const dotenv = require("dotenv");

dotenv.config();

const NEAR_PRIVATE_KEY = process.env.NEAR_PRIVATE_KEY;
const NEAR_ACCOUNT_ID = process.env.NEAR_ACCOUNT_ID;

async function getConfig() {
  return {
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
    contractName: NEAR_ACCOUNT_ID,
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    keyStore: new keyStores.InMemoryKeyStore(),
  };
}

async function connectToNear() {
  const config = await getConfig();
  const keyPair = utils.KeyPair.fromString(NEAR_PRIVATE_KEY);
  await config.keyStore.setKey(config.networkId, NEAR_ACCOUNT_ID, keyPair);

  return await connect(config);
}

async function sendNearTokens(toAccountId, amount) {
  try {
    const near = await connectToNear();
    const senderAccount = new Account(
      near.connection,
      process.env.NEAR_ACCOUNT_ID
    );

    const amountToSend = utils.format.parseNearAmount(amount);

    let res = await senderAccount.sendMoney(toAccountId, amountToSend);
    let fromAccountId = process.env.NEAR_ACCOUNT_ID;

    return { fromAccountId, toAccountId, amount };
  } catch (e) {
    console.log(`Error : ${JSON.stringify(e.message)}`);
  }
}

module.exports = { sendNearTokens };
