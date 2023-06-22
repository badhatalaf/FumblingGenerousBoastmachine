// const keep_alive = require('./keep_alive.js')
const mineflayer = require('mineflayer')
// const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
// const pvp = require('mineflayer-pvp').plugin
// const armorManager = require('mineflayer-armor-manager')
// const autoeat = require('mineflayer-auto-eat').default
// const navigatePlugin = require('mineflayer-navigate')(mineflayer)
// const GoalFollow = goals.GoalFollow
// eeeeeeee

const connectBot = (username) => {
  const bot = mineflayer.createBot({
    host: 'herobrine.org',
    username: username,
    version: '1.18.2'
  })
  bot.once('end', () => {
    console.log(`Bot ${username} has been disconnected. Reconnecting in 20 seconds...`)
    setTimeout(() => connectBot(username), 20000)
  })
  //bot.loadPlugin(autoeat)
  //     navigatePlugin(bot)
  // bot.loadPlugin(pathfinder)
  //     bot.loadPlugin(pvp)
  //     bot.loadPlugin(armorManager)

  const template = require('./hbbottemplate')
  template.botcode(bot, 'hera', 'bot_mail')
  // Add your bot plugins and code here
}

// Start multiple bots by calling connectBot with different usernames
connectBot('FeetLover')
setTimeout(() => connectBot('GS_Gamer123'), 20000)
setTimeout(() => connectBot('Amanda2005'), 40000)
setTimeout(() => connectBot('BadhatalafAlt'), 60000)
setTimeout(() => connectBot('LGBTSupporter'), 80000)
setTimeout(() => connectBot('ABEDSAIDICANAFK'), 100000)
// keep_alive.keepAlive()
