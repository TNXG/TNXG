<script setup>
import { watchEffect } from 'vue';
import SiteMain from './components/main/site-main.vue';
import SiteFooter from './components/footer/footer-main.vue';
import SiteHeader from './components/header/header-main.vue';
import SitePostsWaterfall from './components/main/site-posts-waterfall.vue';





watchEffect(async () => {
  console.log('Fetching data.');
  try {
    const img_data = await fetch('https://api.prts.top/v1/images/wallpaper/?type=json')
      .then(response => response.json())
      .then(data => {
        console.log(data.image);
        return data.image;
      });
    // 自动刷新背景图片

    document.documentElement.style.setProperty('--bg_img', `url(${img_data})`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<template>
  <!-- 菜单 -->
  <SiteHeader />
  <!-- 标题界面 -->
  <SiteMain />
  <!-- 文章瀑布流 -->
  <SitePostsWaterfall />
  <!-- 页脚 -->
  <SiteFooter />
</template>
