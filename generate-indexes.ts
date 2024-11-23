import * as fs from 'fs';
import * as path from 'path';

function shouldIgnoreFile(filename: string): boolean {
  return filename === 'index.ts' || filename.startsWith('.');
}

function generateIndexContent(files: string[]): string {
  return (
    files
      .map((file) => {
        const filename = path.basename(file, path.extname(file));
        return `export * from './${filename}';`;
      })
      .join('\n') + '\n'
  );
}

function processModule(dirPath: string) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  const tsFiles = entries
    .filter(
      (entry) =>
        entry.isFile() &&
        entry.name.endsWith('.ts') &&
        !shouldIgnoreFile(entry.name)
    )
    .map((entry) => path.join(dirPath, entry.name));

  if (tsFiles.length > 0) {
    const indexContent = generateIndexContent(tsFiles);
    fs.writeFileSync(path.join(dirPath, 'index.ts'), indexContent);
  }

  const subdirectories = entries.filter((entry) => entry.isDirectory());

  if (subdirectories.length > 0) {
    const currentIndexPath = path.join(dirPath, 'index.ts');
    let exports = '';

    subdirectories.forEach((dir) => {
      const subdirPath = path.join(dirPath, dir.name);
      processModule(subdirPath);

      if (fs.readdirSync(subdirPath).length > 0) {
        exports += `export * from './${dir.name}';\n`;
      }
    });

    if (exports) {
      if (fs.existsSync(currentIndexPath)) {
        const existingContent = fs.readFileSync(currentIndexPath, 'utf8');
        const newExports = exports
          .split('\n')
          .filter((line) => line && !existingContent.includes(line))
          .join('\n');
        if (newExports) {
          fs.appendFileSync(currentIndexPath, '\n' + newExports);
        }
      } else {
        fs.writeFileSync(currentIndexPath, exports);
      }
    }
  }
}

function generateLibsIndexes() {
  const currentDir = process.cwd();
  const libsDir = path.join(currentDir, 'libs');

  if (!fs.existsSync(libsDir)) {
    console.error(`Directory ${libsDir} does not exist!`);
    process.exit(1);
  }

  const libModules = fs
    .readdirSync(libsDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  console.log('Found modules:', libModules);

  libModules.forEach((moduleName) => {
    const srcPath = path.join(libsDir, moduleName, 'src');
    if (fs.existsSync(srcPath)) {
      console.log(`\nProcessing module: ${moduleName}`);
      processModule(srcPath);
    } else {
      console.warn(`Warning: src directory not found in ${moduleName}`);
    }
  });
}

try {
  generateLibsIndexes();
  console.log('\nSuccessfully generated all index.ts files!');
} catch (error) {
  console.error('Error generating index files:', error);
  process.exit(1);
}
