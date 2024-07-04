import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { MotionPlugin } from '@vueuse/motion'

createApp(App).use(MotionPlugin).mount('#app')
