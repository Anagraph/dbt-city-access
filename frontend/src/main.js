import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import messages from './messages'
import App from './App.vue'
import router from './router'
import 'normalize.css'
import '@/assets/styles/main.scss'
const i18n = createI18n({
  locale: 'fr',
  fallbackLocale: 'en',
  messages
})
createApp(App).use(router).use(i18n).mount('#app')
