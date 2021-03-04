const util = require('util');
const request = require('request');
const balance = process.env.SPARKPOOL_BASE_URL + 'bill/stats?currency=eth&miner=' + process.env.WALLET_ADDRESS.substring(2);
const currentPrice = process.env.SPARKPOOL_BASE_URL + 'currency/stats?currency=eth';

module.exports = async function(bot, notifyChatId, chatId) {
  var convertTZ = function(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-GB", {timeZone: tzString}));
  }
  var today = convertTZ(new Date(), "Asia/KUALA_LUMPUR").toLocaleDateString('en-GB', {
    day:   'numeric',
    month: 'short',
    year:  'numeric',
    hour:   '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const requestPromise = util.promisify(request);
  const balanceReq = await requestPromise(balance);

  const currentPriceReq = await requestPromise(currentPrice);

  let line = 'Something wrong with the api';
  if (balanceReq.statusCode == 200 && currentPriceReq.statusCode == 200) {
    const balanceRes = JSON.parse(balanceReq.body);
    line = '';
    line += `At ${today}:-\nETH Balance: ${parseFloat(balanceRes['data']['balance']).toFixed(7)}\n\n`;
    line += 'Approx Calculator:-\n';
    line += `Day: ${parseFloat(balanceRes['data']['pay1day']).toFixed(6)}\n`;
    line += `Week: ${parseFloat(balanceRes['data']['pay1week']).toFixed(6)}\n`;
    line += `Month: ${parseFloat(balanceRes['data']['pay1day'] * 30).toFixed(6)}\n`;

    const currentPriceRes = JSON.parse(currentPriceReq.body);
    line += `Each ETH Price USD: ${parseFloat(currentPriceRes['data']['usd']).toFixed(2)}\n`;

    const estimateDay = (0.1 - balanceRes['data']['balance']) / parseFloat(balanceRes['data']['pay1day']).toFixed(6);
    line += `\nEstimate Payout 0.1 in:\n${parseFloat(estimateDay).toFixed(2)} Day(s) \n`;
  }

  bot.sendMessage(chatId, line);
};
