import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// src → root
const ROOT = path.resolve(__dirname, "..");

const SCRIPTS_ROOT = path.join(ROOT, "scripts");
const INDEX_FILE = path.join(SCRIPTS_ROOT, "index.ts");

/**
 * scripts/<name>/events/**.ts だけを収集する
 */
function collectEventFiles() {
    const result = [];

    const entries = fs.readdirSync(SCRIPTS_ROOT, { withFileTypes: true });

    for (const entry of entries) {
        if (!entry.isDirectory()) continue;

        // 除外
        if (entry.name === "@core" || entry.name === "@modules") {
            continue;
        }

        const eventsDir = path.join(SCRIPTS_ROOT, entry.name, "events");

        if (!fs.existsSync(eventsDir)) continue;
        if (!fs.statSync(eventsDir).isDirectory()) continue;

        result.push(...collectTsFiles(eventsDir));
    }

    return result;
}

/**
 * events 配下の ts ファイル再帰収集
 */
function collectTsFiles(dir) {
    const result = [];

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            result.push(...collectTsFiles(full));
        } else if (entry.isFile() && entry.name.endsWith(".ts") && entry.name !== "index.ts") {
            result.push(full);
        }
    }

    return result;
}

/**
 * index.ts 内の import パス収集
 */
function collectImportedPaths(src) {
    const imports = new Set();
    const re = /import\s+(?:.+?\s+from\s+)?["'](.+?)["'];/g;

    let m;
    while ((m = re.exec(src))) {
        imports.add(m[1]);
    }

    return imports;
}

function main() {
    if (!fs.existsSync(INDEX_FILE)) {
        throw new Error("scripts/index.ts not found");
    }

    const src = fs.readFileSync(INDEX_FILE, "utf8");
    const imported = collectImportedPaths(src);

    const eventFiles = collectEventFiles();

    const missingImports = eventFiles
        .map(
            (file) =>
                "./" + path.relative(SCRIPTS_ROOT, file).replace(/\\/g, "/").replace(/\.ts$/, ""),
        )
        .filter((p) => !imported.has(p))
        .sort();

    if (missingImports.length === 0) return;

    const autoImports = missingImports.map((p) => `import "${p}";`).join("\n");

    fs.writeFileSync(INDEX_FILE, `${autoImports}\n\n${src}`);
}

main();
