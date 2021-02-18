const util = require('util');
const request = require('request');
const reportedHashRates = process.env.NANOPOOL_BASE_URL + 'reportedhashrates/' + process.env.WALLET_ADDRESS;
const workers = process.env.NANOPOOL_BASE_URL + 'workers/' + process.env.WALLET_ADDRESS;

module.exports = async function(bot, notifyChatId, chatId) {
  const requestPromise = util.promisify(request);
  const workerReq = await requestPromise(workers);
  const reportHashRateReq = await requestPromise(reportedHashRates);

  let line = 'Something wrong with the api';
  if (workerReq.statusCode == 200 && reportHashRateReq.statusCode == 200) {
    line = '';
    const workerRes = JSON.parse(workerReq.body);
    for (i in workerRes['data']) {
      line += `Current Hash:-\n${workerRes['data'][i]['id']}: [${workerRes['data'][i]['hashrate']}]\n`;
    }

    const reportHashRateRes = JSON.parse(reportHashRateReq.body);
    for (i in reportHashRateRes['data']) {
      line += `Reported Hash:-\n${reportHashRateRes['data'][i]['worker']}: [${reportHashRateRes['data'][i]['hashrate']}]\n`;
    }
  }

  bot.sendMessage(chatId, line);
};