# Todo App - Claude Code Actions Sample

Claude Code Actionsを試すためのシンプルなTodoアプリケーションです。

## 機能

- ✅ Todoの作成・編集・削除
- ✅ 完了/未完了の切り替え
- ✅ SQLiteでデータ永続化
- ✅ RESTful API
- ✅ シンプルなフロントエンド

## 技術スタック

- **Node.js** 18+
- **Express** - Webフレームワーク
- **better-sqlite3** - SQLiteデータベース
- **バニラJavaScript** - フロントエンド

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. サーバーの起動

```bash
# 通常起動
npm start

# 開発モード（ファイル変更時に自動再起動）
npm run dev
```

### 3. ブラウザでアクセス

```
http://localhost:3000
```

## テスト

```bash
npm test
```

## API エンドポイント

### Todoの取得

```bash
GET /api/todos
```

### Todoの作成

```bash
POST /api/todos
Content-Type: application/json

{
  "title": "買い物に行く"
}
```

### Todoの更新

```bash
PUT /api/todos/:id
Content-Type: application/json

{
  "title": "更新されたタイトル",
  "completed": true
}
```

### Todoの削除

```bash
DELETE /api/todos/:id
```

## Claude Code Actions の使い方

このプロジェクトは、GitHub上でClaude Code Actionsを試すために設計されています。

### 1. GitHubリポジトリの作成

```bash
# GitHubに新しいリポジトリを作成してプッシュ
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Claude Code Actionsのセットアップ

以下のいずれかの方法でセットアップできます：

#### 方法A: Claude Code CLIを使用（推奨）

```bash
/install-github-app
```

このコマンドで自動的に：
- Claude GitHub Appのインストール
- ANTHROPIC_API_KEYの設定
- ワークフローの設定

が行われます。

#### 方法B: 手動セットアップ

1. **Claude GitHub Appをインストール**: https://github.com/apps/claude
2. **APIキーを設定**: リポジトリの Settings > Secrets and variables > Actions で `ANTHROPIC_API_KEY` を追加
3. **ワークフローファイルは既に `.github/workflows/` に含まれています**

### 3. Claude Code Actionsを試してみる

#### Issue/PRコメントで機能追加を依頼

GitHubのIssueまたはPRのコメントで：

```
@claude この機能を追加してください：
- Todoに優先度（高/中/低）を設定できるようにする
- 優先度でソートできるようにする
```

#### 自動コードレビュー

新しいPRを作成すると、自動的にコードレビューが実行されます（`.github/workflows/code-review.yml`）。

#### カスタムプロンプトで実行

```
@claude /review
@claude このコードのパフォーマンスを改善してください
@claude セキュリティ上の問題がないかチェックしてください
```

## プロジェクト構成

```
claude-code-actions-sample/
├── .github/
│   └── workflows/
│       ├── claude.yml           # @claudeメンションでトリガー
│       ├── code-review.yml      # PR作成時の自動レビュー
│       └── run-tests.yml        # テスト実行
├── public/
│   └── index.html               # フロントエンド
├── database.js                  # SQLite設定
├── server.js                    # Expressサーバー
├── test.js                      # テストコード
├── CLAUDE.md                    # Claudeのための規約・ガイドライン
├── package.json
└── README.md
```

## 機能追加のアイデア

Claude Code Actionsを試すために、以下のような機能追加をIssueで依頼してみてください：

- [ ] Todoの優先度設定（高/中/低）
- [ ] Todoの期限設定
- [ ] カテゴリ/タグ機能
- [ ] 検索・フィルタリング機能
- [ ] ダークモード対応
- [ ] ユーザー認証
- [ ] Todoのソート機能（日付順、優先度順など）
- [ ] 完了したTodoのアーカイブ機能
- [ ] Todoの並び替え（ドラッグ&ドロップ）

## CLAUDE.md について

`CLAUDE.md` ファイルには、Claude Code Actionsがコードを書く際に従うべきルールやガイドラインが記載されています：

- コーディング規約
- APIデザインの方針
- セキュリティ要件
- コードレビュー基準

Claude Code Actionsは、このファイルを参照してプロジェクトの規約に沿ったコードを生成します。

## 参考リンク

- [Claude Code Actions公式ドキュメント](https://code.claude.com/docs/en/github-actions.md)
- [Claude Code Actions リポジトリ](https://github.com/anthropics/claude-code-action)
