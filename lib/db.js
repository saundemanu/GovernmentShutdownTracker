const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

async function setupDatabase() {
  const db = await open({
    filename: './db/shutdown_times.db',
    driver: sqlite3.Database,
  });
  return db;
}

async function createShutdownTimesTable(db) {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS shutdown_times (
      id INTEGER PRIMARY KEY,
      date TEXT,
      reason TEXT
    );
  `);
}

async function insertShutdownTime(db, date, reason) {
  const statement = await db.prepare('INSERT INTO shutdown_times (date, reason) VALUES (?, ?)');
  await statement.run(date, reason);
  await statement.finalize();
}

module.exports = { setupDatabase, createShutdownTimesTable, insertShutdownTime };
