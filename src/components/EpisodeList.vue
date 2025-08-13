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

const updateVisibility = () => {
    md_show.value = window.innerWidth >= 768;
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
    <section class="card md:card-body pt-10">
        <div
            class="carousel carousel-horizontal carousel-center rounded-box"
            v-if="!error && data?.episodes"
        >
            <div
                v-for="(program, index) in data.episodes"
                :key="index"
                class="carousel-item bg-base-100 h-72 w-full md:w-1/2"
                :data-index="index"
            >
                <iframe
                    v-if="program.title !== 'none'"
                    :src="
                        'https://stand.fm/embed/episodes/' +
                        program.link.split('episodes/')[1].split('&')[0]
                    "
                    class="w-full h-full px-2"
                    frameborder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    </section>
</template>
