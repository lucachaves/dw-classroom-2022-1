import { promisify } from 'util';
import { exec } from 'child_process';

const execAsync = promisify(exec);

async function ping(address, count = 3) {
  try {
    const command = `ping ${address} -c ${count}`;

    const { stdout } = await execAsync(command);

    const pattern = /time=(?<time>.+) ms/g;

    const times = Array.from(stdout.matchAll(pattern)).map((match) =>
      Number(match.groups.time)
    );

    return {
      stdout,
      times,
    };
  } catch (error) {
    throw new Error('Error in ping');
  }
}

export default ping;
