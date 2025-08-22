# FM-MiNIT 公式ホームページ

本リポジトリでは，FM-MiNIT の公式ホームページのソースコードを管理しています．
ここでは FM-MiNIT の活動内容等については割愛します．

## 依存環境

```json:package.json
"dependencies": {
    "@tailwindcss/vite": "^4.1.11",
    "nuxt": "^3.17.6",
    "puppeteer": "^24.14.0",
    "vue": "^3.5.17",
    "vue-router": "^4.5.1"
},
"devDependencies": {
    "daisyui": "^5.0.46",
    "tailwindcss": "^4.1.12"
}
```

clone する際は `src/`にて

```bash
npm install
```

を実行してください．

## 開発環境の起動

```bash
npm run dev
```

を `src/`にて実行してください．

通常，Nuxt.js で開発したアプリはデフォルトではポート 3000 で起動しますが，このリポジトリを clone したコードではポート 4001 で起動します．変更する場合は，`package.json` の `scripts` セクションの `dev` の値を変更してください．

例: 4001 ではなく 3000 で起動したい場合は以下のように変更します．

```json
"scripts": {
    "dev": "nuxt dev --port 4001"
}
```

上記のコードを以下のように変更します．

```json
"scripts": {
    "dev": "nuxt dev --port 3000"
}
```

なお，ポートをはじめとしたネットワークに関する基礎知識はここでは割愛します．

## 過去の放送回一覧について

stand.fm では，`https://stand.fm/episodes/`という固定 URL の部分と`687f8f79732743876e88f727`のような UUID が組み合わさった URL で放送回が公開されます．本ホームページでは，この UUID を`src/composables/episodeList.ts`にて一元管理しています．

```ts
import { type Episodes } from "~/types/episode";

export const episodesId: Episodes[] = [
    { id: "687f8f79732743876e88f727", index: 34 },
    { id: "6877c6bab8e4b65cd57415e8", index: 33 },
    { id: "6845378e769a71d6c7c525a5", index: 32 },
    // その他の放送回が下に続きます．
];
```

この配列における`id`が UUID で，`index`が放送回の番号です．
この配列に要素を追加することで，ホームページ上で表示される過去の放送回一覧に新しい放送回を追加することができます．

UUID の取得は，stand.fm から該当する放送回のページを開き，ブラウザのアドレスバーから行うことができます．例えば、https://stand.fm/episodes/687f8f79732743876e88f727 の場合は，`/episodes/`の後に続く `687f8f79732743876e88f727`という部分が UUID です．
