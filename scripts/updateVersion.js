import fs  from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
const packageJsonPath = path.join(__dirname, "../package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

const versionParts = packageJson.version.split(".");
versionParts[2] = parseInt(versionParts[2]) + 1; // Increment patch version
packageJson.version = versionParts.join(".");

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log(`Updated version to ${packageJson.version}`);
