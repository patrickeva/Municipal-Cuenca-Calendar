// One-off script: pushes 2027-2031 PH holidays into Firestore (skips ones that already exist).
// Run with: node scripts/seed-future-holidays.mjs <admin-password>
import { readFileSync } from 'node:fs';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const env = Object.fromEntries(
  readFileSync(new URL('../.env', import.meta.url), 'utf8')
    .split('\n')
    .filter((l) => l.includes('='))
    .map((l) => l.split('=').map((s) => s.trim()))
);

const app = initializeApp({
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
});
const db = getFirestore(app);
const auth = getAuth(app);

const { MOCK_EVENTS } = await import('../src/data/mockEvents.js');
const futureYears = ['2027', '2028', '2029', '2030', '2031'];
const futureHolidays = MOCK_EVENTS.filter((e) => futureYears.some((y) => e.id.startsWith(`ph-${y}`)));

await signInWithEmailAndPassword(auth, 'legislativecuencaofc@gmail.com', process.argv[2]);

const col = collection(db, 'events');
const existing = await getDocs(col);
const existingKeys = new Set(existing.docs.map((d) => `${d.data().date}|${d.data().title}`));

let added = 0;
for (const e of futureHolidays) {
  const key = `${e.date}|${e.title}`;
  if (existingKeys.has(key)) continue;
  const { id: _id, ...data } = e;
  await addDoc(col, data);
  added++;
  console.log('Added:', e.date, e.title);
}
console.log(`Done. Added ${added} of ${futureHolidays.length} holiday events.`);
process.exit(0);
