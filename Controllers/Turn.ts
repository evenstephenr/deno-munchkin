import { Player } from "../Models/Player.ts";
import { Monster } from "../Models/Monster.ts";
import { Door } from "../Models/Door.ts";
import { ACTION } from "./Prompt.ts";
import { Resolution } from "./Resolution.ts";
import { GameState } from "./GameManager.ts";

export function Turn(
  state: GameState,
  action: string,
): GameState {
  const {
    player,
    door,
    actions,
  } = state;

  switch (action) {
    case ACTION.SUCCESS:
    case ACTION.DEATH: {
      return {
        ...state,
        action,
        isPlaying: false,
      };
    }
    case ACTION.FIGHT: {
      player.levelUp();
      door.generateLoot();
      return {
        ...state,
        action,
      };
    }
    case ACTION.KNOCK: {
      door.refresh();
      const maybeMonster = door.getMonster();
      const maybeLoot = door.loot();

      if (maybeMonster && !Resolution.attack(player, maybeMonster as Monster)) {
        player.loseHealth();
      }
      return {
        ...state,
        action,
      };
    }
    case ACTION.PICKUP: {
      const maybeLoot = door.loot();
      if (maybeLoot) {
        Resolution.pickupItem(player, maybeLoot);
      }
      return {
        ...state,
        action,
      };
    }
    default:
      return {
        ...state,
        action,
      };
  }
}
