set -e

echo "🧹 Cleaning monorepo..."

echo "🗑️ Removing node_modules..."

rm -rf node_modules

find . -name "node_modules" -type d -prune -exec rm -rf '{}' +

echo "🗑️ Removing build artifacts (dist, .turbo, .expo)..."

find . -name "dist" -type d -prune -exec rm -rf '{}' +
find . -name ".turbo" -type d -prune -exec rm -rf '{}' +
find . -name ".expo" -type d -prune -exec rm -rf '{}' +

echo "✨ Clean complete!"
echo "Run 'pnpm install' to re-install dependencies."
