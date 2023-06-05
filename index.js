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
connectBot('guria872')
setTimeout(() => connectBot('immelol'), 2000)
setTimeout(() => connectBot('ummyeah'), 4000)
setTimeout(() => connectBot('JoinGotham1'), 6000)
setTimeout(() => connectBot('JoinGothamDmtr'), 8000)
setTimeout(() => connectBot('googlesucks'), 10000)
setTimeout(() => connectBot('FeetLover'), 12000)
setTimeout(() => connectBot('appletvHD'), 14000)
// keep_alive.keepAlive()
