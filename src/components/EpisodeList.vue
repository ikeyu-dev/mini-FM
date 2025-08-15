<script setup lang="ts">
import type { Episodes } from "~/types/episode";
const { data, error } = await useAsyncData("episodes", async () => {
    const response = await $fetch("/api/episodes");
    return response as Episodes;
});

if (data) {
    if (data.value && data.value.episodes) {
        data.value.episodes = data.value.episodes
            .sort((a: any, b: any) => {
                const extractEpisodeNumber = (title: string) => {
                    const match =
                        title.match(/第(\d+)回/) ||
                        title.match(/第(\d+\.\d+)回/);
                    if (!match) {
                        return 0;
                    } else {
                        return parseFloat(match[1]);
                    }
                };
                return (
                    extractEpisodeNumber(b.title) -
                    extractEpisodeNumber(a.title)
                );
            })
            .filter(
                (program) =>
                    program.link !== "https://forms.gle/mQ7DpVwUqRtKnbcG6"
            );
    }
}

const md_show = ref<boolean>(true);
const windowWidth = ref<number>(0);

const updateVisibility = () => {
    md_show.value = window.innerWidth >= 768;
    windowWidth.value = window.innerWidth;
};

onMounted(async () => {
    window.addEventListener("resize", updateVisibility);
    updateVisibility();
});

onUnmounted(() => {
    window.removeEventListener("resize", updateVisibility);
    updateVisibility();
});
</script>

<template>
    <section class="card shadow-lg rounded-lg pt-6 pb-14 px-2 animate-fade-in">
        <section class="pb-6">
            <div
                class="card-title text-white flex justify-center items-center text-3xl font-semibold py-4"
            >
                過去の放送回一覧
            </div>
        </section>
        <div
            class="carousel carousel-horizontal carousel-center space-x-4"
            v-if="!error && data?.episodes"
        >
            <div
                v-for="(program, index) in data.episodes"
                :key="index"
                class="carousel-item rounded-lg shadow-md w-full md:w-1/2 overflow-hidden"
                :data-index="index"
                :style="
                    windowWidth >= 1039 ? 'height: 185px;' : 'height: 222px;'
                "
            >
                <iframe
                    v-if="program.title !== 'none'"
                    :src="
                        'https://stand.fm/embed/episodes/' +
                        program.link.split('episodes/')[1].split('&')[0]
                    "
                    class="w-full h-full"
                    frameborder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
                    loading="lazy"
                ></iframe>
            </div>
        </div>
        <div
            v-else
            class="text-center text-white text-lg py-6"
        >
            取得に失敗しました．しばらくしてから再度お試しください．
        </div>
    </section>
</template>
