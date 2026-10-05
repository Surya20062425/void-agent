#!/usr/bin/env node
// Void CLI - NPX entry point
// This delegates to the Python implementation

const { spawnSync } = require('child_process');
const path = require('path');

const pythonEntry = path.join(__dirname, 'void', 'cli.py');

function main() {
  // Try python3 first, then python
  const python = process.platform === 'win32' ? 'python' : 'python3';
  
  // Check if Python package is installed (void module available)
  const checkResult = spawnSync(python, ['-c', 'import void.cli; print("ok")'], { encoding: 'utf8' });
  
  if (checkResult.status === 0) {
    // Module is installed, use python -m
    const result = spawnSync(python, ['-m', 'void.cli', ...process.argv.slice(2)], { 
      stdio: 'inherit',
      encoding: 'utf8'
    });
    process.exit(result.status ?? 0);
  } else {
    // Fallback: try running the module directly
    const result = spawnSync(python, [pythonEntry, ...process.argv.slice(2)], { 
      stdio: 'inherit',
      encoding: 'utf8'
    });
    process.exit(result.status ?? 0);
  }
}

main();