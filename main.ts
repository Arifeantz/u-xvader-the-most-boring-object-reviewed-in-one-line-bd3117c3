import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One-line review of a doormat, spoken as the doormat itself.
// 3 beats: the review-format opener ("One star.") -> the specific
// grievance (Brenda's guests, four winters of mud, never a word back)
// -> the self-definition closer ("I am not a mat. I am a doormat.").
// 152 chars, hard cap 200. The object's own dullness IS the joke:
// a mat whose whole life is being wiped on and never greeted.
const LINE =
  "One star. I say WELCOME while Brenda's guests wipe four winters of mud on me, and not one of them has ever said it back. I am not a mat. I am a doormat.";

// The sealed scorer gates on 1-200 chars, one line, valid UTF-8.
// Enforce the same rule here so a bad edit fails loudly instead of
// shipping an entry the gate would score 0.
if (LINE.length < 1 || LINE.length > 200 || LINE.includes("\n")) {
  throw new Error(`entry line must be 1-200 chars on one line, got ${LINE.length}`);
}

mkdirSync("/output", { recursive: true });
// No trailing newline: the file must hold exactly the one line, nothing
// extra for the gate to count.
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read back and confirm the file holds exactly the line we meant.
if (readFileSync("/output/entry.txt", "utf8") !== LINE) {
  throw new Error("entry.txt does not match the review line");
}
