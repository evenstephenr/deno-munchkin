import { readLines } from "https://deno.land/std@0.74.0/io/bufio.ts";
import {
  ACTION,
  Turn,
} from "https://raw.githubusercontent.com/evenstephenr/deno-munchkin/core/Controllers/Turn.ts";
import { Player } from "https://raw.githubusercontent.com/evenstephenr/deno-munchkin/core/Models/Player.ts";
import { Door } from "https://raw.githubusercontent.com/evenstephenr/deno-munchkin/core/Models/Door.ts";

async function main() {
  const player = new Player();
  const door = new Door();

  function logActions(actions: string[] = []) {
    console.log("\n");

    actions.map((action, idx) => console.log(`[${idx}]: ${action}`));
  }

  async function getUserChoice() {
    for await (const line of readLines(Deno.stdin)) {
      return line;
    }
  }

  let chosenAction = ACTION.INIT;
  let withHelp = false;
  do {
    const { message, actions } = Turn({
      action: chosenAction,
      player,
      door,
      withHelp,
    });
    withHelp = false;
    console.log(message);
    console.log("\nChoose an action");
    logActions(actions);
    const option = await getUserChoice();
    // @ts-ignore
    const selected: string = actions[+option];
    if (selected === ACTION.HELP) {
      withHelp = true;
    } else {
      chosenAction = selected;
    }
    console.log(`=======================================\n`);
    console.log(chosenAction);
    console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n`);
  } while (
    chosenAction !== ACTION.EXIT &&
    player.stats.health > 1 &&
    player.stats.level < 10
  );

  if (player.stats.health <= 1) {
    console.log("Your player is tired and needs rest...");
  }

  if (player.stats.level >= 10) {
    console.log("YOU ESCAPED THE DUNGEONS!!!");
  }

  console.log("thanks for playing :D");
}

main();
