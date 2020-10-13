import { GameState } from "./GameManager.ts";
import { getNextLine } from "./UserInput.ts";
import { Resolution } from "./Resolution.ts";
import { Player } from "../Models/Player.ts";
import { Monster } from "../Models/Monster.ts";

/** TODO */
// const help: { [k: string]: string } = {
//   [ACTION.INIT]: "TODO",
// };

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
  SUCCESS: "Congrats, you've escaped the dungeons!",
  DEATH: "Bummer. You've succumbed to death. Better luck next time!",
};

export async function Prompt(state: GameState): Promise<[string, string[]]> {
  const { player, door } = state;

  const {
    level,
    health,
  } = player.rawStats();

  if (level >= 10) {
    console.log(ACTION.SUCCESS);
    return [ACTION.SUCCESS, []];
  }

  if (health <= 0) {
    console.log(ACTION.DEATH);
    return [ACTION.DEATH, []];
  }

  function logActions(actions: string[] = []) {
    actions.map((action, idx) => console.log(`[${idx}]: ${action}`));
  }

  function generatePrompt(action: string) {
    switch (action) {
      case ACTION.FIGHT: {
        return {
          message:
            `Congrats! You won! Your player just earned a level. Try searching for loot!\n`,
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
            return {
              message: door.knock() +
                "\n" +
                player.getStats() +
                "\n" +
                "You cannot run or fight, your player has lost health :(",
              actions: [ACTION.KNOCK, ACTION.INSPECT],
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
          message: JSON.stringify(maybeTreasure, null, 2) + "\n" +
            player.getStats(),
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

        return {
          message: "Congrats! Now move on",
          actions: [ACTION.KNOCK, ACTION.INSPECT],
        };
      }
      case ACTION.INSPECT: {
        return {
          message: player.getStats(),
          actions: [ACTION.KNOCK],
        };
      }
      case ACTION.INIT:
      default:
        return {
          message: `Welcome to the game, ${player.getName()}`,
          actions: [ACTION.KNOCK, ACTION.INSPECT],
        };
    }
  }

  const {
    action = ACTION.INIT,
  } = state;

  const { message, actions } = generatePrompt(action);
  console.log("\n" + message);
  console.log("\nChoose an action\n");
  logActions(actions);

  /** 
   * this works for now becaue we expect the user to input
   *  the numpad key that matches their choice
   */
  const chosenAction = await getNextLine() as string;
  return [actions[+chosenAction], actions];
}
