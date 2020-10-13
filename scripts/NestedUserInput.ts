import { getNextLine } from "../Controllers/UserInput.ts";

type State = {
  count: number;
  isPlaying: boolean;
};

class DemoManager {
  state: State;
  constructor() {
    this.state = {
      isPlaying: true,
      count: 0,
    };
  }
  demo(): Promise<State> {
    return new Promise(async (resolve) => {
      const { count } = this.state;
      console.log("give me a number (press ENTER to end)");
      const input = await getNextLine() as string;
      if (input) {
        this.state = { ...this.state, count: count + +input };
        resolve(this.state);
      } else {
        this.state = { ...this.state, isPlaying: false };
        resolve(this.state);
      }
    });
  }
}

async function main() {
  let result;
  let active;
  const game = new DemoManager();
  do {
    const { isPlaying, count } = await game.demo();
    active = isPlaying;
    result = count;
  } while (active);
  console.log(result);
}

main();
