import request from 'supertest';
import app from './index.js';

let token;

const validUser = {
  name: 'Valid',
  email: 'valid@email.com',
  password: '123',
};

const invalidUser = {
  name: 'Invalid',
  email: 'invalid@email.com',
  password: '123',
};

const updatedUser = {
  ...validUser,
  name: 'Valid User',
};

const googleSearchHost = {
  name: 'Google Search',
  address: 'www.google.com',
};

const updatedGoogleSearchHost = {
  name: 'Google Search',
  address: 'www.google.com.br',
};

async function loadToken(user) {
  const response = await request(app).post('/signin').send(user);

  token = response.body.token;
}

describe('Moniotr App Endpoints', () => {
  describe('POST /users', () => {
    it('should create a new user', async () => {
      const response = await request(app).post('/users').send(validUser);

      expect(response.statusCode).toBe(201);
    });

    it('should not create a new user with same email', async () => {
      const response = await request(app).post('/users').send(validUser);

      expect(response.statusCode).toBe(500);
    });

    it('should not create a new user without email', async () => {
      const response = await request(app).post('/users').send({});

      expect(response.statusCode).toBe(500);
    });
  });

  describe('POST /signin', () => {
    it('should login a valid user', async () => {
      const response = await request(app).post('/signin').send(validUser);

      expect(response.statusCode).toBe(200);
    });

    it('should not login an invalid user', async () => {
      const response = await request(app).post('/signin').send(invalidUser);

      expect(response.statusCode).toBe(401);
    });
  });

  describe('GET /users', () => {
    it('should not show all users without login', async () => {
      const response = await request(app).get('/users');

      expect(response.statusCode).toBe(401);
    });

    it('should show all users', async () => {
      await loadToken(validUser);

      const response = await request(app)
        .get('/users')
        .set('Authorization', 'bearer ' + token);

      expect(response.statusCode).toBe(200);
    });

    it('should list the valid user', async () => {
      await loadToken(validUser);

      const response = await request(app)
        .get('/users')
        .set('Authorization', 'bearer ' + token);

      const hasValidUser = response.body.some(
        (user) => user.email === validUser.email
      );

      expect(hasValidUser).toBeTruthy();
    });
  });

  describe('PUT /users/:id', () => {
    it('should not update an user without login', async () => {
      const response = await request(app).put('/users/1').send(updatedUser);

      expect(response.statusCode).toBe(401);
    });

    it('should update an user', async () => {
      await loadToken(validUser);

      const response = await request(app)
        .put('/users/1')
        .set('Authorization', 'bearer ' + token)
        .send(updatedUser);

      expect(response.statusCode).toBe(200);
    });

    it('should list an updated user', async () => {
      await loadToken(validUser);

      const response = await request(app)
        .get('/users')
        .set('Authorization', 'bearer ' + token);

      const hasValidUser = response.body.some(
        (user) => user.name === updatedUser.name
      );

      expect(hasValidUser).toBeTruthy();
    });
  });

  describe('DELETE /users/:id', () => {
    it('should not remove an user without login', async () => {
      const response = await request(app).delete('/users/1');

      expect(response.statusCode).toBe(401);
    });

    it('should remove an user', async () => {
      await loadToken(updatedUser);

      const response = await request(app)
        .delete('/users/1')
        .set('Authorization', 'bearer ' + token);

      expect(response.statusCode).toBe(204);
    });

    it('should not login a user removed', async () => {
      const response = await request(app).post('/signin').send(updatedUser);

      expect(response.statusCode).toBe(401);
    });
  });

  describe('POST /hosts', () => {
    it('should not create a new host without login', async () => {
      const response = await request(app).post('/hosts').send(googleSearchHost);

      expect(response.statusCode).toBe(401);
    });

    it('should create a new host', async () => {
      await request(app).post('/users').send(validUser);

      await loadToken(validUser);

      const response = await request(app)
        .post('/hosts')
        .set('Authorization', 'bearer ' + token)
        .send(googleSearchHost);

      expect(response.statusCode).toBe(201);
    });
  });

  describe('GET /hosts', () => {
    it('should not show all hosts without login', async () => {
      const response = await request(app).get('/hosts');

      expect(response.statusCode).toBe(401);
    });

    it('should show all hosts', async () => {
      await loadToken(validUser);

      const response = await request(app)
        .get('/hosts')
        .set('Authorization', 'bearer ' + token);

      expect(response.statusCode).toBe(200);
    });

    it('should list the valid host', async () => {
      await loadToken(validUser);

      const response = await request(app)
        .get('/hosts')
        .set('Authorization', 'bearer ' + token);

      const hasValidHost = response.body.some(
        (host) => host.address === googleSearchHost.address
      );

      expect(hasValidHost).toBeTruthy();
    });
  });

  describe('PUT /hosts/:id', () => {
    it('should not update a host without login', async () => {
      const response = await request(app)
        .put('/hosts/1')
        .send(updatedGoogleSearchHost);

      expect(response.statusCode).toBe(401);
    });

    it('should update a host', async () => {
      await loadToken(validUser);

      const response = await request(app)
        .put('/hosts/1')
        .set('Authorization', 'bearer ' + token)
        .send(updatedGoogleSearchHost);

      expect(response.statusCode).toBe(200);
    });

    it('should list an updated host', async () => {
      await loadToken(validUser);

      const response = await request(app)
        .get('/hosts')
        .set('Authorization', 'bearer ' + token);

      const hasValidHost = response.body.some(
        (host) => host.address === updatedGoogleSearchHost.address
      );

      expect(hasValidHost).toBeTruthy();
    });
  });

  describe('DELETE /hosts/:id', () => {
    it('should not remove a host without login', async () => {
      const response = await request(app).delete('/hosts/1');

      expect(response.statusCode).toBe(401);
    });

    it('should remove a host', async () => {
      await loadToken(validUser);

      const response = await request(app)
        .delete('/hosts/1')
        .set('Authorization', 'bearer ' + token);

      expect(response.statusCode).toBe(204);
    });
  });
});
