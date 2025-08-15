<script setup lang="ts">
const noticeCount = ref<number>(0);
</script>

<template>
    <nav class="navbar bg-gradient-blue top-0 sticky z-50 opacity-90">
        <div class="navbar-start pl-2">
            <img
                src="~/assets/img/logo_navbar.png"
                alt="miniFM logo"
                class="w-30 md:w-40 lg:w-50 opacity-100"
            />
        </div>
        <div class="navbar-end">
            <button
                class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 hover:scale-95 transition-transform duration-200 ease-in-out"
            >
                お知らせ
            </button>
        </div>
    </nav>
    <slot />
    <footer
        class="footer bg-[#1e2437] bottom-0 sm:footer-horizontal text-gray-50 p-10 pt-20"
    >
        <aside>
            <img
                src="~/assets/img/logo_navbar.png"
                alt="FM-MiNIT logo"
                class="w-30 md:w-40 lg:w-50"
            />
            <p>
                <span class="text-xs">FM-MiNIT © 2025</span>
            </p>
        </aside>
        <nav>
            <h6 class="footer-title">Social</h6>
            <div class="grid grid-flow-col gap-4">
                <a
                    href="https://x.com/FmMinit"
                    target="_blank"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                        class="h-10 w-10 fill-gray-50 hover:opacity-80 transition-opacity duration-300"
                    >
                        >
                        <path
                            d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z"
                        />
                    </svg>
                </a>
                <a
                    href="https://www.youtube.com/@FM-MiNIT"
                    target="_blank"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                        class="h-10 w-10 fill-gray-50 hover:opacity-80 transition-opacity duration-300"
                    >
                        <path
                            d="M581.7 188.1C575.5 164.4 556.9 145.8 533.4 139.5C490.9 128 320.1 128 320.1 128C320.1 128 149.3 128 106.7 139.5C83.2 145.8 64.7 164.4 58.4 188.1C47 231 47 320.4 47 320.4C47 320.4 47 409.8 58.4 452.7C64.7 476.3 83.2 494.2 106.7 500.5C149.3 512 320.1 512 320.1 512C320.1 512 490.9 512 533.5 500.5C557 494.2 575.5 476.3 581.8 452.7C593.2 409.8 593.2 320.4 593.2 320.4C593.2 320.4 593.2 231 581.8 188.1zM264.2 401.6L264.2 239.2L406.9 320.4L264.2 401.6z"
                        />
                    </svg>
                </a>
                <a
                    href="https://stand.fm/channels/6445f3619afdfc28ca0eae38"
                    target="_blank"
                >
                    <img
                        src="/assets/img/standfm_logo.png"
                        class="h-10 bg-white rounded-full p-1 hover:opacity-80 transition-opacity duration-300"
                        alt="Stand.fm"
                    />
                </a>
            </div>
        </nav>
    </footer>
</template>
