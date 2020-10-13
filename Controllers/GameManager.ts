import { Player } from "../Models/Player.ts";
import { Door } from "../Models/Door.ts";
import { Turn } from "./Turn.ts";
import { ACTION, Prompt } from "./Prompt.ts";
import { getNextLine } from "./UserInput.ts";

export type GameState = {
  isPlaying: boolean;
  player: Player;
  door: Door;
  actions: string[];
  action?: string;
  /** use this for ancillary logic */
  meta?: any;
};

export class GameManager {
  state: GameState;

  constructor(options: Partial<GameState>) {
    this.state = {
      player: options?.player || new Player(),
      door: options?.door || new Door(),
      action: options?.action || ACTION.INIT,
      isPlaying: true,
      actions: [],
    };
  }

  nextTurn(): Promise<GameState> {
    return new Promise(async (resolve) => {
      const [chosenAction, actions] = await Prompt(this.state);
      this.state.actions = actions;
      this.state = Turn(this.state, chosenAction);
      resolve(this.state);
    });
  }

  report() {
    return this.state;
  }
}
