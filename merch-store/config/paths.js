const path = require('path');

const rootDir = path.resolve(__dirname, '..');

module.exports = {
  root: rootDir,
  src: path.resolve(rootDir, 'src'),
  public: path.resolve(rootDir, 'public'),
  build: path.resolve(rootDir, 'dist'),
  entryHtml: path.resolve(rootDir, 'public', 'index.html'),
  entry: path.resolve(rootDir, 'src', 'index.tsx'),
};
