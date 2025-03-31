let HP = 100;
let playerCondition;
let silver = 0;
let currentWeaponIndex = 0;
let currentArmorIndex = 0;
let fighting = false;
let monsterHP;
let monsterCondition;

const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const playLog = document.getElementById('playLog');
const playerConditionText = document.getElementById('playerCondition');
const silverText = document.getElementById('silverText');
const monsterStats = document.getElementById('monsterStats');
const monsterName = document.getElementById('monsterName');
const monsterConditionText = document.getElementById('monsterCondition');
const poor = 'You do not have enough money.';

const weapons = [
  { name: 'stick', power: 1 },
  { name: 'dagger', power: 5 },
  { name: 'mace', power: 15 },
  { name: 'sword', power: 30 }
];
let currentWeapon = weapons[currentWeaponIndex];
let arsenal = [];
arsenal.push(currentWeapon.name);
console.log({ arsenal });

const armors = [
  { name: 'aketon', power: 1 },
  { name: 'mail armor', power: 5 },
  { name: 'brigantine', power: 15 },
  { name: 'plate armor', power: 30 },
];
let currentArmor = armors[currentArmorIndex];
let armory = [];
armory.push(currentArmor.name);
console.log({ armory });

const monsters = [
  {
    name: 'raptor',
    HP: 10,
    power: 5
  },
  {
    name: 'beast',
    HP: 50,
    power: 20
  },
  {
    name: 'wyvern',
    HP: 150,
    power: 50
  }
];

let foe = monsters[fighting];

const locations = [
  {
    name: 'city gate',
    'button text': ['Go to town square', 'Go to cave', 'Fight wyvern'],
    'button functions': [goSquare, goCave, fightWyvern],
    playLog: 'You are at the city gate. You see the wyvern and a nearby cave.'
  },
  {
    name: 'town square',
    'button text': ['Rest', 'Go to city gate', 'Go to marketplace'],
    'button functions': [rest, goGate, goMarket],
    playLog: 'You are in the town square. You see a sign that reads MARKETPLACE.'
  },
  {
    name: 'market',
    'button text': ['Go to weapons stand', 'Go to armor stand', 'Go to town square'],
    'button functions': [goWeapons, goArmor, goSquare],
    playLog: 'You enter the marketplace. There are weapons and armor for sale.'
  },
  {
    name: 'weapons stand',
    'button text': ['Buy weapon', 'Sell weapon', 'Go to market center'],
    'button functions': [buyWeapon, sellWeapon, goMarket],
    playLog: 'You find the weapons stand.'
  },
  {
    name: 'armors stand',
    'button text': ['Buy armor', 'sell armor', 'Go to market center'],
    'button functions': [buyArmor, sellArmor, goMarket],
    playLog: 'You find the armor stand.'
  },
  {
    name: 'cave',
    'button text': ['Fight raptor', 'Fight beast', 'Go to city gate'],
    'button functions': [fightRaptor, fightBeast, goGate],
    playLog: 'You enter the cave and see some monsters.'
  },
  {
    name: 'fight',
    'button text': ['Attack', 'Dodge', 'Run'],
    'button functions': [combat, dodge, goGate],
    playLog: 'You are fighting a monster.'
  },
  {
    name: 'kill monster',
    'button text': ['Fight raptor', 'Fight beast', 'Go to city gate'],
    'button functions': [fightRaptor, fightBeast, goGate],
    playLog: 'The monster screams as it dies. You earn silver.'
  },
  {
    name: 'game over',
    'button text': ['REPLAY?', 'REPLAY?', 'REPLAY?'],
    'button functions': [restart, restart, restart],
    playLog: 'You die &#x2620. GAME OVER;'
  },
  {
    name: 'win',
    'button text': ['REPLAY?', 'REPLAY?', 'REPLAY?'],
    'button functions': [restart, restart, restart],
    playLog: 'You defeat the wyvern! YOU WIN THE GAME! &#x1F389;'
  }
];

function getPlayerCondition() {
  if (HP === 100) {
    playerCondition = 'great';
  } else if (HP > 100 * (2 / 3)) {
    playerCondition = 'fine';
  } else if (HP > 100 / 3) {
    playerCondition = 'tired';
  } else {
    playerCondition = 'wounded';
  }
  playerConditionText.innerText = playerCondition;
}

function getMonsterCondition() {
  if (fighting !== false) {
    if (monsterHP === foe.HP) {
      monsterCondition = 'great';
    } else if (monsterHP > foe.HP * (2 / 3)) {
      monsterCondition = 'fine';
    } else if (monsterHP > foe.HP / 3) {
      monsterCondition = 'tired';
    } else {
      monsterCondition = 'wounded';
    }
  }
  monsterConditionText.innerText = monsterCondition;
}

function refreshStats() {
  silverText.innerText = silver;
  currentWeapon = weapons[currentWeaponIndex];
  currentArmor = armors[currentArmorIndex];
  foe = monsters[fighting];
  getPlayerCondition();
  getMonsterCondition();
}

function update(location) {
  monsterStats.style.display = 'none';
  button1.innerText = location['button text'][0];
  button2.innerText = location['button text'][1];
  button3.innerText = location['button text'][2];
  button1.onclick = location['button functions'][0];
  button2.onclick = location['button functions'][1];
  button3.onclick = location['button functions'][2];
  playLog.innerHTML = location.playLog;
}

