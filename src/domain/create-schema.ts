const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./src/domain/sqlite.db', (error) => {
    if (error) console.error(error.message)
});

db.run(`
    CREATE TABLE IF NOT EXISTS hero (
        id TEXT PRIMARY KEY,
        name INTEGER NOT NULL UNIQUE,
        strength INTEGER,
        dexterity INTEGER,
        intelligence INTEGER,
        isInvincible INTEGER
    )
`);

db.close();