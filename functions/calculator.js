const util = require('util');
const request = require('request');
const approxEarn = process.env.NANOPOOL_BASE_URL + 'approximated_earnings/';
const totalReportedHashRate = process.env.NANOPOOL_BASE_URL + 'reportedhashrate/' + process.env.WALLET_ADDRESS;
const balance = process.env.NANOPOOL_BASE_URL + 'balance_hashrate/' + process.env.WALLET_ADDRESS;
const payoutSetting = process.env.NANOPOOL_BASE_URL + 'usersettings/' + process.env.WALLET_ADDRESS;

module.exports = async function(bot, notifyChatId, chatId) {
  let dailyCoinEarn = 0;

  const requestPromise = util.promisify(request);
  const totalReportedReq = await requestPromise(totalReportedHashRate);
  const totalReportedRes = JSON.parse(totalReportedReq.body);

  const approxEarnReq = await requestPromise(approxEarn + totalReportedRes['data']);
  const approxEarnRes = JSON.parse(approxEarnReq.body);

  const balanceReq = await requestPromise(balance);
  const balanceRes = JSON.parse(balanceReq.body);

  const payoutSettingReq = await requestPromise(payoutSetting);
  const payoutSettingRes = JSON.parse(payoutSettingReq.body);

  let line = 'Something wrong with the api';
  if (
    totalReportedReq.statusCode == 200 &&
    approxEarnReq.statusCode == 200 &&
    balanceReq.statusCode == 200 &&
    payoutSettingReq.statusCode == 200
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
    line += `\nEstimate Payout ${payoutSettingRes['data']['payout']} in:\n${parseFloat(estimateDay).toFixed(2)} Day(s) \n`;
  }

  bot.sendMessage(chatId, line);
};