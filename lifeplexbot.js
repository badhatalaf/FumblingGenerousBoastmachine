const mineflayer = require('mineflayer')
const bot = mineflayer.createBot({
    host: 'lifeplex.aternos.me',
    username: 'botty',
    version: '1.19.1'
})

bot.once('spawn', () => {
    console.log(bot.username + ' is on!!')
    bot.chat('Hiya!')
})
