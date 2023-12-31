const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

const rootDirectory = path.resolve(__dirname, '..');

// Step 1: Build the client app
console.log('Building client app...');
execSync('npm run build-client', { stdio: 'inherit' });

// Step 2: Copy client build to server dist directory
console.log('Copying client build to server...');
fs.copySync(
  path.join(rootDirectory, 'client', 'build'),
  path.join(rootDirectory, 'server', 'public', 'client'),
);

// Step 3: Build the server app
console.log('Building server app...');
execSync('npm run build-server', { stdio: 'inherit' });

console.log('Build complete!');