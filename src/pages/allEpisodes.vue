<script setup lang="ts">
import { episodesId } from "~/composables/episodeList";

// const allEpisodesId = [
//     { id: "687f8f79732743876e88f727", index: 34 },
//     { id: "6877c6bab8e4b65cd57415e8", index: 33 },
//     { id: "6845378e769a71d6c7c525a5", index: 32 },
//     { id: "683b064dd29fa393f5c86a0e", index: 31 },
//     { id: "683491df3eb55a12c95806a9", index: 30 },
//     { id: "682b41f7da37f431c788db30", index: 29 },
//     { id: "681f617f237a9a45ff3a0d6a", index: 28 },
//     { id: "6767aff75b4f54dba052e995", index: 27 },
//     { id: "674c5d4eaa36558fc480754e", index: 26 },
//     { id: "672865c51bc0c1c6f1d1446e", index: 25 },
//     { id: "6727802e5462dba569401e16", index: 24 },
//     { id: "6711c9ac57b1e489da586766", index: 23 },
//     { id: "666ae1973a381d0d4833feac", index: 22 },
//     { id: "663f6b38cd252872f79b7f01", index: 21 },
//     { id: "662c5799fb6e58361849fcc3", index: 20 },
//     { id: "6586d7f0b4671bb8bef458e8", index: 19 },
//     { id: "658077d18a272c26ad2592ec", index: 18 },
//     { id: "65768d03bfea19b827cfa030", index: 17 },
//     { id: "656f1539b4854c3336eb0f66", index: 16 },
//     { id: "6560524ece0c38a633c4b2ef", index: 15 },
//     { id: "655b50a4723b21302f447280", index: 14 },
//     { id: "65514c69d9adea4d2d6c4ed3", index: 13 },
//     { id: "6548cb184d57e5b2b0c205d4", index: 12 },
//     { id: "6536b1a084194b5dca7116f6", index: 11 },
//     { id: "652cd3697a724b57cf243f05", index: 10 },
//     { id: "64c8911422bb077d8cf68e0e", index: 9 },
//     { id: "64c09469439a19ff5a752553", index: 8 },
//     { id: "64b5f1be3067143d3e81a5a4", index: 7 },
//     { id: "64abc4cfc5743a9249ab14b5", index: 6 },
//     { id: "649e9a8881fb1abf29ba3746", index: 5 },
//     { id: "6497b654611a8abf5df2b16e", index: 4 },
//     { id: "6490ccf8a97768ef9e4a35be", index: 3.1 },
//     { id: "64906576a97768ef9e4a30b4", index: 3 },
//     { id: "6486a8fc7d0dbd92b4a478f7", index: 2 },
//     { id: "647e9afebd6d4ac8ccf98095", index: 1.1 },
//     { id: "647ea683fcb86fe1043711ba", index: 1 },
//     { id: "64689dfc4321bc0322b3a8f7", index: 0 },
// ];

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
