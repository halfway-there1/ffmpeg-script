import readline from 'readline/promises';
import chalk from 'chalk';
import fs from 'node:fs/promises';
import initial_setup from './ffmpeg_compression/initial_setup.js';

// K:\Mobile photos and videos management\realme-6\realme-only-handbrake\experimenting

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const rootFolderPath = await rl.question(
  chalk.cyan('Please enter a string:\n')
);
rl.close();

try {
  await fs.access(rootFolderPath);
  console.log(
    chalk.green('Great! the path you provided exists now sit and relax')
  );
  initial_setup(rootFolderPath);
} catch (error) {
  console.error(
    chalk.red('The path does not exist or you do not have access.')
  );
}
