import * as fs from 'node:fs';

const mockRootFolderPath =
  'K:\\Mobile photos and videos management\\realme-6\\realme-only-handbrake\\experimenting';

export default function (rootFolderPath) {
  fs.mkdirSync(`${rootFolderPath}\\ffmpeg_compression`);
}
