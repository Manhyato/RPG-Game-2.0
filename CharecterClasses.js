import { Arm, Knife, Sword, Bow, Staff, LongBow, Axe, StormStaff } from './Weapon.js';
import { Player } from './Player.js';
export class Warrior extends Player {
    constructor(position, name) {
        super(position, name);
        this.stats.life = 120;
        this.stats.speed = 2;
        this.description = 'Воин';
        this.weapon = new Sword();
    }
    takeDamage(damage) {
         if (this.life <= this.stats.life * 0.5 && this.getLuck() > 0.8) {
             if(this.magic > damage) {
                this.magic -= damage;
                console.log(`${this.name} получает урон по мане ${damage}. Осталось ${this.magic}`)
             }
             else {
                 const damageToHealth = damage - this.magic;
                 this.magic = 0;
                 super.takeDamage(damageToHealth)
             }
         } else {
             super.takeDamage(damage);
         }
     }
}

export class Archer extends Player {
    constructor(position, name) {
        super(position, name);
        this.stats.life = 80;
        this.stats.magic = 35;
        this.stats.agility = 10;
        this.description = 'Лучник';
        this.weapon = new Bow();
    }
    getDamage() {
        return  ( this.stats.attack +  this.weapon.getDamage()) * this.getLuck() * (Math.abs(this.position - this.chooseEnemy(players)?.position) / this.weapon.range );
    }
}

export class Mage extends Player {
    constructor(position, name) {
        super(position, name);
        this.stats.life = 70;
        this.stats.magic = 100;
        this.stats.agility = 8;
        this.description = 'Маг';
        this.weapon = new Staff();
    }
    takeDamage(damage) {
        if (this.magic > 50) {
           this.magic -= 12;
           console.log(`${this.name} уменьшил урон в 2 раза, маны осталось ${this.magic}`);
           super.takeDamage(damage / 2);
       }
       else {
            super.takeDamage(damage)
        }
   }
}

export class Dwarf extends Warrior {
    constructor(position, name) {
        super(position, name);
        this.stats.life = 130;
        this.stats.attack = 15;
        this.stats.luck = 20;
        this.description = 'Гном';
        this.weapon = new Axe();
    }
    takeDamage(damage) {
        if (this.attackCount % 6 === 0 && this.getLuck() > 0.5 ) {
            super.takeDamage(damage / 2)
           console.log(`${this.name} получил половину урона`);
        } else {
            super.takeDamage(damage);
        }
    }
}

export class Crossbowman extends Archer {
    constructor(position, name) {
        super(position, name);
        this.stats.life = 85;
        this.stats.attack = 8;
        this.stats.agility = 20;
        this.stats.luck = 15;
        this.description = 'Арбалетчик';
        this.weapon = new LongBow();
    }
}


export class Demiurge extends Mage {
    constructor(position, name) {
        super(position, name);
        this.stats.life = 80;
        this.stats.magic = 120;
        this.stats.luck = 12;
        this.description = 'Демиург';
         this.weapon = new StormStaff();
    }
      getDamage() {
          if(this.magic > 0 && this.getLuck() > 0.6){
              return  super.getDamage() * 1.5
          }
          return super.getDamage();
      }
}
