let HP = 100;
let playerCondition;
let gold = 0;
let currentWeaponIndex = 0;
let currentArmorIndex = 0;
let fighting = false;
let monsterHP;
let monsterCondition;

const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const log = document.querySelector('#log');
const playerConditionText = document.querySelector('#playerCondition');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const monsterName = document.querySelector('#monsterName');
const monsterConditionText = document.querySelector('#monsterCondition');
const poor = 'You do not have enough money.';

const weapons = [
  {name: 'stick', power: 1, value: 1},
  {name: 'dagger', power: 10, value: 5},
  {name: 'mace', power: 20, value: 10},
  {name: 'sword', power: 30, value: 20}
];
let currentWeapon = weapons[currentWeaponIndex];
let arsenal = [];
arsenal.push(currentWeapon.name);
console.log('arsenal:');
console.log(arsenal.join(', '));

const armors = [
  {name: 'aketon', protection: 1, value: 1},
  {name: 'mail armor', protection: 5, value: 5},
  {name: 'brigantine', protection: 10, value: 10},
  {name: 'plate armor', protection: 20, value: 10},
];
let currentArmor = armors[currentArmorIndex];
let armory = [];
armory.push(currentArmor.name);
console.log('armory:');
console.log(armory.join(', '));

const monsters = [
  {
    name: 'rat',
    HP: 5,
    power: 2
  },
  {
    name: 'beast',
    HP: 50,
    power: 5
  },
  {
    name: 'dragon',
    HP: 200,
    power: 20
  }
];

const locations = [
  {
    name: 'city gate',
    'button text': ['Go to town square', 'Go to cave', 'Fight dragon'],
    'button functions': [goSquare, goCave, fightDragon],
    log: 'You are at the city gate. You see the dragon and a nearby cave.'
  },
  {
    name: 'town square',
    'button text': ['Rest', 'Go to city gate', 'Go to marketplace'],
    'button functions': [rest, goGate, goMarket],
    log: 'You are in the town square. You see a sign that reads MARKETPLACE.'
  },
  {
    name: 'market',
    'button text': ['Go to weapons stand', 'Go to armor stand', 'Go to town square'],
    'button functions': [goWeapons, goArmor, goSquare],
    log: 'You enter the marketplace. There are weapons and armor for sale.'
  },
  {
    name: 'weapons stand',
    'button text': ['Buy weapon', 'Sell weapon', 'Go to market center'],
    'button functions': [buyWeapon, sellWeapon, goMarket],
    log: 'You find the weapons stand.'
  },
  {
    name: 'armors stand',
    'button text': ['Buy armor', 'sell armor', 'Go to market center'],
    'button functions': [buyArmor, sellArmor, goMarket],
    log: 'You find the armor stand.'
  },
  {
    name: 'cave',
    'button text': ['Fight rat', 'Fight beast', 'Go to city gate'],
    'button functions': [fightRat, fightBeast, goGate],
    log: 'You enter the cave. You see some monsters.'
  },
  {
    name: 'fight',
    'button text': ['Attack', 'Dodge', 'Run'],
    'button functions': [attack, dodge, goGate],
    log: 'You are fighting a monster.'
  },
  {
    name: 'kill monster',
    'button text': ['Fight rat', 'Fight beast', 'Go to city gate'],
    'button functions': [fightRat, fightBeast, goGate],
    log: 'The monster screams as it dies. You earn gold.'
  },
  {
    name: 'game over',
    'button text': ['REPLAY?', 'REPLAY?', 'REPLAY?'],
    'button functions': [restart, restart, restart],
    log: 'You die. &#x2620 GAME OVER;'
  },
  { 
    name: 'win', 
    'button text': ['REPLAY?', 'REPLAY?', 'REPLAY?'], 
    'button functions': [restart, restart, restart], 
    log: 'You defeat the dragon! YOU WIN THE GAME! &#x1F389;' 
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
    if (monsterHP === monsters[fighting].HP) {
      monsterCondition = 'great';
    } else if (monsterHP > monsters[fighting].HP * (2 / 3)) {
      monsterCondition = 'fine';
    } else if (monsterHP > monsters[fighting].HP / 3) {
      monsterCondition = 'tired';
    } else {
      monsterCondition = 'wounded';
    }
  }
  monsterConditionText.innerText = monsterCondition;
}

function refreshStats(){
  goldText.innerText = gold;
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
  log.innerHTML = location.log;
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
  log.innerText += '\n You rested and are fully recovered.';
}

