const request = require('request');
const reportedHashRates = process.env.NANOPOOL_BASE_URL + 'reportedhashrates/' + process.env.WALLET_ADDRESS;
const workers = process.env.NANOPOOL_BASE_URL + 'workers/' + process.env.WALLET_ADDRESS;

module.exports = function(bot, notifyChatId, chatId) {
  request(workers, function (error, response, body) {
    let line = '';
    if (!error && response.statusCode == 200) {
      const res = JSON.parse(body);
      for (i in res['data']) {
        line += `Workers Current:-\n${res['data'][i]['id']}: [${res['data'][i]['hashrate']}]\n`;
      }
      bot.sendMessage(chatId, line);
    }
  });


  request(reportedHashRates, function (error, response, body) {
    let line = '';
    if (!error && response.statusCode == 200) {
      const res = JSON.parse(body);
      for (i in res['data']) {
        line += `Workers Reported:-\n${res['data'][i]['worker']}: [${res['data'][i]['hashrate']}]\n`;
      }
    }
    bot.sendMessage(chatId, line);
  });

};