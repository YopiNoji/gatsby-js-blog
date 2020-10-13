---
title: "Git Commit を検知して ESLint や Prettier を自動で走らせてコードの品質を保つ方法"
cover: "2020-05-10-use-lint-tool-automatically-before-git-commit/header.png"
category: "Tech"
date: "2020-05-10"
slug: "use-lint-tool-automatically-before-git-commit"
tags:
  - npm
  - ESLint
  - Prettier
  - Git
---

Git で管理されているソースコードで、`git commit` する前に自動で ESLint や Prettier を走らせる方法についての記事です。

今回は比較的使われている ESLint と Prettier を例にあげていますが、stylelint や textlint など他のツールでも使うことは可能です。

総じて、これらのコードフォーマッターを `git commit` するタイミングに自動で走らせることで、綺麗で読みやすいコードを保とうという寸法ですね。

## 前提

以下に該当するプロジェクトが対象になります。

- Node.js が動作する環境であること
- npm または yarn を用いてパッケージ管理を行っているプロジェクトであること
- Git でソースコードを管理しているプロジェクトであること

## 利用する npm パッケージについて

### husky

Git コマンドをフック（検知して捕まえる）するためのパッケージです。

`git commit` と `git push` をフックできます。

もともとは、Git コマンドが使用された段階で、自動で単体テストを走らせる目的で作られたようですね。

https://www.npmjs.com/package/husky

### lint-staged

ステージングされた Git ファイルに対して Lint ツールを実行するためのパッケージです。

ステージングされた Git ファイルというのは、要するに `git add` された状態のファイルのことですね。  
変更されたファイルにだけ効率良く Lint ツールを実行できるということです。

https://www.npmjs.com/package/lint-staged

### eslint

フロントエンド界隈で知らない者はいない（と思われる）超有名 Lint ツールです。

設定項目の数が膨大なことでも有名であります。
メソッドの行数や、ログ出力の制限など設定できる項目は多岐に渡ります。

上手く活用することで、比較的綺麗なソースコードを書けるようになります。  
（なお、上手く設定する方法についての解説は今回省きます）

https://www.npmjs.com/package/eslint

### prettier

有名なコードフォーマッターです。  
VSCode のプラグインが存在します。

JavaScript や TypeScript だけでなく、JSON、CSS、YAML など多種多様なファイルに対応しています。

ESlint と組み合わせて使う場合、ESLint 側にプラグインを追加してあげることで上手く共存できるようになります。  
（なお、今回はその解説は省きます）

https://www.npmjs.com/package/prettier

## git commit を検知して、Lint ツールを自動で動かしてみる

今回は npm を使います。

ひとまず、使用するパッケージをインストールするところからはじめます。  
ESLint や Prettier がすでに導入済みであればインストールコマンドから省いてください。

```bash
npm i husky lint-staged eslint prettier -D
```

次に、`package.json` に以下のような記述を追加します。  
対象となるファイルの拡張子は対象のプロジェクトに応じて変えてください。

```json
{
  // 中略 //
  // Omitted //
  "scripts": {
    "eslint:format": "eslint --ext .js,.ts,.vue,.jsx,.tsx --ignore-path .gitignore .",
    "prettier:format": "prettier '**/*.{js,jsx,ts,tsx,vue}' --write"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.js": ["prettier --write", "eslint --fix"],
    "*.ts": ["prettier --write", "eslint --fix"],
    "*.jsx": ["prettier --write", "eslint --fix"],
    "*.tsx": ["prettier --write", "eslint --fix"],
    "*.vue": ["prettier --write", "eslint --fix"],
    "*.json": ["prettier --write"]
  }
  // 中略 //
  // Omitted //
}
```

あとは、試しに動作確認するだけです。

```bash
git add .
git commit -m "Add automation lint module"
```

以下のように husky と lint-staged が動いてくれれば完了です。

```bash
husky > pre-commit (node v12.16.1)
  ✔ Preparing...
  ✔ Running tasks...
  ✔ Applying modifications...
  ✔ Cleaning up...
🔍  Finding changed files since git revision 8c2a1d5.
🎯  Found 1 changed file.
✍️  Fixing up content/2020-04-30-quick-build-graphql-server-by-hasura-with-nuxt-js/index.md.
✅  Everything is awesome!
[master 904e41a] Modify content
 1 file changed, 2 insertions(+), 2 deletions(-)
```
