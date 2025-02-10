import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  define: {
    __dirname: '"."' // 替换为当前目录的相对路径
  },
  plugins: [vue()],
  server: {
    port: 3333
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['path'], // 将 'path' 模块标记为外部依赖
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
