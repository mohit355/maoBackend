connect to postgres :

connect to a database: psql -U mao -d mohit355
show tables : \dt


migration: npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string