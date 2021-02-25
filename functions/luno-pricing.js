const request = require('request');
const luno_pricing_url = 'https://ajax.luno.com/ajax/1/price_page_info';

module.exports = function(bot, notifyChatId, chatId) {
  request.post({
    url: luno_pricing_url,
    json: {currency: "ETH"}
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      bot.sendMessage(chatId, `ETH Pricing in Luno now:\nMYR ${parseFloat(body.basicChart.availablePairs[1].amount).toFixed(2)}`);
    }
  });
};