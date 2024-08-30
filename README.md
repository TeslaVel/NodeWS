# NodeScript
MC project made on nodejs using sequelize and postgres

# Install
```sh
npm install -g nodemon

npm install -g sequelize-cli

npm install sequelize -save
```

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
## UP
### all
```sh
npx sequelize-cli db:migrate
```
### Specific migration
```sh
npx sequelize db:migrate --name XXXXXXXXXXXXXX-create-comments.js
```

## DOWN
```sh
npx sequelize-cli db:migrate:undo:all
```
## Specific migration
```sh
npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-comments.js
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
```sh
 nodemon --exec ts-node app.ts
```
