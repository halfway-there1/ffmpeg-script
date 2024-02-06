import readline from 'readline/promises';
import chalk from 'chalk';
import fs from 'node:fs/promises';
import initial_setup from './ffmpeg_compression/initial_setup.js';
import ffmpeg_compression from './ffmpeg_compression/ffmpeg_compression.js';

// D:\realme6\experimenting

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
  await ffmpeg_compression(rootFolderPath);
} catch (error) {
  console.error(
    chalk.red('The path does not exist or you do not have access.')
  );
}
