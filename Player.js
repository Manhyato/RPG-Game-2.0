import { Arm, Knife, Sword, Bow, Staff, LongBow, Axe, StormStaff } from './Weapon.js';

export class Player {
    constructor(position, name) {
        this.stats = {
            life: 100,
            magic: 20,
            speed: 1,
            attack: 10,
            agility: 5,
            luck: 10,
            level: 1,
            experience: 0,
        };
        this.armor = null;
        this.description = 'Игрок';
        this.weapon = new Arm();
        this.position = position;
        this.name = name;
        this.attackCount = 0;
    }

    // Методы получения параметров теперь обращаются к объекту stats
    get life() {
        return this.stats.life;
    }
    set life(value) {
        this.stats.life = value;
    }
    get magic() {
        return this.stats.magic;
    }
    set magic(value) {
        this.stats.magic = value;
    }
    get luck() {
        return this.stats.luck;
    }
    get speed() {
        return this.stats.speed;
    }
    get attack() {
        return this.stats.attack;
    }
     get agility() {
        return this.stats.agility;
    }

    getLuck() {
        return (Math.random() * 100 + this.luck) / 100;
    }

  takeDamage(damage) {
      let finalDamage = damage;
        if (this.armor && !this.armor.isBroken()) {
          finalDamage = this.armor.absorbDamage(damage);
        }
       this.life = Math.max(0, this.life - finalDamage);
      console.log(`${this.name} получает ${finalDamage.toFixed(2)} урона. Осталось ${this.life.toFixed(2)} hp`);
  }


    isDead() {
        return this.life === 0;
    }
  
    moveLeft(distance) {
        this.position = Math.max(0, this.position - Math.min(distance, this.speed));
         console.log(`${this.name} двигается влево на ${distance} . Текущая позиция ${this.position}`);
    }

    moveRight(distance) {
        this.position = this.position + Math.min(distance, this.speed);
         console.log(`${this.name} двигается вправо на ${distance} . Текущая позиция ${this.position}`);
    }

    move(distance) {
        if(distance < 0) {
            this.moveLeft(-distance);
        } else {
             this.moveRight(distance);
        }
    }


     isAttackBlocked() {
      const isBlocked = this.getLuck() > (100 - this.luck) / 100;
        if (isBlocked) {
           console.log(`${this.name} блокирует атаку!`);
        }
        return isBlocked
    }
  
    dodged() {
        const isDodged = this.getLuck() > (100 - this.agility - this.speed * 3) / 100;
      if(isDodged){
           console.log(`${this.name} увернулся от атаки`);
      }
        return isDodged
    }


  takeAttack(damage) {
       if(this.isAttackBlocked()) {
         this.weapon.takeDamage(damage);
      } else if (this.dodged()) {

       } else {
             this.takeDamage(damage);
       }
  }
  
    checkWeapon() {
        if (this.weapon.isBroken()) {
          console.log(`${this.weapon.name} сломано! Замена на запасное оружие.`);
            if (this.weapon instanceof Sword){
             this.weapon = new Knife();
             } else if(this.weapon instanceof Bow){
                 this.weapon = new Knife();
             }else if(this.weapon instanceof Staff){
                   this.weapon = new Knife();
             }
             else if (this.weapon instanceof LongBow){
                 this.weapon = new Knife();
             } else if(this.weapon instanceof Axe){
                   this.weapon = new Knife();
             } else if(this.weapon instanceof StormStaff){
                  this.weapon = new Knife();
             }
             else {
                this.weapon = new Arm();
             }
        }
    }
  
    tryAttack(enemy) {
        const distance = Math.abs(this.position - enemy.position);
        if (distance > this.weapon.range) {
             console.log(`${this.name} не может дотянутся до ${enemy.name}`)
            return;
        }
         this.weapon.takeDamage(10 * this.getLuck());
         let damage = this.getDamage();
          this.attackCount++;
         if(this.position === enemy.position) {
            enemy.move(1);
             damage *=2;
             console.log(`${this.name} наносит удвоенный урон так как они в одной позиции`);
         }
         enemy.takeAttack(damage);

         console.log(
            `${this.name} атакует ${enemy.name} и наносит ${damage.toFixed(2)} урона.`
        );
    }
    getDamage(){
        return  this.weapon.getDamage() * this.getLuck();
    }


   chooseEnemy(players) {
        const aliveEnemies = players.filter(p => p !== this && !p.isDead());
         if(aliveEnemies.length === 0) {
          return null;
         }
        return aliveEnemies.reduce(
            (minEnemy, p) => (p.life < minEnemy.life ? p : minEnemy),
            aliveEnemies[0]
        );
    }

    
    moveToEnemy(enemy) {
       if(enemy) {
         const direction =  (enemy.position > this.position) ? 1 : -1
         this.move(direction);
       }
    }
    
    turn(players) {
       const enemy = this.chooseEnemy(players);
        if(enemy){
           this.moveToEnemy(enemy);
           this.tryAttack(enemy);
        }
         this.checkWeapon();
     }
}