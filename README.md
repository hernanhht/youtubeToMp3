# youtubeToMp3

For batch download of MP3 files.
It searchs YouTube and downloads the audio as an MP3 file.

Needs an input file and **node.js v0.8.x or higher**.

Every line of the file will be a search string for YouTube.
The first result of the search will be converted to mp3 and downloaded.

All files will be downloaded to the current folder.

## Syntax:

```
~$node index.js -i inputFile.txt
```
