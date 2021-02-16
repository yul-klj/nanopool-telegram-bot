module.exports = {
  status: function(bot, notifyChatId, chatId) {
    if (notifyChatId === '') {
      bot.sendMessage(chatId, 'Nop, please key in `/start` to start monitoring worker hash status.');
    } else {
      bot.sendMessage(chatId, 'Yes it is');
    }
  },
  start: function(bot, notifyChatId, chatId) {
    // `/start` starts the notification checking
    bot.onText(/\/start/, (msg) => {
      var chatId = msg.chat.id;
      notifyChatId = chatId;
      bot.sendMessage(chatId, "Welcome, Bot starts monitoring....");
      console.log('Monitoring started');
    });
  },
  stop: function(bot, notifyChatId, chatId) {
    // `/stop` stops the notification checking
    bot.onText(/\/stop/, (msg) => {
      var chatId = msg.chat.id;
      notifyChatId = '';
      bot.sendMessage(chatId, "Stops monitoring, kills the notification now");
      console.log('Monitoring stops');
    });
  },
};