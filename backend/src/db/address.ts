import Db from "better-sqlite3";
import { DbAddressInsertParamType, DbAddressParamType } from "../types/address";

export function getAllAddresses(): DbAddressParamType[] {
  const db = Db("acmecorp.db");
  const selectAddressStmt = db.prepare<[], DbAddressParamType>(
    `SELECT * FROM addresses ORDER BY id DESC`
  );
  const result = selectAddressStmt.all();
  db.close();
  return result;
}

export function saveAddress(param: DbAddressInsertParamType) {
  const db = Db("acmecorp.db");
  const insertAddressStmt = db.prepare<DbAddressInsertParamType>(`
    INSERT INTO addresses (
      country,
      address_line1,
      address_line2,
      city,
      state,
      zip_code,
      post_code,
      suburb,
      district,
      village,
      province,
      street
    ) VALUES (
      @country,
      @address_line1,
      @address_line2,
      @city,
      @state,
      @zip_code,
      @post_code,
      @suburb,
      @district,
      @village,
      @province,
      @street
  )
`);

  const insertAddress = db.transaction((address: DbAddressInsertParamType) =>
    insertAddressStmt.run(address)
  );

  insertAddress(param);
  db.close();
}
