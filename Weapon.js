export class Weapon {
    constructor(name, attack, durability, range) {
      this.name = name;
      this.attack = attack;
      this.durability = durability;
      this.initDurability = durability; // Сохраняем изначальную прочность
      this.range = range;
    }
  
    takeDamage(damage) {
      this.durability = Math.max(0, this.durability - damage);
    }
  
    getDamage() {
      if (this.durability <= 0) {
        return 0;
      }
      if (this.durability >= this.initDurability * 0.3) {
        return this.attack;
      } else {
        return this.attack / 2;
      }
    }
  
    isBroken() {
      return this.durability === 0;
    }
      
  }
  
  export class Arm extends Weapon {
    constructor() {
      super("Рука", 1, Infinity, 1);
    }
    takeDamage(damage) {} // Рука не ломается
  }
  
  export class Bow extends Weapon {
    constructor() {
      super("Лук", 10, 200, 3);
    }
  }
  
  export class Sword extends Weapon {
    constructor() {
      super("Меч", 25, 500, 1);
    }
  }
  
  export class Knife extends Weapon {
      constructor() {
          super("Нож", 5, 300, 1);
      }
  }
  
  export class Staff extends Weapon {
      constructor() {
          super("Посох", 8, 300, 2);
      }
  }
  
  // Улучшенные виды оружия
  export class LongBow extends Bow {
    constructor() {
      super();
      this.name = "Длинный лук";
      this.attack = 15;
      this.range = 4;
    }
  }
  
  export class Axe extends Sword {
      constructor() {
          super();
          this.name = "Секира";
          this.attack = 27;
          this.durability = 800
          this.initDurability = 800;
      }
  }
  
  export class StormStaff extends Staff {
      constructor() {
          super();
          this.name = "Посох Бури";
          this.attack = 10;
          this.range = 3;
      }
  }