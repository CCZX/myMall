# vue-MoreMall

## Setup

```bash
# 后端
cd server && npm i # yarn
# 前端
cd client && npm i # yarn
```

## Generate database

1. 开启 MySQL
2. `server/config/sequelizeBase` 配置数据库
3. 现在数据库创建 `mall` 数据库
4. 将 `server/models/` 下所有文件中的注释去掉
5. 接下来 `run server`

```bash
cd server && npm run start # yarn start
```

生成后记得注释回去

## Run

```bash
# 后端
cd server && npm run start # yarn start
# 前端 - web
cd client && npm run dev # yarn dev
# 前端 - admin
cd client && npm run dev:admin # yarn dev:admin
```
