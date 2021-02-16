const rp = require('request-promise');
const $ = require('cheerio');
const whattomineUrl = 'https://whattomine.com/coins/151-eth-ethash';

module.exports = function(bot, notifyChatId, chatId) {
  rp(whattomineUrl)
  .then(function(html){
    //success!
    bot.sendMessage(chatId, `Block Reward: ${$('#br', html).val()}`);
  })
  .catch(function(err){
    bot.sendMessage(chatId, `Something wrong getting Block Reward.`);
  });
};