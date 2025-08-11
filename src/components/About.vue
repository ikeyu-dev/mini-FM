<template>
    <div class="card lg:card-side bg-base-100 shadow-sm m-5">
        <figure class="w-64">
            <img
                src="~/assets/img/logo_circle.png"
                class="p-10"
                alt="logo"
            />
        </figure>
        <div class="card-body">
            <h2 class="card-title">FM-MiNITとは？</h2>
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
                <p>
                    活動方針として、大学公式ラジオを目指し、放送倫理、社会規範を遵守した番組の構築を図り、大学ラジオとしてふさわしい活動に努めています。
                </p>
                <p>
                    主な活動内容としまして、毎週火曜日放送のラジオ収録（大型休暇を除く）、イベント時の校内放送にて、上記理念の実現に向け活動しています。
                </p>
            </div>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Watch</button>
            </div>
        </div>
    </div>
</template>

<style>
@keyframes fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.animate-fade-in {
    animation: fade-in 0.7s ease-in-out forwards;
}
</style>
