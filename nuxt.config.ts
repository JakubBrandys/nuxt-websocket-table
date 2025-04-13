import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
      pusherKey: process.env.PUSHER_APP_KEY,
      pusherCluster: process.env.PUSHER_APP_CLUSTER,
      eventName: process.env.EVENT,
      channelName: process.env.CHANNEL,
    },
    apiSecret: process.env.API_SECRET,
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
})
