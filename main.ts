// Entry for "Pigeon Pitch, One Line" (make.fun).
// Writes one funny line of plain text to the output file the kit's
// RULES require: /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
// The grading sandbox mounts the repository read-only, so the output
// directory must come from the environment, never from the repo itself.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line =
  "Invest in my startup: we've cornered the breadcrumb market, our burn rate is literally zero, and our head office is the mayor's statue.";

// The gate refuses anything over 200 characters, and anything that is
// not one line of real text: fail loudly here instead of shipping an
// invalid entry.
if (line.length < 1 || line.length > 200) {
  throw new Error(`entry is ${line.length} characters, must be 1-200`);
}
if (line.trim().length === 0 || line.includes("\n")) {
  throw new Error("entry must be a single line of non-whitespace text");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outFile = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, line, "utf8");
console.log(`wrote ${line.length} characters to ${outFile}`);
