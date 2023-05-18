const { sendNearTokens } = require("../near_utils");

// Validate if the account ID is human-readable or hexadecimal
function isValidAccountId(accountId) {
  const humanReadablePattern =
    /^(([a-z\d]+[-_])*[a-z\d]+\.)*([a-z\d]+[-_])*[a-z\d]+$/;
  const hexadecimalPattern = /^[0-9a-fA-F]{64}$/;

  return (
    humanReadablePattern.test(accountId) || hexadecimalPattern.test(accountId)
  );
}

async function createAccount(accountId) {
  try {
    if (!isValidAccountId(accountId)) {
      return { message: "Invalid account ID" };
    }

    const newAccount = await sendNearTokens(accountId, "1");

    if (newAccount) {
      return { message: "Account created and funded", accountId };
    } else {
      return { message: "Failed to create account" };
    }
  } catch (err) {
    return { message: err.message };
  }
}

module.exports = { createAccount };
