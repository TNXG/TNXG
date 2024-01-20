<script setup>
import { useElementVisibility, watchOnce } from '@vueuse/core'
import { defineProps, ref, computed } from 'vue'
const props = defineProps(['title', 'desc', 'link', 'href'])
const target = ref()
const isVisiable = useElementVisibility(target)
const alreadyLoaded = ref(false)
watchOnce(isVisiable, () => {
    if (!alreadyLoaded.value) {
        alreadyLoaded.value = true
    }
})
const style = computed(() => {
    const show = isVisiable.value || alreadyLoaded.value
    return {
        opacity: show ? 1 : 0,
        transform: `translateY(${show ? 0 : 100}px)`,
        transitionDelay: `${Math.random() * 0.2}s`,
    }
})

const isVideo = computed(() => {
    if (props.link) {
        const extension = props.link.split('.').pop().toLowerCase();
        if (['mp4', 'webm'].includes(extension)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
});
</script>
<template>
    <a ref="target" :style="style" target="_blank" :href="href"
        class="backdrop-blur-md rounded-xl hover:bg-bg-2 border-bd !border inline-block max-w-512px bg-bg-3 transition-all duration-1000">

        <video v-if="isVideo" :src="link" class="rounded-t-xl border-b border-bd" autoplay muted loop playsinline
            controlslist="nodownload" />
        <img v-else :src="link" class="rounded-t-xl border-b border-bd" />
        <div class="p-4">
            <h3 class="font-bold mb-2">
                {{ title }}
            </h3>
            <p class="text-fg-3 text-sm">
                {{ desc }}
            </p>
        </div>
    </a>
</template>