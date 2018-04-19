const fs = require('fs');
const assert = require('assert');
const youtubedl = require('youtube-dl');
const ffmpeg = require('fluent-ffmpeg');
const mp4FilePath = "./files/mp4";
const mp3FilePath = "./files/mp3";
const ffmetadata = require("ffmetadata");

/**
 * @private
 */
const downloadAsMP4 = function (url, filename, artist, makeItuensMeta) {
	try {
		if (!fs.existsSync(mp4FilePath)) {
			fs.mkdirSync(mp4FilePath);
		}
		var video = youtubedl(url);
		video.pipe(fs.createWriteStream(`${mp4FilePath}/${filename}.mp4`));

		video.on('complete', function (info) {
			console.log(`filename: ${filename}.mp4 already downloaded.`);
		});

		video.on('end', function () {
			if (makeItuensMeta) {
				var opts = { artist: artist, title: filename };
				ffmetadata.write(saveLocation, opts, function (err) {
					assert.equal(err, null);
					console.log('finished');
				});
			}
			return true;
		});
	} catch (err) {
		console.log(err);
		return false;
	}
};

/**
 * @private
 */
const downloadAsMP3 = function (url, filename, artist, makeItuensMeta) {
	try {
		if (!fs.existsSync(mp3FilePath)) {
			fs.mkdirSync(mp3FilePath);
		}
		var stream = youtubedl(url);
		var saveLocation = `${mp3FilePath}/${filename}.mp3`;

		var proc = new ffmpeg({ source: stream })
			.withAudioCodec('libmp3lame')
			.toFormat('mp3')
			.saveToFile(saveLocation, function (stdout, stderr) {
				console.log('file has been converted succesfully');
			});

		proc.on('end', function () {
			if (makeItuensMeta) {
				var opts = { artist: artist, title: filename };
				ffmetadata.write(saveLocation, opts, function (err) {
					assert.equal(err, null);
					console.log('finished');
				});
			}
			return true;
		});
	} catch (err) {
		console.log(err);
		return false;
	}
};

const downloadYoutube = function (config) {
	let { link, type, artist, title, makeItuensMeta } = config;
	link = "https://www.youtube.com/watch?v=" + link;
	switch (type) {
		case "MP3":
			console.log("Downloading as MP3");
			return downloadAsMP3(link, title, artist, makeItuensMeta);
		case "MP4":
			console.log("Downloading as MP4");
			return downloadAsMP4(link, title, artist, makeItuensMeta);
		default:
			return false;
	}
};

module.exports = {
	downloadYoutube: downloadYoutube
}