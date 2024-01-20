<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const showDownArrow = ref(true);

const handleScroll = () => {
  showDownArrow.value = window.pageYOffset === 0;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>


<template>
  <main id="title">
    <div id="root">
      <div id="background" class="background">
        <div class="background-image"></div>
      </div>
      <div class="banner">
        <div class="avatar">
          <img src="https://api-space.tnxg.top/avatar?s=qq" alt="avatar" />
        </div>
        <div class="title">
          <div class="name">
            <h2 class="name_title">{{ $t('main.master') }}</h2>
          </div>
          <div class="bio">{{ $t('main.bio') }}</div>
        </div>
      </div>
      <div class="down-arrow" v-show="showDownArrow">
        <div class="down-arrow-inner">
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em"
            xmlns="http://www.w3.org/2000/svg">
            <path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="48"
              d="M112 184l144 144 144-144">
            </path>
          </svg>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.down-arrow-inner {
  animation: arrow-bounce 2s infinite;
}

@keyframes arrow-bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
}

.banner {
  width: 100%;
  height: 0%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>