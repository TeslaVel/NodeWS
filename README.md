# NodeScript
MC project made on nodejs using sequelize and postgres

# Database
## Create Database
```sh
npx sequelize-cli db:create
```

## Drop Database
```sh
npx sequelize-cli db:drop
```

# Run Migrations
## up
```sh
npx sequelize-cli db:migrate
```

## down
```sh
npx sequelize-cli db:migrate:undo:all
```

# Run Seeds
## up
```sh
npx sequelize-cli db:seed:all
```

## down
```sh
npx sequelize-cli db:seed:undo:all
```

# Run Project
```sh
 npx ts-node app.ts
```

# Run in local
npm install -g nodemon

```sh
 nodemon --exec ts-node app.ts
```