function buyWeapon() {
  if (currentWeaponIndex < weapons.length - 1) {
    if (gold >= weapons[currentWeaponIndex + 1].value) {
      currentWeaponIndex++;
      gold -= currentWeapon.value;
      arsenal.push(currentWeapon.name);
      log.innerText = `You now have a ${currentWeapon.name}.`;
      refreshStats();
      log.innerText += `\n In your arsenal you have: ${arsenal.join(', ')}`;
      console.log('arsenal:');
      console.log(arsenal.join(', '));
      console.log('current weapon:');
      console.log(currentWeapon.name);
    } else {
      log.innerText = poor;
    }
  } else {
    log.innerText = 'You already have the most powerful weapon.';
    button2.innerText = 'Sell old weapon';
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (arsenal.length > 1) {
    let soldWeaponName = arsenal.shift();
    log.innerText = `You sold a ${soldWeaponName}.`;
    let soldWeapon = weapons.find((weapon) => weapon.name === soldWeaponName);
    gold += soldWeapon.value;
    refreshStats();
    log.innerText += `\n In your arsenal you have: ${arsenal.join(', ')}`;
    console.log('arsenal:');
      console.log(arsenal.join(', '));
      console.log('current weapon:');
      console.log(currentWeapon.name);
      console.log('sold weapon:');
      console.log(soldWeapon);
  } else {
    log.innerText = 'Don\'t sell your only weapon!';
  }
}

function buyArmor(){
  if (currentArmorIndex < armors.length - 1) {
    if (gold >= armors[currentArmorIndex + 1].value) {
      currentArmorIndex++;
      gold -= currentArmor.value;
      armory.push(currentArmor.name);
      log.innerText = `You now have a ${currentArmor.name}.`;
      refreshStats();
      log.innerText += `\n In your armory you have: ${armory.join(', ')}`;
      console.log('armory:');
      console.log(armory.join(', '));
      console.log('current armor:');
      console.log(currentArmor.name);
    } else {
      log.innerText = poor;
    }
  } else {
    log.innerText = 'You already have the most powerful armor.';
    button2.innerText = 'Sell old armor';
    button2.onclick = sellArmor;
  }
}

function sellArmor(){
  if (armory.length > 1) {
    let soldArmorName = armory.shift();
    log.innerText = 'You sold a ' + soldArmorName + '.';
    let soldArmor = armors.find((armor) => armor.name === soldArmorName);
    gold += soldArmor.value;
    refreshStats();
    log.innerText += '\n In your armory you have: ' + armory.join(', ');
    console.log('armory:');
      console.log(armory.join(', '));
      console.log('current armor:');
      console.log(currentArmor.name);
      console.log('sold armor:');
      console.log(soldArmor);
  } else {
    log.innerText = 'Don\'t sell your only armor!';
  }
}

function fightRat() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[6]);
  monsterHP = monsters[fighting].HP;
  monsterStats.style.display = 'flex';
  monsterName.innerText = monsters[fighting].name;
  refreshStats();
}

function attack() {
  let monsterHit = (monsters[fighting].power * 2) - (monsters[fighting].power * Math.floor(Math.random() * 3));
  monsterHit -= currentArmor.protection;
  console.log('monsterHit:');
  console.log(monsterHit);
  log.innerText = 'The ' + monsters[fighting].name + ' attacks.';
  if (monsterHit <= 0) {
    log.innerText += '\n The ' + monsters[fighting].name + ' misses.';
  } else {
    HP -= monsterHit;
    console.log('HP: ');
    console.log(HP);
    log.innerText += 'You take damage';
  }
  if (HP <= 0) {
    lose();
  } else {
    log.innerText += '\n You attack it with your ' + currentWeapon.name + '.';
    let playerHit = currentWeapon.power;
    if (Math.random() > .9 === true) {
      playerHit *= 2;
      monsterHP -= playerHit;
      log.innerText += ' It\'s a critical hit!';
    } else {
      monsterHP -= playerHit;
    }
    console.log('player hit:');
    console.log(playerHit);
    console.log('monster HP');
    console.log(monsterHP);
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
  log.innerText = 'You dodge the attack from the ' + monsters[fighting].name;
}

function defeatMonster() {
  gold += monsters[fighting].power;
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
  gold = 0;
  currentWeaponIndex = 0;
  currentArmorIndex = 0;
  arsenal = [];
  arsenal.push(currentWeapon);
  console.log('arsenal:');
  console.log(arsenal.join(', '));
  armory = [];
  armory.push(currentArmor.name);
  console.log('armory:');
  console.log(armory.join(', '));
  refreshStats();
  goGate();
}
