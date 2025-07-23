<script setup lang="ts">
const { data, error } = await useAsyncData("programs", async () => {
    const response = await $fetch("/api/programs");
    return response as {
        programs: {
            title: string | null;
            link: string | null;
            imgSrc?: string | null;
        }[];
    };
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
console.log(data.value);
</script>
<template>
    <div
        class="carousel carousel-vertical rounded-box w-full h-96"
        v-if="!error && data?.programs"
    >
        <div
            v-if="data?.programs"
            v-for="program in data.programs"
            class="carousel-item p-5"
        >
            <div
                class="grid grid-cols-3 gap-4 items-center bg-base-100 shadow-sm w-full p-4"
            >
                <div class="col-span-1">
                    <img
                        :src="program.imgSrc ?? ''"
                        class="w-full rounded"
                    />
                </div>
                <div class="col-span-2">
                    <h2 class="text-sm md:text-xl font-bold">
                        {{ program.title }}
                    </h2>
                    <p class="text-xs md:text-sm text-gray-600">
                        再生ボタンを押すと再生ページに移動します
                    </p>
                    <nuxt-link
                        :to="program.link ?? ''"
                        class="flex items-center justify-end mt-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 640"
                            class="h-10 w-10 cursor-pointer"
                        >
                            <path
                                d="M64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320zM252.3 211.1C244.7 215.3 240 223.4 240 232L240 408C240 416.7 244.7 424.7 252.3 428.9C259.9 433.1 269.1 433 276.6 428.4L420.6 340.4C427.7 336 432.1 328.3 432.1 319.9C432.1 311.5 427.7 303.8 420.6 299.4L276.6 211.4C269.2 206.9 259.9 206.7 252.3 210.9z"
                            />
                        </svg>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>
