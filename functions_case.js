// The key for the variable defines the keyword recieve from bot in caps, its passing in converted to caps
// The value assigned is the functions that needed to be triggered, all has the same variable structure of below
// function(bot, notifyChatId, chatId)
var config = {
  // Disable monitoring for current moment
  // 'MONITORING': require('./functions/monitoring.js').status,
  // '/START': require('./functions/monitoring.js').start,
  // '/STOP': require('./functions/monitoring.js').stop,
  'BR': require('./functions/block-reward.js'),
  'BLOCK REWARD': require('./functions/block-reward.js'),
  'BALANCE': require('./functions/balance.js'),
  'HASHRATE': require('./functions/report-worker.js'),
  'CALCULATOR': require('./functions/calculator.js'),
};

module.exports = config;