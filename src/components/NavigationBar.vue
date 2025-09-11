<script setup lang="ts">
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
    <nav class="navbar bg-gradient-blue top-0 sticky z-50 opacity-95">
        <div class="navbar-start pl-2">
            <img
                src="~/assets/img/logo_navbar.png"
                alt="miniFM logo"
                class="w-30 md:w-40 lg:w-50 opacity-100"
            />
        </div>
        <section class="navbar-end">
            <ul
                class="menu menu-horizontal rounded-box p-0 md:gap-4 fill-white text-white font-bold"
            >
                <li>
                    <nuxt-link
                        to="/"
                        :class="{ 'tooltip tooltip-bottom': !md_show }"
                        data-tip="Home"
                    >
                        <svg
                            v-if="!md_show"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 640"
                            class="h-4 md:h-6 w-4 md:w-6"
                            data-tip="Home"
                        >
                            <path
                                d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"
                            />
                        </svg>
                        <div
                            v-if="md_show"
                            class="hidden md:inline hover:scale-125 transition-transform duration-300"
                        >
                            Home
                        </div>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link
                        to="/letter"
                        :class="{ 'tooltip tooltip-bottom': !md_show }"
                        data-tip="お便り"
                    >
                        <svg
                            v-if="!md_show"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 640"
                            class="h-4 md:h-6 w-4 md:w-6"
                        >
                            <path
                                d="M322.5 351.7L523.4 150.9L391 520.3L322.5 351.7zM489.4 117L288.6 317.8L120 249.3L489.4 117zM70.1 280.8L275.9 364.4L359.5 570.2C364.8 583.3 377.6 591.9 391.8 591.9C406.5 591.9 419.6 582.7 424.6 568.8L602.6 72C606.1 62.2 603.6 51.4 596.3 44C589 36.6 578.1 34.2 568.3 37.7L71.4 215.7C57.5 220.7 48.3 233.8 48.3 248.5C48.3 262.7 56.9 275.5 70 280.8z"
                            />
                        </svg>
                        <div
                            v-if="md_show"
                            class="hidden md:inline hover:scale-125 transition-transform duration-300"
                        >
                            お便り
                        </div>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link
                        to="/episodes"
                        :class="{ 'tooltip tooltip-bottom': !md_show }"
                        data-tip="過去の放送回"
                    >
                        <svg
                            v-if="!md_show"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 640"
                            class="h-4 md:h-6 w-4 md:w-6"
                        >
                            <path
                                d="M320 112C434.9 112 528 205.1 528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112zM320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM276.5 211.5C269.1 207 259.8 206.8 252.2 211C244.6 215.2 240 223.3 240 232L240 408C240 416.7 244.7 424.7 252.3 428.9C259.9 433.1 269.1 433 276.6 428.4L420.6 340.4C427.7 336 432.1 328.3 432.1 319.9C432.1 311.5 427.7 303.8 420.6 299.4L276.6 211.4zM362 320L288 365.2L288 274.8L362 320z"
                            />
                        </svg>
                        <div
                            v-if="md_show"
                            class="hidden md:inline hover:scale-125 transition-transform duration-300"
                        >
                            過去の放送回
                        </div>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link
                        to="#"
                        :class="{ 'tooltip tooltip-bottom': !md_show }"
                        data-tip="お知らせ"
                    >
                        <svg
                            v-if="!md_show"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 640"
                            class="h-4 md:h-6 w-4 md:w-6"
                        >
                            <path
                                d="M320 64C306.7 64 296 74.7 296 88L296 97.7C214.6 109.3 152 179.4 152 264L152 278.5C152 316.2 142 353.2 123 385.8L101.1 423.2C97.8 429 96 435.5 96 442.2C96 463.1 112.9 480 133.8 480L506.2 480C527.1 480 544 463.1 544 442.2C544 435.5 542.2 428.9 538.9 423.2L517 385.7C498 353.1 488 316.1 488 278.4L488 263.9C488 179.3 425.4 109.2 344 97.6L344 87.9C344 74.6 333.3 63.9 320 63.9zM488.4 432L151.5 432L164.4 409.9C187.7 370 200 324.6 200 278.5L200 264C200 197.7 253.7 144 320 144C386.3 144 440 197.7 440 264L440 278.5C440 324.7 452.3 370 475.5 409.9L488.4 432zM252.1 528C262 556 288.7 576 320 576C351.3 576 378 556 387.9 528L252.1 528z"
                            />
                        </svg>
                        <div
                            v-if="md_show"
                            class="hidden md:inline hover:scale-125 transition-transform duration-300"
                        >
                            お知らせ
                        </div>
                    </nuxt-link>
                </li>
            </ul>
        </section>
    </nav>
</template>
