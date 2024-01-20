<script setup>
import { ref } from 'vue';
const year = ref(String(new Date().getFullYear()));
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.footer {
  margin-top: auto;
  margin-left: 10%; /* 添加这一行 */
  text-align: center;
  height: 15vh;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-style: normal; /* 添加这一行 */
}
</style>

<template>
  <div class="footer">
    <p class="mt-2 text-sm">© 2019 - {{ year }} {{ $t('main.master') }}</p>
  </div>
</template>