import { Player } from "../Models/Player.ts";
import { Monster } from "../Models/Monster.ts";
import { Door } from "../Models/Door.ts";
import { Resolution } from "./Resolution.ts";

export const ACTION = {
  INIT: "init",
  HELP: "Help",
  INSPECT: "Inspect your gear",
  KNOCK: "Knock on the door",
  FIGHT: "Fight the monster",
  RUN: "Run away, quickly",
  SEARCH: "Look for treasure!",
  PICKUP: "Pick this up",
  EXIT: "Quit",
};

const help: { [k: string]: string } = {
  [ACTION.INIT]: "TODO",
};

type State = {
  message: string;
  actions: string[];
};

export function Turn(props: {
  action: string;
  player: Player;
  door: Door;
  withHelp: boolean;
}): State {
  const { action, player, door, withHelp } = props;
  switch (action) {
    case ACTION.FIGHT: {
      player.levelUp();
      door.generateLoot();
      return {
        message: `Congrats! You won! Your player just earned a level. Try searching for loot!\n`,
        actions: [ACTION.SEARCH, ACTION.KNOCK, ACTION.INSPECT],
      };
    }
    case ACTION.RUN: {
      const maybeMonster = door.getMonster();
      if (maybeMonster) {
        const canRun = Resolution.run(player, maybeMonster as Monster);
        if (canRun) {
          return {
            message: "Got away safely!",
            actions: [ACTION.KNOCK, ACTION.INSPECT],
          };
        }
      }

      return {
        message: "Skipping this room for now...",
        actions: [ACTION.KNOCK, ACTION.INSPECT],
      };
    }
    case ACTION.KNOCK: {
      door.refresh();
      const actions = [];
      const maybeMonster = door.getMonster();
      const maybeLoot = door.loot();
      if (maybeMonster) {
        if (Resolution.attack(player, maybeMonster as Monster)) {
          actions.push(ACTION.FIGHT);
        }

        if (Resolution.run(player, maybeMonster as Monster)) {
          actions.push(ACTION.RUN);
        }

        if (actions.length === 0) {
          player.loseHealth();
          return {
            message:
              door.knock() +
              "\n" +
              player.getStats() +
              "\n" +
              "You cannot run or fight, your player has lost health :(",
            actions: [ACTION.KNOCK],
          };
        }

        return {
          message: door.knock() + "\n" + player.getStats(),
          actions,
        };
      }

      if (maybeLoot) {
        actions.push(ACTION.PICKUP);
        actions.push(ACTION.KNOCK);
        actions.push(ACTION.INSPECT);
        return {
          message: door.knock() + "\n" + player.getStats(),
          actions,
        };
      }

      return {
        message: "Womp womp. Nothing here",
        actions: [ACTION.KNOCK, ACTION.INSPECT],
      };
    }
    case ACTION.SEARCH: {
      const maybeTreasure = door.loot();
      if (!maybeTreasure) {
        return {
          message: "Womp womp. Nothing here",
          actions: [ACTION.KNOCK, ACTION.INSPECT],
        };
      }

      return {
        message:
          JSON.stringify(maybeTreasure, null, 2) + "\n" + player.getStats(),
        actions: [ACTION.PICKUP, ACTION.KNOCK],
      };
    }
    case ACTION.PICKUP: {
      const maybeTreasure = door.loot();
      if (!maybeTreasure) {
        return {
          message: "Womp womp. Nothing here",
          actions: [ACTION.KNOCK, ACTION.INSPECT],
        };
      }

      Resolution.pickupItem(player, maybeTreasure);

      return {
        message: "Congrats! Now move on",
        actions: [ACTION.KNOCK, ACTION.INSPECT],
      };
    }
    case ACTION.INSPECT: {
      return {
        message: withHelp ? help[action] : player.getStats(),
        actions: [ACTION.KNOCK],
      };
    }
    case ACTION.INIT:
    default:
      return {
        message: withHelp
          ? help[action]
          : `Welcome to the game, ${player.getName()}`,
        actions: [ACTION.KNOCK, ACTION.INSPECT],
      };
  }
}
