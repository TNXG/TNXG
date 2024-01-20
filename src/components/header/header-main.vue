<script>
import { useI18n } from 'vue-i18n'
import { ref, onMounted } from 'vue'

export default {
    setup() {
        const { locale } = useI18n()

        const changeLanguage = (lang) => {
            locale.value = lang
            localStorage.setItem('selectedLanguage', lang) // 存储语言选择
        }

        const showLanguageSelect = ref(false);

        const toggleLanguageSelect = () => {
            showLanguageSelect.value = !showLanguageSelect.value;
        };

        const hideLanguageSelect = () => {
            setTimeout(() => {
                showLanguageSelect.value = false;
            }, 500);
        };

        onMounted(() => {
            const selectedLanguage = localStorage.getItem('selectedLanguage') // 获取语言选择
            if (selectedLanguage) {
                locale.value = selectedLanguage // 设置为当前语言
            }
        })

        return {
            changeLanguage,
            showLanguageSelect,
            toggleLanguageSelect,
            hideLanguageSelect,
        }
    }
}
</script>

<template>
    <header>
        <nav class="backdrop-blur">
            <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div class="relative flex items-center justify-between h-16">
                    <!-- 左侧 logo -->
                    <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <!-- Mobile menu button-->
                        <button @click="toggleMenu" type="button"
                            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                    <!-- 中间路径 -->
                    <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div class="flex-shrink-0 flex items-center">
                            <img class="block lg:hidden h-8 w-auto" src="https://api-space.tnxg.top/avatar?s=qq" alt="Logo">
                            <img class="hidden lg:block h-8 w-auto" src="https://api-space.tnxg.top/avatar?s=qq" alt="Logo">
                        </div>
                        <div class="hidden sm:block sm:ml-6">
                            <div class="flex space-x-4">
                                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                                <router-link to="/"
                                    class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">{{
                                        $t('header.home') }}</router-link>
                                <a href="https://tnxg.top/about-me"
                                    class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">{{
                                        $t('header.about') }}</a>
                                <a href="https://tnxg.top/"
                                    class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">{{
                                        $t('header.blog') }}
                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- 右侧语言选择 -->
                    <div @mouseleave="hideLanguageSelect" class="relative h-8 w-8 rounded-full">
                        <a @click="toggleLanguageSelect" tabindex="0" class="langselect">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                <path
                                    d="m476-80 182-480h84L924-80h-84l-43-122H603L560-80h-84ZM160-200l-56-56 202-202q-35-35-63.5-80T190-640h84q20 39 40 68t48 58q33-33 68.5-92.5T484-720H40v-80h280v-80h80v80h280v80H564q-21 72-63 148t-83 116l96 98-30 82-122-125-202 201Zm468-72h144l-72-204-72 204Z" />
                            </svg>
                        </a>
                        <div v-if="showLanguageSelect"
                            class="origin-top-right absolute right-0 top-full w-38 rounded-md shadow-lg py-1 backdrop-opacity-35 bg-gray-300 ring-1 ring-black ring-opacity-5">
                            <div class="py-1 content-center" role="menu" aria-orientation="vertical"
                                aria-labelledby="options-menu">
                                <a @click="changeLanguage('zh')"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    role="menuitem">中文</a>
                                <a @click="changeLanguage('ja')"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    role="menuitem">日本語</a>
                                <a @click="changeLanguage('en')"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    role="menuitem">English</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<style scoped>
header {
    z-index: 1;
    position: absolute;
    width: 100%;
    top: 0;
}
</style>