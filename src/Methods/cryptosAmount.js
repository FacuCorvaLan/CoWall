export const amountCryptos = (dataUser) => {
  const totalAmounts = {
    BTC: {amount: 0, moneyARS: 0}, 
    ETH: {amount: 0, moneyARS: 0}, 
    USDT: {amount: 0, moneyARS: 0}, 
    DOGE: {amount: 0, moneyARS: 0}, 
    XRP: {amount: 0, moneyARS: 0}, 
    ADA: {amount: 0, moneyARS: 0}
  };
  
  dataUser.forEach(({ action, crypto_amount, crypto_code, money }) => {
    if (totalAmounts[crypto_code]) {
      totalAmounts[crypto_code].amount += action === "purchase" ? crypto_amount : -crypto_amount;
      totalAmounts[crypto_code].moneyARS += action === "purchase" ? money : -money;
    }
  });
  
  return totalAmounts;
}