import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {visualizer} from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        visualizer({
            open: true,
            gzipSize: true,
            brotliSize: true,
        }),
    ],
    define: {
        global: {},
    },
    server: {
        hmr: false,
        proxy: process.env.NODE_ENV === 'development' ? {
            "/api": {
                target: 'http://localhost:6969',
                changeOrigin: true,
                secure: false,
            },
            "/ws": {
                target: 'ws://localhost:6969',
                changeOrigin: true,
                secure: false,
            }
        } : undefined,
    },
    resolve: {
        alias: {
            src: '/src'
        }
    },
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.info', 'console.warn'],
            },
            format: {
                comments: false,
            },
        },
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes('node_modules')) {
                        return 'vendor'
                    }
                }
            }
        },
        sourcemap: false,
        chunkSizeWarningLimit: 1000,
    }
})