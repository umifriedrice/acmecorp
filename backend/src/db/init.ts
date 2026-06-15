import Db from "better-sqlite3";

const db = Db("acmecorp.db");

export const initDatabase = () => {
  try {
    console.log("DEBUG THIS");
    db.exec(`CREATE TABLE IF NOT EXISTS addresses (
        id                INTEGER PRIMARY KEY,
        country           TEXT    NOT NULL,
        address_line1     TEXT,
        address_line2     TEXT,
        city              TEXT,
        state             TEXT,
        zip_code          TEXT,
        post_code         TEXT,
        suburb            TEXT,
        district          TEXT,
        village           TEXT,
        province          TEXT,
        street            TEXT,
        created_at        TEXT DEFAULT (datetime('now'))
        )`);

    db.close();
  } catch (error) {
    console.error("DB ERROR");
  }
};
