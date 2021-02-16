const request = require('request');
const approxEarn = process.env.NANOPOOL_BASE_URL + 'approximated_earnings/';
const totalReportedHashRate = process.env.NANOPOOL_BASE_URL + 'reportedhashrate/' + process.env.WALLET_ADDRESS;

module.exports = function(bot, notifyChatId, chatId) {
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
  request(totalReportedHashRate, function (error, response, body) {
    let totalHash = 0;
    let res;
    if (!error && response.statusCode == 200) {
      res = JSON.parse(body);
      totalHash = res['data'];
      request(approxEarn + totalHash, function (error, response, body) {
        let line = 'Approx Calculator:-\n';
        if (!error && response.statusCode == 200) {
          res = JSON.parse(body);
          line += `Day: ${parseFloat(res['data']['day']['coins']).toFixed(6)}\n`;
          line += `Week: ${parseFloat(res['data']['week']['coins']).toFixed(6)}\n`;
          line += `Month: ${parseFloat(res['data']['month']['coins']).toFixed(6)}\n`;
          line += `Each ETH Price USD: ${res['data']['prices']['price_usd']}\n`;
          bot.sendMessage(chatId, line);
        }
      });
    }
  });
};