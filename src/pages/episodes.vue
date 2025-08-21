<script setup lang="ts">
import { episodesId } from "~/composables/episodeList";

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
    <div class="p-3 md:p-10 bg-gradient-blue">
        <section class="pb-6">
            <h1 class="card-title text-4xl md:text-5xl md:text-center">
                ARCHIVE
            </h1>
        </section>
        <ul class="list bg-base-100 rounded-2xl">
            <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">
                過去放送回一覧をご覧いただけます．
            </li>
            <div
                v-for="episode in episodesId"
                :id="'episode' + episode.index"
                class="relative m-4"
            >
                <li class="list-row">
                    <div
                        class="text-xl md:text-4xl font-thin opacity-80 tabular-nums"
                    >
                        {{ episode.index.toString().padStart(2, "0") }}
                    </div>
                    <iframe
                        :src="'https://stand.fm/embed/episodes/' + episode.id"
                        class="w-full h-full"
                        frameborder="0"
                        allowtransparency="true"
                        allow="encrypted-media"
                        loading="lazy"
                        :style="
                            windowWidth >= 1054
                                ? 'height: 185px;'
                                : 'height: 222px;'
                        "
                    ></iframe>
                </li>
            </div>
        </ul>
    </div>
</template>
