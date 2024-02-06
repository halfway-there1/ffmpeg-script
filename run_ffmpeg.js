import { exec, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const folder_path_to_files_with_metdata =
  'K:\\Mobile photos and videos management\\realme-6\\Camera\\realme-6-videos\\';
const folder_path_to_files_needing_metadata =
  'K:\\Mobile photos and videos management\\realme-6\\realme-only-handbrake\\experimenting\\';

// ffmpeg -i original_file.mp4 -i handbrake_Wala_file.mp4 -map 1 -map_metadata 0 -c copy fixed.mp4

// Function to run FFmpeg command for each file
function runFFmpegCommand(filename, count) {
  const abs_path_to_file_with_metadata = `"${
    folder_path_to_files_with_metdata + filename
  }"`;
  const abs_path_to_file_needing_metadata = `"${
    folder_path_to_files_needing_metadata + filename
  }"`;
  const abs_path_for_new_file = `"${
    folder_path_to_files_needing_metadata + 'with_metadata\\' + filename
  }"`;

  // const command = `ffmpeg -i ${abs_path_to_file_with_metadata} -i ${abs_path_to_file_needing_metadata} -map 1 -map_metadata 0 -c copy ${abs_path_for_new_file}`;

  const command = [
    'ffmpeg',
    '-i',
    abs_path_to_file_with_metadata,
    '-i',
    abs_path_to_file_needing_metadata,
    '-map',
    '1',
    '-map_metadata',
    '0',
    '-c',
    'copy',
    abs_path_for_new_file,
  ].join(' ');

  // console.log(command);

  try {
    const stdout = execSync(command, { stdio: 'ignore' });
    console.log(
      chalk.green(
        `FFmpeg command executed successfully for ${filename} ${count}/${mp4Files.length}`
      )
    );
    // console.log(stdout.toString());
  } catch (error) {
    console.error(
      `Error running FFmpeg command for ${filename}: ${error.message}`
    );

    // Parse the filename and extension
    const parsedPath = path.parse(abs_path_to_file_needing_metadata);
    const newFilename = `${parsedPath.name}_error${parsedPath.ext}`;

    // Rename the file
    fs.renameSync(abs_path_to_file_needing_metadata, newFilename);
  }
}

// ffmpeg -i in.mp4 -c:v libx264 -crf 23 -c:a aac -map_metadata 0 out.mp4

/* function handbrake(filename) {
  // const abs_path_to_file_with_metadata = `"${
  //   folder_path_to_files_with_metdata + filename
  // }"`;
  const abs_path_to_file_needing_metadata = `"${
    folder_path_to_files_needing_metadata + filename
  }"`;
  const abs_path_for_new_file = `"${
    folder_path_to_files_needing_metadata + 'with_metadata\\' + filename
  }"`;

  const command = `ffmpeg -i ${abs_path_to_file_needing_metadata} -c:v libx264 -crf 22 -c:a aac -map_metadata 0 ${abs_path_for_new_file}`;

  // console.log(command);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(
        `Error running handbrake command for ${filename}: ${error.message}`
      );
      return;
    }
    if (stderr) {
      console.error(`handbrake command stderr for ${filename}: ${stderr}`);
      return;
    }
    console.log(`handbrake command executed successfully for ${filename}`);
  });
} */

// Get a list of all files that need the metadata
let files = fs.readdirSync(folder_path_to_files_needing_metadata);
// console.log(files);
const mp4Files = files.filter((filename) => {
  return filename.endsWith('.mp4');
});
// console.log(mp4Files);

mp4Files.forEach((filename, index) => {
  runFFmpegCommand(filename, index + 1);
});
