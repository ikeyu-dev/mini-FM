<script setup lang="ts">
const noticeCount = ref<number>(0);
</script>

<template>
    <nav class="navbar bg-base-100 shadow-sm">
        <div class="navbar-start">
            <div class="dropdown">
                <div
                    tabindex="0"
                    role="button"
                    class="btn btn-ghost btn-circle"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h7"
                        />
                    </svg>
                </div>
                <ul
                    tabindex="0"
                    class="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                    <li><nuxt-link to="/">ホーム</nuxt-link></li>
                    <li><nuxt-link to="/">お知らせ</nuxt-link></li>
                    <li><nuxt-link to="/">リンク</nuxt-link></li>
                </ul>
            </div>
        </div>
        <div class="navbar-center">
            <img
                src="~/assets/img/logo.png"
                alt="miniFM logo"
                class="w-30 md:w-40 lg:w-50"
            />
        </div>
        <div class="navbar-end">
            <button class="btn btn-ghost btn-circle mx-0.5">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </button>
            <button class="btn btn-ghost btn-circle mx-0.5">
                <div class="indicator">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                    </svg>
                    <span class="badge badge-xs badge-primary indicator-item">
                        {{ noticeCount }}
                    </span>
                </div>
            </button>
        </div>
    </nav>
    <slot />
    <footer
        class="footer bottom-0 sm:footer-horizontal bg-white text-neutral-900 p-10"
    >
        <aside>
            <img
                src="~/assets/img/logo.png"
                alt="miniFM logo"
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
                    class=""
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                        class="h-10 w-10 fill-neutral-800 hover:opacity-80 transition-opacity duration-300"
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
                        class="h-10 w-10 fill-red-500 hover:opacity-80 transition-opacity duration-300"
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
                        class="h-10"
                        alt="FM-MiNIT Stand.fm"
                    />
                </a>
            </div>
        </nav>
    </footer>
</template>
