import {  Warrior, Archer, Mage, Dwarf, Crossbowman, Demiurge } from './CharacterClasses.js';
import { Bow, Sword, LongBow, Axe, Staff, StormStaff } from './Weapon.js';

console.log("RPG started");

function play(players) {
  let i = 0;
  function turn() {
      const alivePlayers = players.filter(p => !p.isDead());

      if (alivePlayers.length <= 1) {
          if (alivePlayers.length === 1) {
              console.log(`Победил ${alivePlayers[0].name}!`);
          } else {
              console.log('Никто не победил!');
          }
          return;
      }

      alivePlayers[i % alivePlayers.length].turn(players);
      i++;
      setTimeout(turn, 1000);
  }
  turn();
}

const player1 = new Warrior(10, "Алёша Попович");
const player2 = new Mage(20, "Гендальф");
const player3 = new Dwarf(15, "Гном");

const players = [player1, player2, player3];

play(players);
