let health = 100;
let gold = 0;
let currentWeapon = 0;
let fighting;
let monsterHealth;
const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const log = document.querySelector('#log');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const monsterName = document.querySelector('#monsterName');
const monsterHealthText = document.querySelector('#monsterHealth');
const weapons = [
  {name: 'stick', power: 1, value: 1},
  {name: 'dagger', power: 10, value: 5},
  {name: 'mace', power: 20, value: 10},
  {name: 'sword', power: 30, value: 20}
];
let inventory = [];
inventory.push(weapons[currentWeapon].name);
console.log('inventory: \n');
console.log(inventory);
const monsters = [
  {
    name: 'rat',
    level: 2,
    health: 15
  },
  {
    name: 'beast',
    level: 8,
    health: 60
  },
  {
    name: 'dragon',
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: 'town square',
    'button text': ['Go to store', 'Go to cave', 'Fight dragon'],
    'button functions': [goStore, goCave, fightDragon],
    log: 'You are in the town square. You see a sign that says "Store".'
  },
  {
    name: 'store',
    'button text': ['Buy food', 'Buy weapon', 'Go to town square'],
    'button functions': [rest, buyWeapon, goTown],
    log: 'You enter the store.'
  },
  {
    name: 'cave',
    'button text': ['Fight rat', 'Fight beast', 'Go to town square'],
    'button functions': [fightRat, fightBeast, goTown],
    log: 'You enter the cave. You see some monsters.'
  },
  {
    name: 'fight',
    'button text': ['Attack', 'Dodge', 'Run'],
    'button functions': [attack, dodge, goTown],
    log: 'You are fighting a monster.'
  },
  {
    name: 'kill monster',
    'button text': ['Go to town square', 'Go to town square', 'Go to town square'],
    'button functions': [goTown, goTown, goTown],
    log: 'The monster screams as it dies. You gain find gold.'
  },
  {
    name: 'lose',
    'button text': ['REPLAY?', 'REPLAY?', 'REPLAY?'],
    'button functions': [restart, restart, restart],
    log: 'You die. &#x2620;'
  },
  { 
    name: 'win', 
    'button text': ['REPLAY?', 'REPLAY?', 'REPLAY?'], 
    'button functions': [restart, restart, restart], 
    log: 'You defeat the dragon! YOU WIN THE GAME! &#x1F389;' 
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

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

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
  console.log(inventory);
}

function goCave() {
  update(locations[2]);
}

function refreshStats(){
  healthText.innerText = health;
  goldText.innerText = gold;
}

const poor = 'You do not have enough money.';

function rest() {
  if (gold >= 10) {
    gold -= 10;
    health = 100;
    refreshStats();
  } else {
    log.innerText = poor;
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= weapons[currentWeapon + 1].value) {
      currentWeapon++;
      gold -= weapons[currentWeapon].value;
      inventory.push(weapons[currentWeapon].name);
      log.innerText = 'You now have a ' + weapons[currentWeapon].name + '.';
      refreshStats();
      log.innerText += '\n In your inventory you have: ' + inventory.join(', ');
      console.log('inventory: \n');
      console.log(inventory.join(', '));
      console.log('\ncurrent weapon: \n');
      console.log(weapons[currentWeapon].name);
    } else {
      log.innerText = poor;
    }
  } else {
    log.innerText = 'You already have the most powerful weapon!';
    button2.innerText = 'Sell old weapon';
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    let soldWeaponName = inventory.shift();
    log.innerText = 'You sold a ' + soldWeaponName + '.';
    let soldWeapon = weapons.find((weapon) => weapon.name === soldWeaponName);
    console.log(soldWeapon);
    gold += soldWeapon.value;
    refreshStats();
    log.innerText += '\n In your inventory you have: ' + inventory.join(', ');
    console.log('inventory: \n');
      console.log(inventory.join(', '));
      console.log('\ncurrent weapon: \n');
      console.log(weapons[currentWeapon].name);
      console.log('\nsold weapon: \n');
      console.log(soldWeapon);
  } else {
    log.innerText = 'Don\'t sell your only weapon!';
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
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = 'flex';
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  log.innerText = 'The ' + monsters[fighting].name + ' attacks.';
  log.innerText = 'You attack it with your ' + weapons[currentWeapon].name + '.';
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random()) + 1;    
  } else {
    log.innerText = 'You miss.';
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random()));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  log.innerText = 'You dodge the attack from the ' + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  refreshStats();
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  health = 100;
  gold = 0;
  currentWeapon = 0;
  inventory = [];
  inventory.push(weapons[currentWeapon]);
  console.log('inventory: \n');
  console.log(inventory.join(', '));
  console.log('\ncurrent weapon: \n')
  console.log(inventory[currentWeapon].name)
  refreshStats();
  goTown();
}
