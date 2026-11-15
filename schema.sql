CREATE TABLE IF NOT EXISTS settings(k TEXT PRIMARY KEY, v TEXT);
CREATE TABLE IF NOT EXISTS licenses(
  key TEXT PRIMARY KEY, days INTEGER NOT NULL DEFAULT 30,
  status TEXT NOT NULL DEFAULT 'unused', -- unused | active | revoked
  device TEXT, expiry INTEGER, created INTEGER, activated INTEGER, note TEXT);
