import express from 'express';
// import ping from 'ping';

import ping from './lib/ping.js';
import Host from './models/Host.js';
import User from './models/User.js';

const router = express.Router();

router.get('/', (req, res) => res.redirect('/hosts.html'));

router.get('/hosts', (req, res) => {
  const hosts = Host.readAll();

  res.json(hosts);
});

router.post('/hosts', (req, res) => {
  const host = req.body;

  const newHost = Host.create(host);

  res.status(201).json(newHost);
})

router.delete('/hosts/:id', (req, res) => {
  const id = Number(req.params.id);

  Host.remove(id);

  res.status(204).send();
});

router.put('/hosts/:id', (req, res) => {
  const id = Number(req.params.id);

  const host = req.body;

  const newHost = Host.update(id, host);

  res.status(200).json(newHost);
});

router.get('/users', (req, res) => {
  const users = User.readAll();

  res.json(users);
});

router.post('/users', async (req, res) => {
  const user = req.body;

  const newUser = await User.create(user);

  res.status(201).json(newUser);
})

router.delete('/users/:id', (req, res) => {
  const id = Number(req.params.id);

  User.remove(id);

  res.status(204).send();
});

router.put('/users/:id', async (req, res) => {
  const id = Number(req.params.id);

  const user = req.body;

  const newUser = await User.update(id, user);

  res.status(200).json(newUser);
});

router.get('/hosts/:id/times', async (req, res) => {
  const id = Number(req.params.id);

  const { address } = Host.readById(id);

  // const { times } = await ping.promise.probe(address, { min_reply: 3 });

  const { times } = await ping(address);

  res.json({ times });
});

router.use((req, res, next) => {
  res.status(404).json({
    error: 'Content not found',
  });
});

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error on Server');
});

export default router;