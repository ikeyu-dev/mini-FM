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

const md_show = ref(true);

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
                                d="M342.6 81.4C330.1 68.9 309.8 68.9 297.3 81.4L137.3 241.4C124.8 253.9 124.8 274.2 137.3 286.7C149.8 299.2 170.1 299.2 182.6 286.7L288 181.3L288 552C288 569.7 302.3 584 320 584C337.7 584 352 569.7 352 552L352 181.3L457.4 286.7C469.9 299.2 490.2 299.2 502.7 286.7C515.2 274.2 515.2 253.9 502.7 241.4L342.7 81.4z"
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
                                d="M297.4 566.6C309.9 579.1 330.2 579.1 342.7 566.6L502.7 406.6C515.2 394.1 515.2 373.8 502.7 361.3C490.2 348.8 469.9 348.8 457.4 361.3L352 466.7L352 96C352 78.3 337.7 64 320 64C302.3 64 288 78.3 288 96L288 466.7L182.6 361.3C170.1 348.8 149.8 348.8 137.3 361.3C124.8 373.8 124.8 394.1 137.3 406.6L297.3 566.6z"
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
                    d="M342.6 81.4C330.1 68.9 309.8 68.9 297.3 81.4L137.3 241.4C124.8 253.9 124.8 274.2 137.3 286.7C149.8 299.2 170.1 299.2 182.6 286.7L288 181.3L288 552C288 569.7 302.3 584 320 584C337.7 584 352 569.7 352 552L352 181.3L457.4 286.7C469.9 299.2 490.2 299.2 502.7 286.7C515.2 274.2 515.2 253.9 502.7 241.4L342.7 81.4z"
                />
            </svg>
        </div>
        <div
            class="carousel carousel-vertical rounded-box h-96"
            v-if="!error && data?.programs"
            style="overflow-y: hidden"
        >
            <div
                v-for="(program, index) in data.programs"
                :key="index"
                class="carousel-item card bg-base-100 h-96"
                :data-index="index"
            >
                <div
                    class="grid grid-cols-1 lg:grid-cols-3 gap-4"
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
                    d="M297.4 566.6C309.9 579.1 330.2 579.1 342.7 566.6L502.7 406.6C515.2 394.1 515.2 373.8 502.7 361.3C490.2 348.8 469.9 348.8 457.4 361.3L352 466.7L352 96C352 78.3 337.7 64 320 64C302.3 64 288 78.3 288 96L288 466.7L182.6 361.3C170.1 348.8 149.8 348.8 137.3 361.3C124.8 373.8 124.8 394.1 137.3 406.6L297.3 566.6z"
                />
            </svg>
        </div>
    </section>
</template>
