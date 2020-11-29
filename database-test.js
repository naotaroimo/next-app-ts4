const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

async function setup() {
    const db = await sqlite.open({ filename: './mydb.sqlite', driver: sqlite3.Database });
    await db.migrate({ force: true });

    const people = await db.all('SELECT * FROM person');
    console.log('ALL PEOPLE', JSON.stringify(people, null, 2));
}

setup();