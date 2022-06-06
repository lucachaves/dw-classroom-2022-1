const db = {
  hosts: [
    {
      id: 1,
      name: 'Google DNS',
      address: '8.8.8.8',
    },
    {
      id: 2,
      name: 'Cloudflare DNS',
      address: '1.1.1.1',
    },
  ],
  users: [
    {
      id: 1,
      name: 'admin',
      email: 'admin@email.com',
      password: '$2a$12$xPuSgs0eg7jpMBUXM7kc.OIlkybfebnD26hcP5efwpH2a6iCMRqzC',
    }
  ]
};

export default db;