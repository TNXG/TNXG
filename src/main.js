import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/main.css'
import 'remixicon/fonts/remixicon.css'
import { createI18n } from 'vue-i18n'
import i18n_zh from './locales/zh_cn.js';
import i18n_en from './locales/en.js';
import i18n_ja from './locales/ja.js';
import { createRouter, createWebHashHistory } from 'vue-router'


const i18n = createI18n({
    legacy: false,
    locale: 'zh', // 设置默认语言为中文
    messages: {
        'zh': i18n_zh, // 中文语言包
        'en': i18n_en, // 英文语言包
        'ja': i18n_ja // 日文语言包
    }
});


const Main = { template: '<div>Main</div>' } // 提供一个模板
const About = { template: '<div>About</div>' }

const routes = [
    { path: '/', component: Main },
    { path: '/about', component: About },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

const app = createApp(App)

app.use(i18n);

app.use(router)

app.use(createPinia())

app.mount('#app')





