import { GameManager } from "./Controllers/GameManager.ts";
import { Door } from "./Models/Door.ts";
import { Player } from "./Models/Player.ts";
import { ACTION } from "./Controllers/Prompt.ts";

async function main() {
  const player = new Player();
  const door = new Door();
  const game = new GameManager({
    player,
    door,
  });

  let sessionActive;
  do {
    const { isPlaying } = await game.nextTurn();
    sessionActive = isPlaying;
  } while (sessionActive);

  console.log("thanks for playing :D");
}

main();
