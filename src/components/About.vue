<script setup lang="ts">
const md_show = ref<boolean>(true);

const updateVisibility = () => {
    md_show.value = window.innerWidth >= 768;
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
    <div class="bg-gray-950">
        <div class="relative w-full">
            <img
                src="~/assets/img/logo_card.jpeg"
                alt="miniFM logo"
                class="opacity-50 object-cover w-full"
                style="max-width: 100vw; height: auto; max-height: 800px"
            />
            <img
                src="~/assets/img/logo.png"
                alt="miniFM logo"
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100 w-80 md:w-96 animate-fade-in"
                style="filter: drop-shadow(0 0 10px rgba(255, 255, 255, 1))"
            />
        </div>
    </div>
    <div class="card p-3 animate-fade-in pt-32">
        <section class="pb-6">
            <h1 class="card-title text-4xl md:text-5xl md:text-center">
                ABOUT FM-MiNIT
            </h1>
        </section>
        <div class="space-y-8 p-2">
            <section>
                <div class="">
                    <h2 class="text-xl font-semibold text-gray-50 mb-4">
                        FM-MiNITとは？
                    </h2>
                    <p class="text-gray-50 leading-relaxed">
                        FM-MiNITは、日本工業大学文化団体所属の
                    </p>
                    <ul class="list-disc pl-6 text-gray-50 mt-2">
                        <li>放送研究部</li>
                        <li>無線部</li>
                    </ul>
                    <p class="text-gray-50 leading-relaxed mt-4">
                        の有志が集まり、発足したラジオ団体です。
                        日工大生をターゲットとし、ラジオを通じて娯楽と情報を届けることで、より良い大学生活にしてもらうという理念のもと、活動を推進しています。
                    </p>
                </div>
            </section>
            <section>
                <div class="">
                    <h2 class="text-xl font-semibold text-gray-50 mb-4">
                        活動方針
                    </h2>
                    <ul class="list-disc pl-6 text-gray-50">
                        <li>大学公式ラジオを目指す</li>
                        <li>放送倫理、社会規範を遵守した番組の構築</li>
                        <li>大学ラジオとしてふさわしい活動</li>
                    </ul>
                    <p class="text-gray-50 leading-relaxed mt-4">
                        毎週火曜日放送のラジオ収録（大型休暇を除く）やイベント時の校内放送にて、上記理念の実現に向け活動しています。
                    </p>
                </div>
            </section>
            <section>
                <div class="">
                    <h2 class="text-xl font-semibold text-gray-50 mb-4">
                        主な活動内容
                    </h2>
                    <ul class="list-disc pl-6 text-gray-50">
                        <li>毎週火曜日のラジオ収録（大型休暇を除く）</li>
                        <li>学内イベントでの放送</li>
                        <li>学内外への情報発信</li>
                    </ul>
                    <p class="text-gray-50 leading-relaxed mt-4">
                        これらの活動を通じて日工大生にとって有意義な情報を提供し、コミュニティの活性化を図っています。
                    </p>
                </div>
            </section>
        </div>
    </div>
</template>
