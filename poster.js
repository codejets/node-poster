"use strict";

const fs = require("fs");
const circleImage = require("circle-image");
const path = require("path");
const gm = require("gm");
/**
 * createPoster
 * @param {String}   source     original image path
 * @param {Object}   options    poster options
 */
function createPoster(source, options, authorId, filename) {
	
			console.log("author", source.author, authorId, filename);
			const randomImageId = Math.floor(Math.random() * 64);

			
			if(authorId > 201) {
				const outImage = gm(__dirname + "/images/" + randomImageId+ '.jpg')
				.draw(`image over 1180,460 210,45 "${__dirname}/assets/logo.png"`)
				.fill("#ffffff")
				.region(1440, 450)
				.gravity("Center")
				.font(`${__dirname}/font/PN-Semibold.otf`, 22)
				.drawText(30, 180, source.author)
				.region(1440, 450)
				.gravity("Center")
				.font(`${__dirname}/font/PN-Semibold.otf`, 30)
				.drawText(30, 0, computeMultilineQuote(source.quote))
				.write(`${__dirname}/build/${filename}.png`, function(err, image, a) {
					if (!err) console.log("done", image);
				});
			}else {
			const outImage = gm(__dirname + "/images/" + randomImageId+ '.jpg')
				.draw(`image over 720,320 60,60 "${__dirname}/uploads/circle_user_${authorId}_200.png"`)
				.draw(`image over 1180,460 210,45 "${__dirname}/assets/logo.png"`)
				.fill("#ffffff")
				.region(1440, 450)
				.gravity("Center")
				.font(`${__dirname}/font/PN-Semibold.otf`, 22)
				.drawText(30, 180, source.author)
				.region(1440, 450)
				.gravity("Center")
				.font(`${__dirname}/font/PN-Semibold.otf`, 30)
				.drawText(30, 0, computeMultilineQuote(source.quote))
				.write(`${__dirname}/build/${filename}.png`, function(err, image, a) {
					if (!err) console.log("done", image);
				});
			}
}

function createThumbnail(source, index, size) {
	circleImage.execute(source, index, [200]).then(function() {});
}

exports = module.exports = {
	createPoster: createPoster,
	createThumbnail: createThumbnail
};

function getRandomImage(images) {
	return images[Math.floor(Math.random() * images.length)];
}

function computeMultilineQuote(quote) {
	let multilineQuote = "";
	let lastIndex = 75;
	for (let index = 0; index < Math.ceil(quote.length / 75); index++) {
		if (index === 0) {
			const currentIndex = quote.indexOf(" ", lastIndex);
			const subquote = quote.slice(0, currentIndex);
			lastIndex = currentIndex;
			multilineQuote = multilineQuote + subquote;
		} else {
			const currentIndex = quote.indexOf(" ", lastIndex + 75);
			const subquote = quote.slice(lastIndex, currentIndex);
			lastIndex = currentIndex;
			multilineQuote = `${multilineQuote}\n${subquote}`;
		}
	}
	return multilineQuote;
}

function measureText(font, text) {
	var x = 0;
	for (var i = 0; i < text.length; i++) {
		if (font.chars[text[i]]) {
			x +=
				font.chars[text[i]].xoffset +
				(font.kernings[text[i]] && font.kernings[text[i]][text[i + 1]]
					? font.kernings[text[i]][text[i + 1]]
					: 0) +
				(font.chars[text[i]].xadvance || 0);
		}
	}
	return x;
}
