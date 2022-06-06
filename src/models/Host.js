import db from '../database/db.js';

function getLastId() {
  return db.hosts
    .map((host) => host.id)
    .sort((a, b) => b - a)[0];
}

function readAll() {
  return db.hosts;
}

function readById(id) {
  const host = db.hosts.find((host) => host.id === id);

  return host;
}

function create(host) {
  const id = getLastId() + 1;

  const newHost = {...host, id};

  db.hosts.push(newHost);

  return newHost;
}

function update(id, host) {
  const index = db.hosts.findIndex((host) => host.id === id);

  const newHost = {id, ...host}

  db.hosts[index] = newHost;

  return newHost;
}

function remove(id) {
  const index = db.hosts.findIndex((host) => host.id === id);
  
  db.hosts.splice(index, 1);
}

export default {create, readAll, readById, update, remove};