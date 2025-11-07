import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import crypto from 'crypto';

function genId(length = 16): string {
  // lower-case hex (alphanumeric) string
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

function addIds(fileRelativePath: string) {
  const filePath = resolve(process.cwd(), fileRelativePath);
  const raw = readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);
  if (!Array.isArray(data)) throw new Error(`Expected array in ${fileRelativePath}`);

  const seen = new Set<string>();
  const updated = data.map((item: any) => {
    const out = { ...item };
    if (typeof out.id !== 'string' || out.id.trim() === '') {
      let id = genId(16);
      while (seen.has(id)) id = genId(16);
      out.id = id;
    }
    seen.add(out.id);
    return out;
  });

  const json = JSON.stringify(updated, null, 4) + '\n';
  writeFileSync(filePath, json, 'utf8');
}

addIds('src/jsonData/available-doctors-data.json');
addIds('src/jsonData/available-ambulances-data.json');



