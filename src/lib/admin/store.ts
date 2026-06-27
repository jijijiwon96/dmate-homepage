import fs from 'fs';
import path from 'path';
import type { Work } from '@/lib/types';

const STORE_PATH = path.join(process.cwd(), 'src', 'data', 'works-overrides.json');

export interface OverrideStore {
  overrides: Record<string, Partial<Work>>;
  additions: Work[];
  deletions: string[];
}

const EMPTY: OverrideStore = { overrides: {}, additions: [], deletions: [] };

export function readStore(): OverrideStore {
  try {
    if (!fs.existsSync(STORE_PATH)) return structuredClone(EMPTY);
    return JSON.parse(fs.readFileSync(STORE_PATH, 'utf-8'));
  } catch {
    return structuredClone(EMPTY);
  }
}

export function writeStore(store: OverrideStore): void {
  const dir = path.dirname(STORE_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2));
}