refreshStats();

update(locations[0]);

function goGate() {
  update(locations[0]);
}

function goSquare() {
  update(locations[1]);
}

function goMarket() {
  update(locations[2]);
}

function goWeapons() {
  update(locations[3]);
}

function goArmor() {
  update(locations[4]);
}

function goCave() {
  update(locations[5]);
}

function rest() {
  HP = 100;
  refreshStats();
  playLog.innerText += '\n You rested and are fully recovered.';
}

function buyWeapon() {
  if (currentWeaponIndex < weapons.length - 1) {
    if (silver >= weapons[currentWeaponIndex + 1].power) {
      currentWeaponIndex++;
      silver -= weapons[currentWeaponIndex].power;
      refreshStats();
      arsenal.push(currentWeapon.name);
      playLog.innerText = `You now have a ${currentWeapon.name}.`;
      playLog.innerText += `\n In your arsenal you have: ${arsenal.join(', ')}.`;
      console.log({ arsenal, currentWeapon });
    } else {
      playLog.innerText = poor;
    }
  } else {
    playLog.innerText = 'You already have the most powerful weapon.';
    button2.innerText = 'Sell old weapon';
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (arsenal.length > 1) {
    let soldWeaponName = arsenal.shift();
    playLog.innerText = `You sold a ${soldWeaponName}.`;
    let soldWeapon = weapons.find((weapon) => weapon.name === soldWeaponName);
    silver += soldWeapon.power;
    refreshStats();
    playLog.innerText += `\n In your arsenal you have: ${arsenal.join(', ')}.`;
    console.log({ arsenal, currentWeapon, soldWeapon });
  } else {
    playLog.innerText = `Don't sell your only weapon!`;
  }
}

function buyArmor() {
  if (currentArmorIndex < armors.length - 1) {
    if (silver >= armors[currentArmorIndex + 1].power) {
      currentArmorIndex++;
      silver -= armors[currentArmorIndex].power;
      refreshStats();
      armory.push(currentArmor.name);
      playLog.innerText = `You now have a ${currentArmor.name}.`;
      playLog.innerText += `\n In your armory you have: ${armory.join(', ')}.`;
      console.log({ armory, currentArmor });
    } else {
      playLog.innerText = poor;
    }
  } else {
    playLog.innerText = 'You already have the most powerful armor.';
    button2.innerText = 'Sell old armor';
    button2.onclick = sellArmor;
  }
}

function sellArmor() {
  if (armory.length > 1) {
    let soldArmorName = armory.shift();
    playLog.innerText = `You sold a ${soldArmorName}.`;
    let soldArmor = armors.find((armor) => armor.name === soldArmorName);
    silver += soldArmor.power;
    refreshStats();
    playLog.innerText += `\n In your armory you have: ${armory.join(', ')}.`;
    console.log({ armory, currentArmor, soldArmor });
  } else {
    playLog.innerText = `Don't sell your only armor!`;
  }
}

function fightRaptor() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightWyvern() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[6]);
  foe = monsters[fighting];
  monsterHP = foe.HP;
  monsterStats.style.display = 'flex';
  monsterName.innerText = foe.name;
  refreshStats();
}

function combat() {
  playLog.innerText = `The ${foe.name} attacks.`;
  let monsterHit = foe.power;

  // critFail: 1/5 chance that foe deals half damage
  let failNum = Math.floor(Math.random() * 6);
  let critFail = failNum === 5;
  if (critFail === true) {
    monsterHit /= 2;
    playLog.innerText += `\n The attack failed critically.`;
  }
  // critFail === 0 ? monsterHit /= 2 : monsterHit = monsterHit;

  // remove armor protection points from monsterHit
  monsterHit -= currentArmor.power;

  // add text if foe misses
  if (monsterHit <= 0) {
    playLog.innerText += `\n The ${foe.name} misses.`;
  } else {
    HP -= monsterHit;
    playLog.innerText += '\n You take damage.';
  }

  // check if player lost, if attack if alive
  if (HP <= 0) {
    lose();
  } else {
    playLog.innerText += `\n You attack it with your ${currentWeapon.name}.`;
    let playerHit = currentWeapon.power;

    // 1/5 chance of player crit
    if (Math.random() >= .8 === true) {
      playerHit *= 2;
      monsterHP -= playerHit;
      playLog.innerText += ` It's a critical hit!`;
    } else {
      monsterHP -= playerHit;
    }
    console.log({ failNum, monsterHit, HP, playerHit, monsterHP });
    refreshStats();
    if (monsterHP <= 0) {
      if (fighting === 2) {
        winGame();
      } else {
        defeatMonster();
      }
    }
  }
}

function dodge() {
  playLog.innerText = `You dodge the ${foe.name}'s attack.`;
}

function defeatMonster() {
  silver += Math.floor(foe.power / 2);
  refreshStats();
  update(locations[7]);
}

function lose() {
  update(locations[8]);
}

function winGame() {
  update(locations[9]);
}

function restart() {
  HP = 100;
  silver = 0;
  currentWeaponIndex = 0;
  currentArmorIndex = 0;
  arsenal = [];
  arsenal.push(currentWeapon);
  console.log({ arsenal });
  armory = [];
  armory.push(currentArmor.name);
  console.log({ armory });
  refreshStats();
  goGate();
}
