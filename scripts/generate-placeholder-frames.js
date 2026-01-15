// Script to generate placeholder frames for development
// Run: node scripts/generate-placeholder-frames.js

const fs = require('fs');
const path = require('path');

const TOTAL_FRAMES = 180;
const OUTPUT_DIR = path.join(__dirname, '../public/frames');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log('Generating placeholder frames...');

// Create a simple SVG placeholder for each frame
for (let i = 1; i <= TOTAL_FRAMES; i++) {
    const frameNumber = i.toString().padStart(4, '0');
    const filename = `agent_system_${frameNumber}.svg`;
    const filepath = path.join(OUTPUT_DIR, filename);

    // Calculate progress for visual variation
    const progress = (i / TOTAL_FRAMES) * 100;
    const hue = (i / TOTAL_FRAMES) * 60; // 0 to 60 (red to yellow)

    const svg = `<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad${i}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:hsl(${hue}, 70%, 20%);stop-opacity:1" />
      <stop offset="100%" style="stop-color:hsl(${hue + 20}, 50%, 10%);stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#grad${i})"/>
  <circle cx="960" cy="540" r="${200 + progress * 2}" fill="none" stroke="rgba(248,248,248,0.3)" stroke-width="2"/>
  <circle cx="960" cy="540" r="${100 + progress}" fill="none" stroke="rgba(248,248,248,0.5)" stroke-width="3"/>
  <text x="960" y="540" font-family="Arial" font-size="48" fill="rgba(248,248,248,0.8)" text-anchor="middle" dominant-baseline="middle">
    Frame ${frameNumber}
  </text>
  <text x="960" y="600" font-family="Arial" font-size="24" fill="rgba(248,248,248,0.5)" text-anchor="middle" dominant-baseline="middle">
    ${progress.toFixed(1)}% Progress
  </text>
</svg>`;

    fs.writeFileSync(filepath, svg);

    if (i % 20 === 0) {
        console.log(`Generated ${i}/${TOTAL_FRAMES} frames`);
    }
}

console.log(`✓ Successfully generated ${TOTAL_FRAMES} placeholder frames`);
console.log('Note: Replace these with your actual WebP frames for production');
