const request = require('request');
const schedule = require('node-schedule');

module.exports = function(cronSchedule, wokerLimit, bot, notifyChatId) {
  // This schedule function will run every ten min, and check worker as below
  // Woker hashrate < than how much will notify bot
  schedule.scheduleJob(cronSchedule, function(){
    if (notifyChatId === '') {
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
};