
FROM node:18.17.0-alpine

WORKDIR /app

# package.jsonとyarn.lockファイルをコピー
COPY package.json ./

# 依存関係をインストール
RUN yarn install

# アプリケーションのソースコードをコピー
COPY . .

# アプリケーションが使用するポートを開放
EXPOSE 3000

# アプリケーションの起動コマンド
CMD ["yarn", "dev"]
