const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputFolder = '../originals'; // your input folder
const outputFolder = '../pano'; // your output folder

// Ensure output directory exists
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

const processImages = async () => {
    const files = fs.readdirSync(inputFolder);

    for (const file of files) {
        const inputPath = path.join(inputFolder, file);
        const outputPath = path.join(outputFolder, file);

        // Skip non-image files
        if (!/\.(jpg|jpeg|png)$/i.test(file)) {
            console.log(`Skipping non-image: ${file}`);
            continue;
        }

        try {
            await sharp(inputPath)
                // .resize({ width: 8000 }) // Uncomment to resize width, keeping aspect ratio
                .jpeg({ quality: 75 }) // Or .webp({ quality: 75 }) to convert to WebP
                .toFile(outputPath);

            console.log(`Processed: ${file}`);
        } catch (err) {
            console.error(`Error processing ${file}:`, err);
        }
    }
};

processImages();
