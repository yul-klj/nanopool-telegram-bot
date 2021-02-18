// Checkes env available
const dotenv = require('dotenv').config();
const telegramBot = require('./core/telegramMsger');

if (dotenv.error) {
  throw dotenv.error
}

var notifyChatId = '';
var chatId = '';

// Can be enhance to other bot, eg. discord
telegramBot.initialize(notifyChatId, chatId);

// TODO: Currently not working
// For scheduler watcher
// scheduleFunc(
//   process.env.CRON_SHCEDULE,
//   process.env.WORKER_MIN_THRESHOLD.split(","),
//   bot,
//   notifyChatId
// );