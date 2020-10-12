import { assertEquals } from "https://deno.land/std@0.74.0/testing/asserts.ts";
import { Player } from "../Models/Player.ts";
import { Monster } from "../Models/Monster.ts";
import { Resolution } from "./Resolution.ts";

Deno.test("Controllers/Resolution -> Resolution.attack()", () => {
  const TestPlayer = new Player({ level: 10, strength: 10 });
  const TestMonster = new Monster({ level: 10, strength: 10 });

  assertEquals(Resolution.attack(TestPlayer, TestMonster), true);

  TestPlayer.adjustStrength(-1);
  assertEquals(Resolution.attack(TestPlayer, TestMonster), false);

  TestPlayer.levelUp();
  TestPlayer.levelUp();
  assertEquals(Resolution.attack(TestPlayer, TestMonster), true);
});

Deno.test("Controllers/Resolution -> Resolution.run()", () => {
  const TestPlayer = new Player({ level: 10, speed: 10 });
  const TestMonster = new Monster({ level: 10, speed: 10 });
  assertEquals(Resolution.run(TestPlayer, TestMonster), false);

  TestPlayer.adjustSpeed(1);
  assertEquals(Resolution.run(TestPlayer, TestMonster), true);
});

Deno.test("Controllers/Resolution -> Resolution.pickupItem()", () => {
  const TestPlayer = new Player(
    { health: 5, speed: 5, strength: 5, maxWeight: 2 },
  );
  Resolution.pickupItem(
    TestPlayer,
    { health: 1, speed: 2, strength: 3, weight: 1 },
  );
  assertEquals(TestPlayer.rawStats().items.length, 1);
  assertEquals(TestPlayer.rawStats().health, 6);
  assertEquals(TestPlayer.rawStats().speed, 7);
  assertEquals(TestPlayer.rawStats().strength, 8);

  Resolution.pickupItem(
    TestPlayer,
    { health: -6, speed: -7, strength: -8, weight: 1 },
  );
  assertEquals(TestPlayer.rawStats().items.length, 2);
  assertEquals(TestPlayer.rawStats().health, 0);
  assertEquals(TestPlayer.rawStats().speed, 0);
  assertEquals(TestPlayer.rawStats().strength, 0);

  assertEquals(Resolution.pickupItem(TestPlayer, { weight: 1 }), false);
  const { items } = TestPlayer.rawStats();
  assertEquals(items.length, 2);
});

Deno.test("Controllers/Resolution -> Resolution.dropItem()", () => {
  const TestPlayer = new Player({ items: [{ weight: 1 }, { weight: 2 }] });
  TestPlayer.dropItem(0);
  const { items } = TestPlayer.rawStats();
  assertEquals(items.length, 1);
  assertEquals(items[0], { weight: 2 });
});
