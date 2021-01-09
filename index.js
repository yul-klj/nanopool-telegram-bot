// Checkes env available
const dotenv = require('dotenv').config();
const request = require('request');
const TelegramBot = require('node-telegram-bot-api');
const schedule = require('node-schedule');

if (dotenv.error) {
  throw dotenv.error
}

var notifyChatId = '';
const reportedHashRates = process.env.NANOPOOL_BASE_URL + 'reportedhashrates/' + process.env.WALLET_ADDRESS;
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});
var wokerLimit = process.env.WORKER_MIN_THRESHOLD.split(",");

// `/start` starts the notification checking
bot.onText(/\/start/, (msg) => {
  var chatId = msg.chat.id;
  notifyChatId = chatId;
  bot.sendMessage(chatId, "Welcome, Bot starts monitoring....");
  console.log('Monitoring started');
});

// `/stop` stops the notification checking
bot.onText(/\/stop/, (msg) => {
  var chatId = msg.chat.id;
  notifyChatId = '';
  bot.sendMessage(chatId, "Stops monitoring, kills the notification now");
  console.log('Monitoring stops');
});

bot.on('message', (msg) => {
  var chatId = msg.chat.id;
  var text = msg.text;

  switch (text.toUpperCase()) {
    case 'MONITORING':
      if (notifyChatId === '') {
        bot.sendMessage(chatId, 'Nop, please key in `/start` to start monitoring');
      } else {
        bot.sendMessage(chatId, 'Yes it is');
      }
      break;
    case 'TELL ME':
      var today = new Date().toLocaleDateString('en-GB', {
          day:   'numeric',
          month: 'short',
          year:  'numeric',
          hour:   '2-digit',
          minute: '2-digit',
          second: '2-digit'
      });
      request(reportedHashRates, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          const res = JSON.parse(body);
          var line = 'Worker details as of ' + ':- \n' + today + '\n';
          for (i in res['data']) {
            line += res['data'][i]['worker'] + ' : [' + res['data'][i]['hashrate'] + ']\n';
          }
          bot.sendMessage(chatId, line);
        }
      });
      break;
  }
});

// This schedule function will run every ten min, and check worker as below
// Woker hashrate < than how much will notify bot
schedule.scheduleJob(process.env.CRON_SHCEDULE, function(){
  if (notifyChatId === '') {
    console.log('No monitoring being initialize');
    return;
  }

  request(reportedHashRates, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          const res = JSON.parse(body);
          for (i in res['data']) {
            if (res['data'][i]['hashrate'] < parseInt(wokerLimit[i])) {
              bot.sendMessage(notifyChatId, 'Worker ' + res['data'][i]['worker'] + ' IS DOWN!');
            }
          }
      }
  });
});
