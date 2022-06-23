import ping from './ping.js';

describe('Ping Util', () => {
  describe('ping()', () => {
    it('should list times of latency', async () => {
      const { times } = await ping('1.1.1.1');

      expect(times.length).toEqual(3);
    });

    it('should list 4 times', async () => {
      const { times } = await ping('1.1.1.1', 4);

      expect(times.length).toEqual(4);
    });

    it('should throw error with an invalid host ', async () => {
      await expect(async () => await ping('invalid')).rejects.toThrowError(
        'Error in ping'
      );
    });
  });
});
