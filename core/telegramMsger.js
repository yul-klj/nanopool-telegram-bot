const TelegramBot = require('node-telegram-bot-api');
const functionsCaseConfig = require('../functions_case.js').config;

module.exports = {
  initialize: function(notifyChatId, chatId) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const bot = new TelegramBot(token, {polling: true});

    bot.on('message', (msg) => {
      chatId = msg.chat.id;
      var text = msg.text;
      let keyword = text.toUpperCase();

      if (typeof functionsCaseConfig()[keyword] !== "function") {
        bot.sendMessage(chatId, 'The command is not available.');
      } else {
        functionsCaseConfig()[keyword](bot, notifyChatId, chatId);
      }
    });
  }
};