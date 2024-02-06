import { execSync } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';

function getCommand(inputFilePath, outputFilePath) {
  // ffmpeg -i in.mp4 -c:v libx264 -crf 23 -c:a aac -map_metadata 0 out.mp4
  return `ffmpeg -i "${inputFilePath}" -c:v libx264 -crf 22 -c:a aac -map_metadata 0 "${outputFilePath}"`;
}

// compress each mp4 file inside the rootFolderPath
export default async function ffmpeg_compression(rootFolderPath) {
  const allFiles = await fs.readdir(rootFolderPath);

  const mp4FileNames = allFiles.filter((fileName) => {
    return fileName.endsWith('.mp4');
  });
  const totalVideosCount = mp4FileNames.length;

  const mp4FilePaths = mp4FileNames.map((mp4FileName) => {
    return `${rootFolderPath}\\${mp4FileName}`;
  });

  mp4FilePaths.forEach((mp4FilePath, index) => {
    const parsedPath = path.parse(mp4FilePath);
    const fileBaseNameWithExt = parsedPath.base;

    const outputFilePath = path.join(
      rootFolderPath,
      'ffmpeg_compression',
      fileBaseNameWithExt
    );
    const command = getCommand(mp4FilePath, outputFilePath);
    console.log(command);
    try {
      // execSync(command, { stdio: 'inherit', cwd: './' });
      execSync(command);
      console.log(
        chalk.green(
          `${fileBaseNameWithExt} compressed sucessfully ${
            index + 1
          }/${totalVideosCount}`
        )
      );
    } catch (error) {
      console.error(
        chalk.red(`${fileBaseNameWithExt} compression unsucessfull`)
      );
    }
  });
}

/* // Parse the filename and extension
      const parsedPath = path.parse(abs_path_to_file_needing_metadata);
      const newFilename = `${parsedPath.name}_error${parsedPath.ext}`;

      // Rename the file
      fs.renameSync(abs_path_to_file_needing_metadata, newFilename); */

const rootFolderPath = 'D:\\realme6\\experimenting';

// await ffmpeg_compression(rootFolderPath);
