$ROOT_DIR = Get-Location

# Global folders at the root level
$rootGlobalFolders = @(
  'config',
  'database',
  'docs',
  'tests',
  'logs',
  'public',
  'uploads',
  'scripts',
  'seeders',
  'factories'
)

# Global folders inside src/
$srcGlobalFolders = @(
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
  'types'
)

# Feature modules
$modules = @(
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
  'uploads'
)

function Create-Directory($dirPath) {
  if (!(Test-Path $dirPath)) {
    New-Item -ItemType Directory -Force -Path $dirPath | Out-Null
    Write-Host "Created directory: $dirPath"
  }
}

function Create-File($filePath, $content) {
  if (!(Test-Path $filePath)) {
    Set-Content -Path $filePath -Value $content -Encoding utf8
    Write-Host "Created file: $filePath"
  }
}

Write-Host "Starting scaffold creation via PowerShell..."

# 1. Create root global folders
foreach ($folder in $rootGlobalFolders) {
  Create-Directory (Join-Path $ROOT_DIR $folder)
}

# Keep gitignore guidelines for public and uploads
Create-File (Join-Path $ROOT_DIR "public\.gitkeep") ""
Create-File (Join-Path $ROOT_DIR "uploads\.gitkeep") ""

# 2. Create src and global folders under src
$srcPath = Join-Path $ROOT_DIR "src"
Create-Directory $srcPath
foreach ($folder in $srcGlobalFolders) {
  Create-Directory (Join-Path $srcPath $folder)
}

# 3. Create src/app.js and src/server.js
Create-File (Join-Path $srcPath "app.js") "// TODO: Configure Express app (middlewares, routes, error handling)`n"
Create-File (Join-Path $srcPath "server.js") "// TODO: Start HTTP server and database connections`n"

# 4. Create modules inside src/modules/
$modulesPath = Join-Path $srcPath "modules"
Create-Directory $modulesPath

foreach ($mod in $modules) {
  $modDir = Join-Path $modulesPath $mod
  Create-Directory $modDir

  $capMod = $mod.Substring(0,1).ToUpper() + $mod.Substring(1)
  
  $files = @(
    @{ name = "$mod.controller.js"; label = "Controller" },
    @{ name = "$mod.service.js"; label = "Service" },
    @{ name = "$mod.repository.js"; label = "Repository" },
    @{ name = "$mod.model.js"; label = "Model" },
    @{ name = "$mod.routes.js"; label = "Routes" },
    @{ name = "$mod.validator.js"; label = "Validator" },
    @{ name = "$mod.schema.js"; label = "Schema" },
    @{ name = "$mod.dto.js"; label = "DTO" },
    @{ name = "index.js"; label = "Module Entry" }
  )

  foreach ($file in $files) {
    $filePath = Join-Path $modDir $file.name
    $content = "// TODO: Implement $capMod $($file.label)`n"
    Create-File $filePath $content
  }
}

Write-Host "Scaffold finished successfully via PowerShell!"
