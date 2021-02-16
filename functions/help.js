const functionsCaseKeys = require('../functions_case.js').keys;

module.exports = function(bot, notifyChatId, chatId) {
  const structure = functionsCaseKeys().map(x => [x]);
  bot.sendMessage(chatId, 'Choices Below', {
    'reply_markup': {
        'keyboard': structure,
        resize_keyboard: true,
        one_time_keyboard: true,
        force_reply: true,
    }
  });
};