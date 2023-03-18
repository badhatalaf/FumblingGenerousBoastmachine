const keep_alive = require('./keep_alive.js')
const mineflayer = require('mineflayer')
// const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const pvp = require('mineflayer-pvp').plugin
const armorManager = require('mineflayer-armor-manager')
//const autoeat = require('mineflayer-auto-eat').default
const navigatePlugin = require('mineflayer-navigate')(mineflayer)
// const GoalFollow = goals.GoalFollow

const connectBot = (username) => {
    const bot = mineflayer.createBot({
      host: 'herobrine.org',
      username: username,
      version: '1.18.2'
    })
    bot.once('end', () => {
        console.log(`Bot ${username} has been disconnected. Reconnecting in 10 seconds...`)
        setTimeout(() => connectBot(username), 10000)
    })
        //bot.loadPlugin(autoeat)
    navigatePlugin(bot)
  // bot.loadPlugin(pathfinder)
    bot.loadPlugin(pvp)
    bot.loadPlugin(armorManager)

    const template = require('./hbbottemplate')
    template.botcode(bot, 'hera', 'bot_mail')
    // Add your bot plugins and code here
}
  
// Start multiple bots by calling connectBot with different usernames
connectBot('immelol')
connectBot('ummyeah')
connectBot('appletvHD')
keep_alive.keepAlive()
