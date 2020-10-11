import { Player } from "../Models/Player.ts";
import { Monster } from "../Models/Monster.ts";
import { Item } from "../Models/Treasure.ts";

export const Resolution = {
  attack: (player: Player, monster: Monster) => {
    const {
      level: playerLevel,
      strength: playerStrength,
    } = player.rawStats();
    const {
      level: monsterLevel,
      strength: monsterStrength,
    } = monster.getStats();

    if (
      playerLevel + playerStrength >= monsterLevel + monsterStrength
    ) {
      return true;
    }
    return false;
  },
  run: (player: Player, monster: Monster) => {
    const {
      level: playerLevel,
      speed: playerSpeed,
    } = player.rawStats();
    const {
      level: monsterLevel,
      speed: monsterSpeed,
    } = monster.getStats();

    if (playerLevel + playerSpeed > monsterLevel + monsterSpeed) return true;
    return false;
  },
  pickupItem: (player: Player, stats: Item) => {
    player.addItem(stats);
    if (stats.health) player.adjustHealth(stats.health);
    if (stats.speed) player.adjustSpeed(stats.speed);
    if (stats.strength) player.adjustStrength(stats.strength);
  },
};
