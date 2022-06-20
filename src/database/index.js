import Database from 'sqlite-async';

async function connect() {
  return await Database.open('src/database/database.sqlite');
}

export default {connect};