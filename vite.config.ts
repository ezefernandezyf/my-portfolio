import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function prerenderPlugin() {
  return {
    name: 'prerender',
    closeBundle: () => {
      const script = resolve(__dirname, 'scripts/prerender.mjs');
      execSync(`node "${script}"`, { stdio: 'inherit' });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), prerenderPlugin()],
});
