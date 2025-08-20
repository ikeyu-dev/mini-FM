<script setup lang="ts">
// import type { Episodes } from "~/types/episode";
// const { data, error } = await useAsyncData("episodes", async () => {
//     const response = await $fetch("/api/episodes");
//     return response as Episodes;
// });

// if (data) {
//     if (data.value && data.value.episodes) {
//         data.value.episodes = data.value.episodes
//             .sort((a: any, b: any) => {
//                 const extractEpisodeNumber = (title: string) => {
//                     const match =
//                         title.match(/第(\d+)回/) ||
//                         title.match(/第(\d+\.\d+)回/);
//                     if (!match) {
//                         return 0;
//                     } else {
//                         return parseFloat(match[1]);
//                     }
//                 };
//                 return (
//                     extractEpisodeNumber(b.title) -
//                     extractEpisodeNumber(a.title)
//                 );
//             })
//             .filter(
//                 (program) =>
//                     program.link !== "https://forms.gle/mQ7DpVwUqRtKnbcG6"
//             );
//     }
// }

const allEpisodesId = [
    { id: "687f8f79732743876e88f727", index: 34 },
    { id: "6877c6bab8e4b65cd57415e8", index: 33 },
    { id: "6845378e769a71d6c7c525a5", index: 32 },
    { id: "683b064dd29fa393f5c86a0e", index: 31 },
    { id: "683491df3eb55a12c95806a9", index: 30 },
    { id: "682b41f7da37f431c788db30", index: 29 },
    { id: "681f617f237a9a45ff3a0d6a", index: 28 },
    { id: "6767aff75b4f54dba052e995", index: 27 },
    { id: "674c5d4eaa36558fc480754e", index: 26 },
    { id: "672865c51bc0c1c6f1d1446e", index: 25 },
    { id: "6727802e5462dba569401e16", index: 24 },
    { id: "6711c9ac57b1e489da586766", index: 23 },
    { id: "666ae1973a381d0d4833feac", index: 22 },
    { id: "663f6b38cd252872f79b7f01", index: 21 },
    { id: "662c5799fb6e58361849fcc3", index: 20 },
    { id: "6586d7f0b4671bb8bef458e8", index: 19 },
    { id: "658077d18a272c26ad2592ec", index: 18 },
    { id: "65768d03bfea19b827cfa030", index: 17 },
    { id: "656f1539b4854c3336eb0f66", index: 16 },
    { id: "6560524ece0c38a633c4b2ef", index: 15 },
    { id: "655b50a4723b21302f447280", index: 14 },
    { id: "65514c69d9adea4d2d6c4ed3", index: 13 },
    { id: "6548cb184d57e5b2b0c205d4", index: 12 },
    { id: "6536b1a084194b5dca7116f6", index: 11 },
    { id: "652cd3697a724b57cf243f05", index: 10 },
    { id: "64c8911422bb077d8cf68e0e", index: 9 },
    { id: "64c09469439a19ff5a752553", index: 8 },
    { id: "64b5f1be3067143d3e81a5a4", index: 7 },
    { id: "64abc4cfc5743a9249ab14b5", index: 6 },
    { id: "649e9a8881fb1abf29ba3746", index: 5 },
    { id: "6497b654611a8abf5df2b16e", index: 4 },
    { id: "6490ccf8a97768ef9e4a35be", index: 3.1 },
    { id: "64906576a97768ef9e4a30b4", index: 3 },
    { id: "6486a8fc7d0dbd92b4a478f7", index: 2 },
    { id: "647e9afebd6d4ac8ccf98095", index: 1.1 },
    { id: "647ea683fcb86fe1043711ba", index: 1 },
    { id: "64689dfc4321bc0322b3a8f7", index: 0 },
];

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
        <div class="carousel w-full">
            <div
                v-for="episode in allEpisodesId"
                :id="'episode' + episode.index"
                class="carousel-item relative w-full m-4"
            >
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
                <div
                    class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"
                >
                    <a
                        v-if="md_show"
                        :href="'#episode' + (episode.index + 1)"
                        class="btn btn-circle"
                    >
                        <svg
                            v-if="md_show"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 640"
                            class="left-angle-opacity-animation"
                        >
                            <path
                                d="M105.4 297.4C92.9 309.9 92.9 330.2 105.4 342.7L265.4 502.7C277.9 515.2 298.2 515.2 310.7 502.7C323.2 490.2 323.2 469.9 310.7 457.4L173.3 320L310.6 182.6C323.1 170.1 323.1 149.8 310.6 137.3C298.1 124.8 277.8 124.8 265.3 137.3L105.3 297.3zM457.4 137.4L297.4 297.4C284.9 309.9 284.9 330.2 297.4 342.7L457.4 502.7C469.9 515.2 490.2 515.2 502.7 502.7C515.2 490.2 515.2 469.9 502.7 457.4L365.3 320L502.6 182.6C515.1 170.1 515.1 149.8 502.6 137.3C490.1 124.8 469.8 124.8 457.3 137.3z"
                            />
                        </svg>
                    </a>
                    <a
                        v-if="md_show"
                        :href="'#episode' + (episode.index - 1)"
                        q
                        class="btn btn-circle"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 640"
                            class="right-angle-opacity-animation"
                        >
                            <path
                                d="M535.1 342.6C547.6 330.1 547.6 309.8 535.1 297.3L375.1 137.3C362.6 124.8 342.3 124.8 329.8 137.3C317.3 149.8 317.3 170.1 329.8 182.6L467.2 320L329.9 457.4C317.4 469.9 317.4 490.2 329.9 502.7C342.4 515.2 362.7 515.2 375.2 502.7L535.2 342.7zM183.1 502.6L343.1 342.6C355.6 330.1 355.6 309.8 343.1 297.3L183.1 137.3C170.6 124.8 150.3 124.8 137.8 137.3C125.3 149.8 125.3 170.1 137.8 182.6L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7z"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
