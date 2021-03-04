// The key for the variable defines the keyword recieve from bot in caps, its passing in converted to caps
// The value assigned is the functions that needed to be triggered, all has the same variable structure of below
// function(bot, notifyChatId, chatId)

module.exports = {
  config: function() {
    return {
      // Disable monitoring for current moment
      // 'MONITORING': require('./functions/monitoring.js').status,
      // '/START': require('./functions/monitoring.js').start,
      // '/STOP': require('./functions/monitoring.js').stop,
      'HELP': require('./functions/help.js'),
      'SPARK SUMMARY': require('./functions/spark-summary.js'),
      'BLOCK REWARD': require('./functions/block-reward.js'),
      'BR': require('./functions/block-reward.js'),
      'LUNO': require('./functions/luno-pricing.js'),
      'NANO BALANCE': require('./functions/balance.js'),
      'NANO HASHRATE': require('./functions/report-worker.js'),
      'NANO CALCULATOR': require('./functions/calculator.js')
    };
  },
  keys: function() {
    return [
      ['HELP'],
      ['BLOCK REWARD', 'LUNO'],
      ['SPARK SUMMARY'],
      ['NANO BALANCE', 'NANO HASHRATE', 'NANO CALCULATOR']
    ];
  }
};