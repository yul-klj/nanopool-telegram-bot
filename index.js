// Checkes env available
const dotenv = require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const functionsCaseConfig = require('./functions_case.js').config;
const scheduleFunc = require('./functions/schedule.js');

if (dotenv.error) {
  throw dotenv.error
}

var notifyChatId = '';
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
  var chatId = msg.chat.id;
  var text = msg.text;
  let keyword = text.toUpperCase();

  if (typeof functionsCaseConfig()[keyword] !== "function") {
    bot.sendMessage(chatId, 'The command is not available.');
  } else {
    functionsCaseConfig()[keyword](bot, notifyChatId, chatId);
  }
});

// TODO: Currently not working
// For scheduler watcher
// scheduleFunc(
//   process.env.CRON_SHCEDULE,
//   process.env.WORKER_MIN_THRESHOLD.split(","),
//   bot,
//   notifyChatId
// );