const request = require('request');
const balance = process.env.NANOPOOL_BASE_URL + 'balance_hashrate/' + process.env.WALLET_ADDRESS;

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
  request(balance, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const res = JSON.parse(body);
      bot.sendMessage(chatId, `At ${today}:-\nETH Balance: ${parseFloat(res['data']['balance']).toFixed(7)}`);
    }
  });
};
