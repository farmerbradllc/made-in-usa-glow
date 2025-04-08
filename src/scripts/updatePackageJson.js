
const fs = require('fs');
const path = require('path');

// Read the current package.json
const packageJsonPath = path.join(__dirname, '../../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Add the build:badge-assets script if it doesn't exist
if (!packageJson.scripts['build:badge-assets']) {
  packageJson.scripts['build:badge-assets'] = 'node src/scripts/buildBadgeAssets.js';
  
  // Write the updated package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  
  console.log('✅ Added build:badge-assets script to package.json');
} else {
  console.log('⚠️ The build:badge-assets script already exists in package.json');
}
