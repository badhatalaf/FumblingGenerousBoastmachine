function botcode(bot, game, mail) {
    const msgme = '/m Rorzin '
    const auraToggle = true
  
    const sneak = () => {
      bot.setControlState(control = 'sneak', true)
    }
  
    const moveForward = () => {
      bot.setControlState(control = 'forward', true)
      setTimeout(() => {
        bot.clearControlStates()
      }, 3000);
    }
  
    const moveLeft = () => {
      bot.setControlState(control = 'left', true)
    }
  
    bot.on('windowOpen', (window) => {
      if (window.title.includes('Quick Sell')) {
        for (var i = 9; i <= 44; i++) {
          if (i == 36) continue
          bot.simpleClick.leftMouse(i)
          if (i == 44) window.close()
        }
      }
    })
  
    const sellRods = () => {
      setInterval(() => bot.chat('/ ds qsell'), 5000)
    }
  
    const stopMoving = () => {
      bot.clearControlStates()
    }
  
    const messageBoth = (msg) => {
      bot.chat(msgme + msg)
    }
  
    const equipSword = () => {
      const sword = bot.inventory.items().find(item => item.name.includes('sword'))
      if (sword) bot.equip(sword, 'hand')
    }
  
    const normalaura = () => {
      messageBoth('attacking')
      setInterval(() => {
        if (auraToggle) {
          equipSword()
          const mobfilter = e => e.name === 'spider' || e.name === 'cave_spider' || e.name === 'zombie' || e.name === 'skeleton' || e.name === 'blaze'
          var mob = bot.nearestEntity(mobfilter)
          if (mob) {
            var pos = mob.position.offset(0, mob.height / 3, 0)
            bot.lookAt(pos, true, () => bot.attack(mob))
          }
          setTimeout(() => {
            if (mob) {
              bot.attack(mob)
            }
          }, 900);
        }
      }, 1000);
      setInterval(() => {
        if (auraToggle) nearbyPlayers()
      }, 5000)
    }
  
    //     bot.navigate.on('cannotFind', function (closestPath) {
    //         bot.navigate.walk(closestPath);
    //     });
  
    var cenumber = 0
  
    const buyUnopened = (cename) => {
      if (cename === 'ultimate') cenumber = 5
      else if (cename === 'legendary') cenumber = 6
      else if (cename === 'heroic') cenumber = 13
      setTimeout(() => {
        bot.chat('/e')
      }, 1000);
    }
  
    bot.on('windowOpen', (window) => {
      if (window.title.includes('"Server Enchanter"')) {
        bot.simpleClick.leftMouse(cenumber)
      }
      if (window.title.includes('"Confirmation Inventory"')) {
        bot.simpleClick.leftMouse(1)
      }
    })
  
    const whatInInv = () => {
      for (var i in bot.inventory.items()) {
        console.log(bot.inventory.items()[i].name)
      }
    }
  
    //     const startTrading = () => {
    //         const villagerfilter = e => e.name === 'villager'
    //         const nearestVillager = bot.nearestEntity(villagerfilter)
    //         bot.chat('/home')
    //         setTimeout(() => {
    //             bot.navigate.to(nearestVillager.position)
    //             console.log(nearestVillager.position)
    //         }, 2000);
    //         setTimeout(() => {
    //             bot.lookAt(nearestVillager.position.offset(0,nearestVillager.height,0))
    //         }, 6000);
    //         setTimeout(() => {
    //             bot.openVillager()
    //             console.log(nearestVillager.trades)
    //         }, 8000);
    //     }
  
    const throwTrash = () => {
      messageBoth('throwing')
      if (bot.inventory.items().length === 0) return
      const item = bot.inventory.items()[0]
      if (item.name === 'string' || item.name === 'bone' || item.name === 'arrow' || item.name === 'spider_eye' || item.name === 'rotten_flesh') bot.tossStack(item, throwTrash)
    }
  
    const lookAtMe = () => {
      const playerfilter = e => e.type === 'player'
      const playerEntity = bot.nearestEntity(playerfilter)
      if (!playerEntity) return
  
      const pos = playerEntity.position.offset(0, playerEntity.height, 0)
      bot.lookAt(pos)
    }
  
    const lookAtBlaze = () => {
      const blazefilter = e => e.name === 'blaze'
      const blazeEntity = bot.nearestEntity(blazefilter)
      if (!blazeEntity) return
  
      const pos = blazeEntity.position.offset(0, blazeEntity.height / 3, 0)
      bot.lookAt(pos)
    }
  
    bot.on('physicsTick', lookAtBlaze)
  
    const nearbyPlayers = () => {
      const distance = 100
      const nearplayers = Object.values(bot.entities).filter(e => e.type === 'player' && bot.entity.position.distanceTo(e.position) <= distance && e !== bot.entity).map(p => p.username)
      for (const key in nearplayers) {
        //  bot.chat('/m ' + nearplayers[key] + ' can i pls farm xp alone?')
        const playerList = ['DR4C0N14N.', 'DR4C0N14N', 'TBG89.', 'Fus1', '_Lezly', 'LalaLexie.', 'Lynch12345.', 'OnlyRedOpps21.', 'abedqwer.', 'FlanNolan.', 'itdimk.', 'dANiael471.', 'MoosaImran.', 'Eren_Yaeger_.', 'SidraPlayz.', 'DrBaconXD.']
        if (playerList.includes(nearplayers[key])) {
          bot.chat('/hub')
          setTimeout(() => {
            bot.chat('/game ' + game)
          }, 30000)
        }
      }
    }
  
    const joinagain = () => {
      bot.chat('/hub')
      setTimeout(() => {
        bot.chat('/game ' + game)
      }, 100000);
    }
  
    const commands = (msg) => {
      //         if (msg.includes('come')) followPlayer()
      if (msg.includes('buy legendary')) buyUnopened('legendary')
      else if (msg.includes('buy ultimate')) buyUnopened('ultimate')
      else if (msg.includes('buy heroic')) buyUnopened('heroic')
      else if (msg.includes('crouch')) sneak()
      else if (msg.includes('forward')) moveForward()
      else if (msg.includes('move left')) moveLeft()
      else if (msg.includes('stop moving')) stopMoving()
      else if (msg.includes('tp')) bot.chat('/tpa Rorzin')
      else if (msg.includes('look at me')) lookAtMe()
      else if (msg.includes('quit')) bot.quit()
      else if (msg.includes('sell rods')) sellRods()
      else if (msg.includes('who is near')) nearbyPlayers()
      else if (msg.includes('what in inv?')) whatInInv()
      else if (msg.includes('aura')) normalaura()
      else if (msg.includes('go to xp farm')) {
        bot.chat('/home')
        setTimeout(() => moveForward(), 2000)
      }
      else if (msg.includes('throw trash')) throwTrash()
      else if (msg.includes('toggle aura')) {
        if (auraToggle) auraToggle = false
        else auraToggle = true
      }
      else if (msg.includes('join again')) joinagain()
      else if (msg.includes('xp?')) messageBoth(bot.experience.level)
      else if (msg.includes('points??')) messageBoth(bot.experience.points)
      else if (msg.includes('chat')) {
        var arr = msg.split('chat ')
        var chatmsg = arr[arr.length - 1]
        bot.chat(chatmsg)
      }
      //         else if (msg.includes('fight me')) bot.pvp.attack(bot.players['Rorzin'].entity)
      //         else if (msg.includes('stop fight')) bot.pvp.stop()
      //         else if (msg.includes('start trade')) startTrading()
    }
  
    //     const followPlayer = () => {
    //         const Badhatalaf = bot.players['Rorzin']
    //         if(!Badhatalaf || !Badhatalaf.entity) {
    //             bot.chat(msgme + 'cant find u')
    //             return
    //         }
  
    //         // const mcData = require('minecraft-data')(bot.version)
    //         // const movements = new Movements(bot, mcData)
    //         // movements.scafoldingBlocks = []
    //         // bot.pathfinder.setMovements(movements)
    //         // const goal = new GoalFollow(Rorzinentity, 1)
    //         // bot.pathfinder.setGoal(goal)
  
    //         bot.navigate.to(Badhatalaf.entity.position)
    //         console.log(Badhatalaf.entity.position)
    //     }
  
    bot.on('messagestr', (msg) => {
      if (msg.includes('That belongs to')) return
      if (msg.includes('Sold')) return
      if (msg.includes('Balance: ')) messageBoth(msg)
      if (msg.includes('To: Miscellaneous')) return
      if (msg.includes('PVP disabled in the Overworld')) return
      console.log(bot.username + ': ' + msg)
    })
  
    bot.on('playerCollect', (collector, itemDrop) => {
      if (collector !== bot.entity) return
  
      setTimeout(() => {
        const sword = bot.inventory.items().find(item => item.name.includes('sword'))
        if (sword) bot.equip(sword, 'hand')
      }, 150);
    })
  
    bot.on('chat', (target, msg) => {
      if (msg.includes('From Rorzin ')) commands(msg)
  
      if (msg.toLowerCase().includes(bot.username) || msg.includes('From')) {
        var prefix = ''
        var msgarr = msg.split(' ')
        var sender = ''
        if (msgarr[0] === '[Message]') { sender = msgarr[2] }
        else { sender = msgarr[1] }
  
        if (msg.includes('From')) prefix = '/m ' + sender
  
        setTimeout(() => {
          if (msg.includes('afk')) bot.chat(prefix + ' i am not afk btw just farming xp lmao')
          else if (msg.includes('macros')) bot.chat(prefix + ' no i am not on macros XD')
          else if (msg.includes('hi') || msg.includes('hello') || msg.includes('sup')) bot.chat(prefix + " hi im kinda busy rn i'll get back at u later")
          else if (msg.includes('hacker') || msg.includes('haker')) bot.chat(prefix + ' no i am not hacker lol')
          else if (msg.includes('can') && msg.includes('give') && msg.includes('money')) bot.chat(prefix + ' fk off mother fucker go earn money instead of begging')
        }, 2000);
      }
    })
  
    var isOn = false
    bot.once('spawn', () => {
      isOn = true
      console.log(bot.username + ' is on!')
      // if(bot.username === 'cesbot001.','cesbot002.','cesbot003.','cesbot004.','cesbot005.','quaif.','xbandsx.','danthedumfk.','jokerx.','Mirandez.','Neonxd.','Redeeznuts.','DrunkPlayer.') setInterval(() => bot.chat("/game demeter"), 100000)
      bot.chat('/game ' + game)
      bot.chat(msgme + 'im online')
      if (game === 'demeter') {
        setTimeout(() => {
          normalaura()
        }, 20000);
      }
      else if (game === 'hera') {
        setTimeout(() => {
          if (bot.username === 'immelol.' || bot.username === 'JoinGothamDmtr.') normalaura()
        }, 10000)
        setTimeout(() => {
          sellRods()
        }, 20000)
      }
    })
  
    bot.on('kicked', console.log)
    // bot.on('error', console.log)
    bot.on('death', () => {
      console.log(bot.username + ' down!!')
      messageBoth(bot.username + ' down!!')
    })
  
    // setTimeout(() => {
    //     if(isOn == false) bot.chat('/login')
    // }, 300000)
  }
  
  module.exports = { botcode }
  