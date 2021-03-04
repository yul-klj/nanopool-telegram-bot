const functionsCaseKeys = require('../functions_case.js').keys;

module.exports = function(bot, notifyChatId, chatId) {
  bot.sendMessage(chatId, 'Help choices', {
    'reply_markup': {
        'keyboard': functionsCaseKeys(),
        hide_keyboard: true,
        resize_keyboard: true,
        one_time_keyboard: false,
        force_reply: true,
    }
  });
};