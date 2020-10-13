import { readLines } from "https://deno.land/std@0.74.0/io/bufio.ts";

export async function getNextLine() {
  for await (const line of readLines(Deno.stdin)) {
    return line;
  }
}
