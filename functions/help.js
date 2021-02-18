const functionsCaseKeys = require('../functions_case.js').keys;

module.exports = function(bot, notifyChatId, chatId) {
  const structure = functionsCaseKeys().map(x => [x]);
  bot.sendMessage(chatId, 'Help choices', {
    'reply_markup': {
        'keyboard': structure,
        hide_keyboard: true,
        resize_keyboard: true,
        one_time_keyboard: false,
        force_reply: true,
    }
  });
};