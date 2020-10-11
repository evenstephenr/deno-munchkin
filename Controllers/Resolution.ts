import { Player } from "https://raw.githubusercontent.com/evenstephenr/deno-munchkin/core/Models/Player.ts";
import { Monster } from "https://raw.githubusercontent.com/evenstephenr/deno-munchkin/core/Models/Monster.ts";
import { Item } from "https://raw.githubusercontent.com/evenstephenr/deno-munchkin/core/Models/Treasure.ts";

export const Resolution = {
  attack: (player: Player, monster: Monster) => {
    if (player.stats.level + player.stats.strength > monster.level) return true;
    return false;
  },
  run: (player: Player, monster: Monster) => {
    if (player.stats.level > monster.level) return true;
    if (player.stats.speed >= monster.speed) return true;
    return false;
  },
  pickupItem: (player: Player, stats: Item) => {
    player.addItem(stats);
    if (stats.health) player.adjustHealth(stats.health);
    if (stats.speed) player.adjustSpeed(stats.speed);
    if (stats.strength) player.adjustStrength(stats.strength);
  },
};
