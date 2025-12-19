import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,       // 0.0.0.0 と同等。コンテナ外からアクセス可能にする
    watch: {
      usePolling: true, // マウントボリュームでも変更を確実に検知
      interval: 100     // ポーリング間隔（ms）
    }
  }
})