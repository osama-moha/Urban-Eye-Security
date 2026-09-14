// Builds the deployable site into dist/ (run by Vercel, see vercel.json).
// Copies every file and writes the shared navbar and footer into each page,
// so search engines see the site's links without running JavaScript.
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = process.cwd();
const out = join(root, "dist");

// Top-level entries that are not part of the website.
const skip = new Set([
  ".git", ".gitignore", ".vercel", ".vercelignore",
  "_archive", "dist", "node_modules", "scripts", "vercel.json"
]);

const navbar = readFileSync(join(root, "includes", "navbar.html"), "utf8");
const footer = readFileSync(join(root, "includes", "footer.html"), "utf8");

const NAVBAR_SLOT = '<div id="site-navbar"></div>';
const FOOTER_SLOT = '<div id="site-footer"></div>';

let pages = 0;
const missing = [];

function inlineIncludes(html, rel) {
  if (!html.includes(NAVBAR_SLOT) && !html.includes(FOOTER_SLOT)) return html;

  if (!html.includes(NAVBAR_SLOT) || !html.includes(FOOTER_SLOT)) missing.push(rel);
  pages++;

  return html
    .replace(NAVBAR_SLOT, () => `<div id="site-navbar">${navbar}</div>`)
    .replace(FOOTER_SLOT, () => `<div id="site-footer">${footer}</div>`);
}

function copyDir(dir) {
  for (const name of readdirSync(dir)) {
    if (dir === root && skip.has(name)) continue;

    const src = join(dir, name);
    const rel = relative(root, src);
    const dest = join(out, rel);

    if (statSync(src).isDirectory()) {
      mkdirSync(dest, { recursive: true });
      copyDir(src);
    } else if (name.endsWith(".html") && !rel.startsWith(`includes${sep}`)) {
      writeFileSync(dest, inlineIncludes(readFileSync(src, "utf8"), rel));
    } else {
      cpSync(src, dest);
    }
  }
}

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
copyDir(root);

if (missing.length) {
  console.warn(`Pages with only one of the navbar/footer slots: ${missing.join(", ")}`);
}
console.log(`Built dist/ with the navbar and footer written into ${pages} pages.`);
