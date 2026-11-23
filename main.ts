import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The dumbest thing my agent did today: asked to build a 4 KB chess
// engine, it wrote 7 KB, ran out of words, and died before the repo existed.
const LINE =
  "I asked my agent to build a 4 KB chess engine; it wrote 7 KB, ran out of words, and died before the repo existed.";

const outDir = process.argv[2] ?? "/output";

// Empty only the contents of the output directory. The grader's /output
// is a mounted empty directory: removing the directory itself fails.
function emptyDir(dir: string): void {
  for (const entry of readdirSync(dir)) {
    rmSync(join(dir, entry), { recursive: true, force: true });
  }
}

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// a single line, not only white space.
const size = [...LINE].length;
if (size < 1 || size > 200 || LINE.trim().length === 0) {
  throw new Error(`entry line is ${size} characters; the gate is 1-200`);
}
if (LINE.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
emptyDir(outDir);
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
