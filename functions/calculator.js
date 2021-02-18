const util = require('util');
const request = require('request');
const approxEarn = process.env.NANOPOOL_BASE_URL + 'approximated_earnings/';
const totalReportedHashRate = process.env.NANOPOOL_BASE_URL + 'reportedhashrate/' + process.env.WALLET_ADDRESS;
const balance = process.env.NANOPOOL_BASE_URL + 'balance_hashrate/' + process.env.WALLET_ADDRESS;

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

  let totalHash = 0;
  let dailyCoinEarn = 0;

  const requestPromise = util.promisify(request);
  const totalReportedReq = await requestPromise(totalReportedHashRate);
  const totalReportedRes = JSON.parse(totalReportedReq.body);

  const approxEarnReq = await requestPromise(approxEarn + totalReportedRes['data']);
  const approxEarnRes = JSON.parse(approxEarnReq.body);

  const balanceReq = await requestPromise(balance);
  const balanceRes = JSON.parse(balanceReq.body);

  let line = 'Something wrong with the api';
  if (
    totalReportedReq.statusCode == 200 &&
    approxEarnReq.statusCode == 200 &&
    balanceReq.statusCode == 200
  ) {
    // Calculator
    line = 'Approx Calculator:-\n';
    dailyCoinEarn = approxEarnRes['data']['day']['coins'];
    line += `Day: ${parseFloat(approxEarnRes['data']['day']['coins']).toFixed(6)}\n`;
    line += `Week: ${parseFloat(approxEarnRes['data']['week']['coins']).toFixed(6)}\n`;
    line += `Month: ${parseFloat(approxEarnRes['data']['month']['coins']).toFixed(6)}\n`;
    line += `Each ETH Price USD: ${approxEarnRes['data']['prices']['price_usd']}\n`;

    // Estimate Payout
    const estimateDay = (0.1 - balanceRes['data']['balance']) / dailyCoinEarn;
    line += `\nEstimate Payout 0.1 in:\n${parseFloat(estimateDay).toFixed(2)} Day(s) \n`;
  }

  bot.sendMessage(chatId, line);
};