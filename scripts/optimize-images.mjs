import sharp from 'sharp';
import path from 'path';

async function optimizeImage(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);
    
    console.log(`Successfully optimized: ${outputPath}`);
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error);
  }
}

// Optimize project images
await optimizeImage('public/images/K.png', 'public/images/K.webp');
await optimizeImage('public/images/sunnysidepod_g.jpg', 'public/images/sunnysidepod_g.webp'); 