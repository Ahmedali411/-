import { defineConfig, loadEnv, type PluginOption, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(async ({ mode }) => {
  const plugins: PluginOption[] = [react(), tailwindcss()];
  try {
    // @ts-expect-error -- This optional module is injected only in tagged Arena builds.
    const m = await import('./.vite-source-tags.js');
    plugins.push(m.sourceTags());
  } catch (error) {
    if (!(error instanceof Error) || !error.message.includes('.vite-source-tags.js')) {
      throw error;
    }
  }

  const env = loadEnv(mode, process.cwd(), ['VITE_', 'NEXT_PUBLIC_']);
  const processEnvDefines: Record<string, string> = {};
  for (const [key, value] of Object.entries(env)) {
    processEnvDefines[`process.env.${key}`] = JSON.stringify(value);
  }

  const config: UserConfig = {
    plugins,
    envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
    },
    define: processEnvDefines,
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'assets/enjaz-alb63-[hash].js',
          chunkFileNames: 'assets/enjaz-alb63-[hash].js',
          assetFileNames: 'assets/enjaz-alb63-[hash][extname]',
        },
      },
    },
  };
  return config;
})
