# dohack-team1

## setup

### 環境変数

環境変数とは，OS やプログラムが動作する際に参照される値です．データベースの接続情報や API キー等の実行環境に依存する値や機密情報を`.env`に保存し Git 管理から除外することで，不用意に公開されるリスクを減らします．

以下の 2 つのファイルを作成し，Discord で受け取った環境変数をコピペしてください．

- `.env.local`（リポジトリのルートディレクトリ配下）
- `client/.env`（`client/`配下）

### client

```sh
cd client
pnpm i
pnpm dev
```

## DB
initsplを変更-> 
docker起動確認
cargo make up
cargo make sync-schema

```sh
cargo make sync-schema
```

## 自由欄

### メモ(rin 用)

`http://localhost:3000/debug/rin`
