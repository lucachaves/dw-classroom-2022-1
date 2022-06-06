import bcrypt from 'bcrypt';

import db from '../database/db.js';

const saltRounds = 12;

function getLastId() {
  return db.users
    .map((user) => user.id)
    .sort((a, b) => b - a)[0];
}

function readAll() {
  return db.users.map(({id, name, email}) => ({id, name, email}));
}

function readById(id) {
  const {name, email} = db.users.find((user) => user.id === id);

  return {id, name, email};
}

function readByEmail(email) {
  const user = db.users.find((user) => user.email === email);

  return user;
}

async function create(user) {
  const id = getLastId() + 1;

  const {name, email, password} = user;

  const newUser = {...user, id};

  const hash = await bcrypt.hash(password, saltRounds);

  db.users.push({...newUser, password: hash});

  return {id, name, email};
}

async function update(id, user) {
  const index = db.users.findIndex((user) => user.id === id);

  const {name, email, password} = user;

  const hash = await bcrypt.hash(password, saltRounds);
  
  const newUser = {id, ...user, password: hash}

  db.users[index] = newUser;

  return {id, name, email};
}

function remove(id) {
  const index = db.users.findIndex((user) => user.id === id);
  
  db.users.splice(index, 1);
}

export default {create, readAll, readById, readByEmail, update, remove};