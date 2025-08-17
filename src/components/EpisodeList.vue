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
    <div class="card shadow-lg rounded-lg p-3 md:p-10 animate-fade-in py-32">
        <section class="pb-6">
            <h1 class="card-title text-4xl md:text-5xl md:text-center">
                ARCHIVE
            </h1>
        </section>
        <div
            class="carousel carousel-horizontal carousel-center space-x-4"
            v-if="!error && data?.episodes"
        >
            <svg
                v-if="md_show"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                class="w-20 z-50 absolute left-2 left-angle-opacity-animation"
                :style="
                    windowWidth >= 1054 ? 'height: 185px;' : 'height: 222px;'
                "
                style="background-color: #020a25"
            >
                <path
                    d="M105.4 297.4C92.9 309.9 92.9 330.2 105.4 342.7L265.4 502.7C277.9 515.2 298.2 515.2 310.7 502.7C323.2 490.2 323.2 469.9 310.7 457.4L173.3 320L310.6 182.6C323.1 170.1 323.1 149.8 310.6 137.3C298.1 124.8 277.8 124.8 265.3 137.3L105.3 297.3zM457.4 137.4L297.4 297.4C284.9 309.9 284.9 330.2 297.4 342.7L457.4 502.7C469.9 515.2 490.2 515.2 502.7 502.7C515.2 490.2 515.2 469.9 502.7 457.4L365.3 320L502.6 182.6C515.1 170.1 515.1 149.8 502.6 137.3C490.1 124.8 469.8 124.8 457.3 137.3z"
                />
            </svg>
            <div
                v-for="(program, index) in data.episodes"
                :key="index"
                class="carousel-item rounded-lg shadow-md w-full md:w-1/2 overflow-hidden"
                :data-index="index"
                :style="
                    windowWidth >= 1054 ? 'height: 185px;' : 'height: 222px;'
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
            <svg
                v-if="md_show"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                class="w-20 z-50 absolute right-2 right-angle-opacity-animation"
                :style="
                    windowWidth >= 1054 ? 'height: 185px;' : 'height: 222px;'
                "
                style="background-color: #212f52"
            >
                <path
                    d="M535.1 342.6C547.6 330.1 547.6 309.8 535.1 297.3L375.1 137.3C362.6 124.8 342.3 124.8 329.8 137.3C317.3 149.8 317.3 170.1 329.8 182.6L467.2 320L329.9 457.4C317.4 469.9 317.4 490.2 329.9 502.7C342.4 515.2 362.7 515.2 375.2 502.7L535.2 342.7zM183.1 502.6L343.1 342.6C355.6 330.1 355.6 309.8 343.1 297.3L183.1 137.3C170.6 124.8 150.3 124.8 137.8 137.3C125.3 149.8 125.3 170.1 137.8 182.6L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7z"
                />
            </svg>
        </div>
        <div
            v-else
            class="text-center text-white text-lg py-6"
        >
            取得に失敗しました．しばらくしてから再度お試しください．
        </div>
    </div>
</template>
