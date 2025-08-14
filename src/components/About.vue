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
    <div class="grid grid-cols-5 gap-2 bg-base-100 m-2 md:m-8 animate-fade-in">
        <figure
            v-if="md_show"
            class="col-span-1 flex justify-center items-center"
        >
            <img
                src="~/assets/img/logo_circle.png"
                class="max-w-30 m-0 ml-5"
                alt="logo"
            />
        </figure>
        <div class="col-span-5 md:col-span-4 p-0 m-10">
            <section class="pb-10">
                <div class="card bg-base-100 shadow-md p-5">
                    <div class="card-title">FM-MiNITとは？</div>
                    <div class="prose">
                        <div>
                            FM-MiNITは、日本工業大学文化団体所属の
                            <ul class="list-disc pl-5">
                                <li>放送研究部</li>
                                <li>無線部</li>
                            </ul>
                            の有志が集まり、発足したラジオ団体です。
                            日工大生をターゲットとし、ラジオを通じて娯楽と情報を届けることで、より良い大学生活にしてもらうという理念のもと、活動を推進しています。
                        </div>
                    </div>
                </div>
            </section>
            <section class="pb-10">
                <div class="card bg-base-100 shadow-md p-5">
                    <div class="card-title">活動方針</div>
                    <div class="prose">
                        <div>
                            <ul class="list-disc pl-5">
                                <li>大学公式ラジオを目指す</li>
                                <li>放送倫理、社会規範を遵守した番組の構築</li>
                                <li>大学ラジオとしてふさわしい活動</li>
                            </ul>
                            毎週火曜日放送のラジオ収録（大型休暇を除く）やイベント時の校内放送にて、上記理念の実現に向け活動しています。
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div class="card bg-base-100 shadow-md p-5">
                    <div class="card-title">主な活動内容</div>
                    <div class="prose">
                        <div>
                            <ul class="list-disc pl-5">
                                <li>
                                    毎週火曜日のラジオ収録（大型休暇を除く）
                                </li>
                                <li>学内イベントでの放送</li>
                                <li>学内外への情報発信</li>
                            </ul>
                            これらの活動を通じて日工大生にとって有意義な情報を提供し、コミュニティの活性化を図っています。
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
