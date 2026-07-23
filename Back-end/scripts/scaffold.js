import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();

// Global folders at the root level
const rootGlobalFolders = [
  'config',
  'database',
  'docs',
  'tests',
  'logs',
  'public',
  'uploads',
  'scripts',
  'seeders',
  'factories',
];

// Global folders inside src/
const srcGlobalFolders = [
  'middlewares',
  'repositories',
  'services',
  'controllers',
  'routes',
  'models',
  'validators',
  'schemas',
  'dto',
  'utils',
  'helpers',
  'constants',
  'errors',
  'events',
  'queues',
  'jobs',
  'cron',
  'interfaces',
  'types',
];

// Feature modules
const modules = [
  'auth',
  'users',
  'products',
  'categories',
  'brands',
  'orders',
  'orderItems',
  'cart',
  'wishlist',
  'reviews',
  'payments',
  'coupons',
  'notifications',
  'addresses',
  'shipping',
  'seller',
  'admin',
  'dashboard',
  'analytics',
  'chat',
  'messages',
  'search',
  'uploads',
];

// Capitalize helper for comments
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function createDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${path.relative(ROOT_DIR, dirPath)}`);
  }
}

function createFile(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Created file: ${path.relative(ROOT_DIR, filePath)}`);
  }
}

async function run() {
  console.log('Starting scaffold creation...');

  // 1. Create root global folders
  rootGlobalFolders.forEach(folder => {
    createDir(path.join(ROOT_DIR, folder));
  });

  // Keep gitignore guidelines for public and uploads
  createFile(path.join(ROOT_DIR, 'public', '.gitkeep'), '');
  createFile(path.join(ROOT_DIR, 'uploads', '.gitkeep'), '');

  // 2. Create src and global folders under src
  const srcPath = path.join(ROOT_DIR, 'src');
  createDir(srcPath);
  srcGlobalFolders.forEach(folder => {
    createDir(path.join(srcPath, folder));
  });

  // 3. Create src/app.js and src/server.js
  createFile(
    path.join(srcPath, 'app.js'),
    `// TODO: Configure Express app (middlewares, routes, error handling)\n`
  );
  createFile(
    path.join(srcPath, 'server.js'),
    `// TODO: Start HTTP server and database connections\n`
  );

  // 4. Create modules inside src/modules/
  const modulesPath = path.join(srcPath, 'modules');
  createDir(modulesPath);

  modules.forEach(mod => {
    const modDir = path.join(modulesPath, mod);
    createDir(modDir);

    const capMod = capitalize(mod);
    const files = [
      { name: `${mod}.controller.js`, label: 'Controller' },
      { name: `${mod}.service.js`, label: 'Service' },
      { name: `${mod}.repository.js`, label: 'Repository' },
      { name: `${mod}.model.js`, label: 'Model' },
      { name: `${mod}.routes.js`, label: 'Routes' },
      { name: `${mod}.validator.js`, label: 'Validator' },
      { name: `${mod}.schema.js`, label: 'Schema' },
      { name: `${mod}.dto.js`, label: 'DTO' },
      { name: 'index.js', label: 'Module Entry' },
    ];

    files.forEach(file => {
      const filePath = path.join(modDir, file.name);
      const content = `// TODO: Implement ${capMod} ${file.label}\n`;
      createFile(filePath, content);
    });
  });

  console.log('Scaffold finished successfully!');
}

run().catch(console.error);
