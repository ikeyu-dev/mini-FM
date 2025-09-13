<script setup lang="ts">
import { articleList } from "~/composables/articleList";
</script>
<template>
    <div
        class="p-3 md:p-10 bg-gradient-blue"
        style="min-height: 650px"
    >
        <section class="pb-6">
            <h1 class="card-title text-4xl md:text-5xl md:text-center">
                Notice
            </h1>
        </section>
        <ul class="list bg-base-100 rounded-2xl">
            <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">
                FM-MiNITからのお知らせです．
            </li>
            <div
                v-for="article in articleList"
                :id="'episode' + article.num"
                class="relative m-4"
            >
                <li class="list-row">
                    <div
                        class="w-full h-full flex items-center text-sm md:text-2xl"
                        style="font-family: 'M PLUS Rounded 1c'"
                    >
                        {{ article.title }}
                    </div>
                    <div
                        class="text-sm font-thin opacity-80 tabular-nums text-right"
                    >
                        {{ new Date(article.published).toLocaleDateString() }}
                    </div>
                </li>
            </div>
        </ul>
    </div>
</template>
