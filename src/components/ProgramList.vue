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

    // モバイル表示の時、carouselがスクロールされた時にcurrentCarouselItemを更新
    // TODO: md_showが動的に変わる場合の処理
    if (md_show.value === false) {
        const carousel = document.querySelector(".carousel");
        if (carousel) {
            carousel.addEventListener("scroll", () => {
                const items = carousel.querySelectorAll(".carousel-item");
                items.forEach((item, index) => {
                    const rect = item.getBoundingClientRect();
                    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                        currentCarouselItem.value = index;
                    }
                });
            });
        }
    }
});

onUnmounted(() => {
    window.removeEventListener("resize", updateVisibility);
    updateVisibility();
});
</script>

<template>
    <section
        class="px-10 pe-10 m-5"
        v-if="md_show"
    >
        <div
            class="card-title card-body flex justify-center items-center text-3xl font-bold section-title"
        >
            番組一覧
        </div>
        <div
            class="grid grid-cols-3 inset-shadow-sm/10 rounded-2xl shadow-lg p-2"
        >
            <div class="col-span-1 col-start-1">
                <div class="flex flex-col justify-center items-center h-96">
                    <div @click="moveToPreviousItem">
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
                        class="text-center my-10"
                        style="font-family: 'M PLUS Rounded 1c'"
                    >
                        <p class="text-xs lg:text-sm text-gray-600">
                            過去の放送回を一覧でご覧いただけます。
                        </p>
                    </div>
                    <div @click="moveToNextItem">
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
                </div>
            </div>
            <div
                class="col-span-2 col-end-4 carousel carousel-vertical carousel-center rounded-box w-full h-96"
                v-if="!error && data?.programs"
                style="overflow-y: hidden"
            >
                <div
                    v-for="(program, index) in data.programs"
                    :key="index"
                    class="carousel-item p-5 h-52"
                    :data-index="index"
                >
                    <div
                        class="grid grid-cols-3 gap-4 items-center bg-base-100 shadow-lg rounded-2xl w-full p-4"
                        v-if="program.title !== 'none'"
                    >
                        <div class="col-span-1">
                            <img
                                :src="program.imgSrc ?? ''"
                                class="w-full rounded"
                            />
                        </div>
                        <div class="col-span-2">
                            <h2 class="text-lg lg:text-xl font-bold">
                                {{ program.title }}
                            </h2>
                            <p class="text-sm text-gray-600">
                                再生ボタンを押すと別タブで再生ページに移動します
                            </p>
                            <div class="flex items-center justify-end mr-6">
                                <nuxt-link
                                    target="_blank"
                                    :to="program.link ?? ''"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 640 640"
                                        class="h-16 w-16 cursor-pointer fill-blue-950 hover:fill-blue-700 transition-colors duration-300"
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
            </div>
        </div>
    </section>
    <section v-if="!md_show">
        <div
            class="text-center my-5"
            style="font-family: 'M PLUS Rounded 1c'"
        >
            <h1 class="text-2xl font-bold mb-3">番組一覧</h1>
            <p class="text-sm md:text-lg text-gray-600">
                過去の放送回を一覧でご覧いただけます。
            </p>
        </div>
        <div
            @click="moveToPreviousItem"
            class="flex justify-center items-center"
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
            class="carousel carousel-vertical rounded-box h-96"
            v-if="!error && data?.programs"
        >
            <div
                v-for="(program, index) in data.programs"
                :key="index"
                class="flex justify-center items-center carousel-item card bg-base-100 h-96"
                :data-index="index"
            >
                <div
                    class="grid grid-cols-1 lg:grid-cols-3"
                    v-if="program.title !== 'none'"
                >
                    <figure>
                        <img
                            :src="program.imgSrc ?? ''"
                            alt="Program Image"
                            class="w-full h-48 object-cover rounded-t-lg"
                        />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">
                            {{ program.title }}
                        </h2>
                        <div class="grid grid-cols-3 gap-0">
                            <p class="text-xs text-gray-600 col-span-2">
                                再生ボタンを押すと、別タブで再生ページに移動します
                            </p>
                            <div class="card-actions justify-end">
                                <nuxt-link
                                    target="_blank"
                                    :to="program.link ?? ''"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 640 640"
                                        class="h-14 w-14 cursor-pointer fill-blue-950 hover:fill-blue-700 transition-colors duration-300"
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
                <div
                    v-else
                    class="text-center text-gray-500"
                >
                    表示内容は最新です．
                </div>
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
