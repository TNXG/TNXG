<script setup>
import { computed } from 'vue';
import Waterfall from 'vue-wf'
import WaterfallCards from '@/components/other/WaterfallCards.vue'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

const column = computed(() => {
    const w = Math.min(1660, width.value)
    if (width.value === Number.POSITIVE_INFINITY) {
        return 1
    }
    return Math.floor(w / 500) + 1
})
const itemWidth = computed(() => {
    const w = Math.min(1660, width.value)
    return (w - 32 * column.value) / column.value
})



let datas = []; // 定义 datas 数组

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://tnxg-proxy.deno.dev/https://mx.tnxg.top/api/v2/posts', true);
xhr.send();
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        const data = JSON.parse(xhr.responseText).data;
        data.forEach((item) => { // 使用 forEach 而不是 map
            if (item.images.length > 0) {
                const randomImage = item.images[Math.floor(Math.random() * item.images.length)];
                item.cover = randomImage.src ? randomImage.src : 'https://assets.tnxg.whitenuo.cn/images/avatar/none.jpg';
            } else {
                item.cover = 'https://assets.tnxg.whitenuo.cn/images/avatar/none.jpg';
            }
            if (!item.summary) {
                item.summary = '暂无文章简介，请进入文章查看详细内容！';
            }
            datas.push({
                title: item.title,
                desc: item.summary,
                link: item.cover,
                href: `https://tnxg.top/posts/${item.category.slug}/${item.slug}`
            });
        });
        console.log(datas); // 输出 datas 的值，检查是否被正确设置
    }
}
</script>


<template>
    <div class="WaterfallCord">
        <Waterfall :item-width="itemWidth" :row-count="column">
            <WaterfallCards v-for="data in datas" :key="data.title" :title="data.title" :desc="data.desc" :link="data.link"
                :href="data.href" />
        </Waterfall>
    </div>
</template>

<style scoped>
.WaterfallCord {
    margin-top: 2rem;
    margin-bottom: 2rem;
    /* 左边加一个块，左右两边留白一样 */
    margin-right: 10%;
    margin-left: 10%;
}
</style>