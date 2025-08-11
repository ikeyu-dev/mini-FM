<template>
    <div
        class="card grid grid-cols-5 gap-2 bg-base-100 shadow-sm m-5 animate-fade-in"
    >
        <figure
            class="col-span-5 md:col-span-1 flex justify-center items-center"
        >
            <img
                src="~/assets/img/logo_circle.png"
                class="max-w-30"
                alt="logo"
            />
        </figure>
        <div class="card-body col-span-5 md:col-span-4 md:pl-0">
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
            <div class="card-title">活動方針</div>
            <div class="prose">
                <div>
                    <ul class="list-disc pl-5">
                        <li>大学公式ラジオを目指す</li>
                        <li>放送倫理、社会規範を遵守した番組の構築</li>
                        <li>大学ラジオとしてふさわしい活動</li>
                    </ul>
                    主な活動内容としまして、毎週火曜日放送のラジオ収録（大型休暇を除く）、イベント時の校内放送にて、上記理念の実現に向け活動しています。
                </div>
            </div>
            <div class="card-title">主な活動内容</div>
            <div class="prose">
                <div>
                    <ul class="list-disc pl-5">
                        <li>毎週火曜日のラジオ収録（大型休暇を除く）</li>
                        <li>学内イベントでの放送</li>
                        <li>学内外への情報発信</li>
                    </ul>
                    これらの活動を通じて、日工大生にとって有意義な情報を提供し、コミュニティの活性化を図っています。
                </div>
            </div>
            <nuxt-link
                class="card-actions justify-end"
                to="#episodes"
            >
                <button class="btn btn-primary">Watch</button>
            </nuxt-link>
        </div>
    </div>
</template>
