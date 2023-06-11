// const keep_alive = require('./keep_alive.js')
const mineflayer = require('mineflayer')
var tpsPlugin = require('mineflayer-tps')(mineflayer)
// const { Configuration, OpenAIApi } = require("openai");
// API_URL = 'https://api-inference.huggingface.co/models/r3dhummingbird/DialoGPT-medium-joshua';
const fs = require('fs');
// const { response } = require('express');
const { join } = require('path');
process.env.TZ = "America/New_York"

bot.loadPlugin(tpsPlugin)

// const configuration = new Configuration({
//   apiKey: OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// async function runCompletion(prefix, msg) {
//   const completion = await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt: msg,
//     temperature: 0.2,
//   });
//   console.log(completion.data.choices[0].text)
//   var ans = completion.data.choices[0].text
//   setTimeout(() => bot.chat(prefix + " " + ans), 2000)
// }

const botCode = (bot) => {
  const msgme = '/m Rorzin '
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  var whoPlayin = []
  var fullJoinLeaveData = []

  bot.once('spawn', () => {
    jsonReader("./msgs.json", (err, fileData) => {
      if (err) {
        console.log(err);
        return;
      }
      everyMsg = new Set(fileData)
    });
    console.log(bot.username + ' is on!')
    bot.chat('/game hera')
    bot.chat(msgme + 'im online')
    setInterval(save, 300000)
    setInterval(antiAfkFunc, 180000)
    setTimeout(() => {
      var intialSetupData = {}
      intialSetupData["playerList"] = playersOnline().toString()
      fullJoinLeaveData.push(intialSetupData)
      fs.writeFile("./playerInfo.json", JSON.stringify([...fullJoinLeaveData], null, 3), err => {
        if (err) console.log("Error writing file:", err);
      });
      whoPlayin = playersOnline()
    }, 10000)
    setInterval(() => {
      var joinLeaveData = {}
      var today = new Date()
      var date = "TPS:" + bot.getTps() + " " + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
      joinLeaveData[date] = playerJoinLeaveData()
      fullJoinLeaveData.push(joinLeaveData)
      fs.writeFile("./playerInfo.json", JSON.stringify([...fullJoinLeaveData], null, 3), err => {
        if (err) console.log("Error writing file:", err);
      });
      whoPlayin = playersOnline()
    }, 60000)
  })

  const messageBoth = (msg) => {
    bot.chat(msgme + msg)
    console.log(msg)
  }

  var antiAfkNum = 1
  const antiAfkFunc = () => {
    if (antiAfkNum % 2 == 0) {
      bot.look(bot.entity.yaw, bot.entity.pitch + 0.3)
    }
    else {
      bot.look(bot.entity.yaw, bot.entity.pitch - 0.3)
    }
    antiAfkNum += 1
    bot.setControlState('jump', true)
    setTimeout(() => {
      bot.clearControlStates()
    }, 1000);
  }

  const tossACoin = () => {
    var outputs = ['heads', 'tails']
    bot.chat('/is chat ' + outputs[Math.floor(Math.random() * 2)])
  }

  const lookAtMe = () => {
    const playerfilter = e => e.type === 'player'
    const playerEntity = bot.nearestEntity(playerfilter)
    if (!playerEntity) return

    const pos = playerEntity.position.offset(0, playerEntity.height, 0)
    bot.lookAt(pos)
  }

  const commands = (msg) => {
    if (msg.includes('look at me')) lookAtMe()
    else if (msg.includes('tp ')) bot.chat('/tpa Rorzin')
    else if (msg.includes('chat')) {
      var arr = msg.split('chat ')
      var chatmsg = arr[arr.length - 1]
      bot.chat(chatmsg)
    }
    else if (msg.includes('save msgs')) save()
    else if (msg.includes('server brand')) console.log(bot.game.serverBrand)
    else if (msg.includes('who playin')) console.log(playersOnline())
    else if (msg.includes('tell tps')) messageBoth(bot.getTps())
    else if (msg.includes('toss a coin')) tossACoin()
    else if (msg.includes('show every msg')) console.log(everyMsg)
  }

  const playersOnline = () => {
    var playerList = []
    for (i in bot.players) playerList.push(bot.players[i].username)
    return playerList
  }

  const playerJoinLeaveData = () => {
    var data = ''
    var newWhoPlayin = playersOnline()
    for (var i in newWhoPlayin) {
      if (!whoPlayin.includes(newWhoPlayin[i])) {
        data = data + newWhoPlayin[i] + " joined "
      }
    }
    for (var i in whoPlayin) {
      if (!newWhoPlayin.includes(whoPlayin[i])) {
        data = data + whoPlayin[i] + " left "
      }
    }
    return data
  }

  function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
      if (err) {
        return cb && cb(err);
      }
      try {
        const object = JSON.parse(fileData);
        return cb && cb(null, object);
      } catch (err) {
        return cb && cb(err);
      }
    });
  }

  const save = () => {
    fs.writeFile("./msgs.json", JSON.stringify([...everyMsg], null, 3), err => {
      if (err) console.log("Error writing file:", err);
    });
  }

  var everyMsg = new Set()
  bot.on('messagestr', (msg) => {
    var msgarr = msg.split(' ')
    if (msg.includes('That belongs to')) return
    if (msg.includes('Welcome') && msg.includes('to Hera Skyblock!')) return
    if (msg.includes('(mcMMO)') && msg.includes('has reached')) return
    if (msg === '') return
    if (msg.includes('PETA removed') && (msg.includes('removed stacked animals from farms.') || msg.includes('animals from crowded farms.'))) return
    joinMsgsList = ['You have joined the Hera queue.', 'Rorzin is not locally present. You must be friends with them to message globally.', 'to official Minecraft account with /online [Switch]', '--------------------------------------------', 'Welcome back to Hera Skyblock, zfertem45.!', 'Survive on a small island in the sky with friends!', 'Learn more about skyblock with /help.', 'Vote today for free rewards with /vote.', 'Join our Discord community with /discord.', 'View available enchantments with /enchants.', 'Fly on your island with /is fly.', 'Remember to vote for money and quests with /vote. Unlock new /tiers by voting at https://vote.herobrine.org.', 'Hover for the word to unscramble for a reward!', '[Help]', 'You have been kicked for idling more than 10 minutes.']
    for (var i in joinMsgsList) if (msg.includes(joinMsgsList[i])) return
    if (msg.includes('voted for rewards!') && msg.includes('votes until the next vote party begins! Vote for rewards with')) return
    if (msg.includes('Sold')) return
    if (msg.includes('Balance: ')) messageBoth(msg)
    if (msg.includes('To: Miscellaneous')) return
    if (msg.includes('PVP disabled in the Overworld')) return
    if (msg.includes('Rorzin has requested to teleport to you')) bot.chat('/tpaccept')

    if (msg.includes('[island] ') && msg.includes(bot.username)) {
      var sender = msgarr[1].split(':')[0]
      if (sender === bot.username) return
      msgarr.shift()
      msgarr.shift()
      var mainmsg = msgarr.join(' ')
      var prefix = '/is chat '
      setTimeout(() => chatgpt(mainmsg, prefix), 1500)
      // setTimeout(() => bot.chat(prefix + " " + runCompletion(mainmsg)), 5000)
    }
    else if (msg.includes('[Message] From ')) {
      var sender = msgarr[2]
      msgarr.shift()
      msgarr.shift()
      msgarr.shift()
      var mainmsg = msgarr.join(' ')
      if (sender === 'Rorzin') commands(mainmsg)
      var prefix = '/m ' + sender
      setTimeout(() => chatgpt(mainmsg, prefix), 1500)
    }
    else {
      var sender = ''
      var ranks = ['[VIP]', '[VIP+]', '[VIP++]', '[MVP]', '[MVP+]', '[MVP++]', '[HERO]']
      var tiers = ['[I]', '[II]', '[III]', '[IV]', '[V]']
      if (ranks.includes(msgarr[0])) {
        sender = msgarr[1]
        msgarr.shift()
      }
      else if (msgarr[0] === '[island]') {
        sender = msgarr[1].split(':')[0]
        if (sender === 'Rorzin' && msg.includes('toss a coin')) tossACoin()
        msgarr.shift()
      }
      else if (msgarr[0] === '[Message]') {
        console.log(msg)
        return
      }
      else sender = msgarr[0]
      msgarr.shift()
      if (tiers.includes(msgarr[0])) msgarr.shift()
      var mainmsg = msgarr.join(' ')
      var msgData = {}
      msgData[sender] = mainmsg
      everyMsg.add(msgData)

      if (sender === bot.username) return
      if (mainmsg.includes(bot.username)) {
        setTimeout(() => {
          chatgpt(mainmsg, '')
        }, 1500)
      }

      var scammerList = ['monstergamer173.', 'eroneffi.']
      if (scammerList.includes(sender)) {
        bot.chat('Above msg was sent by scammer ^^^. For more info, contact Rorzin')
      }
    }
    console.log(bot.username + ': ' + msg)
  })

  const checkBotsOnline = () => {
    const playerList = playersOnline()
    const botList = ['guria872.', 'osipep.', 'Wa3rau.', 'fatup1at.', 'Aruip.', 'Mu4but.']
    for (var i in botList) {
      if (playerList.includes(botList[i])) console.log(botList[i] + ' online!!')
      else if (!playerList.includes(botList[i])) console.log(botList[i] + ' is not online ;-;')
    }
    console.log('')
  }

  const chatgpt = async (msg, prefix) => {
    // if(bot.username === 'ummyeah.') return
    // var msgarr = msg.split(' ')
    // var response = ''

    // var afkResponses = ['no','yes i am afk','no im not afk','dude i am not afk','i am not afk','nah','who is afk? im not','me not afk','not afk']
    // var hiInputs = ['hi','hello','helo','ello','sup','wasup','wadup','hola','hiya','howdy']
    // var hiResponses = ['hi','hello','helo','ello','sup','wadup','wasup','hola','hiya']
    // var haxInputs = ['hacker','hacking','hax','haker','cheater','cheating','haxing','cheat','cheats','hacks','hack']
    // var haxResponses = ['no','nah','im not hacking','no im not cheating','no im not hacking','who is hacking? ik im not','me no hax','how to hack?','no hax','no cheats']

    // if (msg.includes('afk')) {
    //   var response = afkResponses[Math.floor(Math.random() * 10)]
    // }
    // else if (msg.includes('macros')) {
    //   var response = 'no i am not on macros XD'
    // }

    // for(var i in msgarr) {
    //   if(hiInputs.includes(msgarr[i])) {
    //     var response = hiResponses[Math.floor(Math.random() * 10)]
    //   }
    //   else if(haxInputs.includes(msgarr[i])) {
    //     var response = haxResponses[Math.floor(Math.random() * 11)]
    //   }
    // }

    // await bot.chat(prefix + ' ' + response)

    // const headers = {
    //     'Authorization': 'Bearer ' + ""
    // };

    // const payload = {
    //     inputs: {
    //         text: msg
    //     }
    // }

    // const response = await fetch(API_URL, {
    //     method: 'post',
    //     body: JSON.stringify(payload),
    //     headers: headers
    // });
    // const data = await response.json();
    // let botResponse = '';
    // let error = ''
    // if (data.hasOwnProperty('generated_text')) {
    //     botResponse = data.generated_text;
    // } else if (data.hasOwnProperty('error')) { 
    //     error = data.error;
    //     botResponse = 'An error occured, please try again.'
    // }
    // console.log(data, error)
    // bot.chat(prefix + ' ' + botResponse)
  } 
}

const connectBot = (username) => {
  const bot = mineflayer.createBot({
      host: 'herobrine.org',
      username: username,
      version: "1.18.2"
   })

  bot.once('end', () => {
      console.log(`Bot ${username} has been disconnected. Reconnecting in 20 seconds...`)
      setTimeout(() => connectBot(username), 20000)
   })
  
  botCode(bot)
}

connectBot('zfertem45')
