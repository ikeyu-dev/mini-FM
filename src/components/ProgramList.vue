<script setup lang="ts">
import type { Programs } from "~/types/programs";
import { useProgramStore } from "~/composables/programStore";

// const programStore = useProgramStore();

// let data = ref<Programs | null>(null);
// let error = ref<Error | null>(null);
// if (!programStore.programs) {
//     ({ data, error } = await useAsyncData("programs", async () => {
//         const response = await $fetch("/api/programs");
//         return response as Programs;
//     }));
//     if (data.value) {
//         programStore.setPrograms(data.value);
//     }
// }

const { data, error } = await useAsyncData("programs", async () => {
    const response = await $fetch("/api/programs");
    return response as Programs;
});

if (data) {
    if (data.value && data.value.programs) {
        data.value.programs = data.value.programs
            .sort((a: any, b: any) => {
                const extractEpisodeNumber = (title: string) => {
                    const match =
                        title.match(/第(\d+)回/) ||
                        title.match(/第(\d+\.\d+)回/);
                    if (!match) {
                        if (title === "none") {
                            return 1000;
                        }
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
const currentCarouselItem = ref(0);

const moveToPreviousItem = () => {
    const carousel = document.querySelector(".carousel");
    if (
        carousel &&
        currentCarouselItem.value > 0 &&
        currentCarouselItem.value - 1 >= 1
    ) {
        currentCarouselItem.value -= 1;
        const previousItem = carousel.querySelector(
            `.carousel-item[data-index="${currentCarouselItem.value}"]`
        ) as HTMLElement;
        if (previousItem) {
            previousItem.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }
    console.log(currentCarouselItem.value);
};

const moveToNextItem = () => {
    const carousel = document.querySelector(".carousel");
    if (carousel) {
        const items = carousel.querySelectorAll(".carousel-item");
        if (currentCarouselItem.value < items.length - 1) {
            currentCarouselItem.value += 1;
            const nextItem = carousel.querySelector(
                `.carousel-item[data-index="${currentCarouselItem.value}"]`
            ) as HTMLElement;
            if (nextItem) {
                nextItem.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }
        }
    }
    console.log(currentCarouselItem.value);
};

const md_show = ref<boolean>(true);

const updateVisibility = () => {
    md_show.value = window.innerWidth >= 768;
};

onMounted(async () => {
    window.addEventListener("resize", updateVisibility);
    updateVisibility();
    await nextTick();
    moveToNextItem();
});

onUnmounted(() => {
    window.removeEventListener("resize", updateVisibility);
    updateVisibility();
});
</script>

<template>
    <section>
        <div
            class="text-center my-5"
            style="font-family: 'M PLUS Rounded 1c'"
        >
            <h1 class="text-2xl font-bold mb-3 mt-10">番組一覧</h1>
            <p class="text-sm md:text-lg text-gray-600">
                過去の放送回を再生できます。
            </p>
        </div>
        <div
            @click="moveToPreviousItem"
            class="flex justify-center items-center mb-2 md:mb-10"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                class="h-12 w-12 cursor-pointer fill-blue-950 hover:fill-blue-700 transition-colors duration-300"
            >
                <path
                    d="M297.4 169.4C309.9 156.9 330.2 156.9 342.7 169.4L534.7 361.4C547.2 373.9 547.2 394.2 534.7 406.7C522.2 419.2 501.9 419.2 489.4 406.7L320 237.3L150.6 406.6C138.1 419.1 117.8 419.1 105.3 406.6C92.8 394.1 92.8 373.8 105.3 361.3L297.3 169.3z"
                />
            </svg>
        </div>
        <div
            class="carousel carousel-vertical rounded-box h-72 w-full"
            v-if="!error && data?.programs"
            style="overflow-y: hidden"
        >
            <div
                v-for="(program, index) in data.programs"
                :key="index"
                class="flex justify-center items-center carousel-item bg-base-100 h-72"
                :data-index="index"
            >
                <iframe
                    :src="
                        'https://stand.fm/embed/episodes/' +
                        program.link.split('episodes/')[1].split('&')[0]
                    "
                    class="card-body flex justify-center items-center w-full h-full object-fill md:max-w-9/12"
                    frameborder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
                    loading="lazy"
                    v-if="program.title !== 'none'"
                ></iframe>
            </div>
        </div>
        <div
            @click="moveToNextItem"
            class="flex justify-center items-center"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                class="h-12 w-12 cursor-pointer fill-blue-950 hover:fill-blue-700 transition-colors duration-300"
            >
                <path
                    d="M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z"
                />
            </svg>
        </div>
    </section>
</template>
