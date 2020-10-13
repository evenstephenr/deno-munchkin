import { Item, Treasure } from "../Models/Treasure.ts";

/** (example) $ deno run scripts/GenerateItems.ts 10 */
const itemCount = Deno.args[0] || 100;
/** (example) $ deno run --allow-write scripts/GenerateItems.ts 100 ./scripts/sample.json */
const persistence = Deno.args[1] || undefined;

const items: Item[] = [];
for (let i = 0; i < itemCount; i++) {
  items.push(new Treasure().getStats());
}

if (persistence) {
  Deno.writeTextFile(persistence, JSON.stringify(items, null, 2));
} else {
  console.log(items);
}
