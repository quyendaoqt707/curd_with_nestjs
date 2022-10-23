import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Database, OPEN_CREATE, OPEN_READWRITE } from 'sqlite3';
// import AppDAO from '../db/db';
// import UserRepository from '../db/db';
async function bootstrap() {
  //Connect sqlite db:
  // const connectedDB = new AppDAO('./database.sqlite3');
  // const initTable = new UserRepository(connectedDB);
  //create table:

  const db = new Database('./db/database.sqlite3', OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Connected to the chinook database.');
    }
  });

  //init database
  // const sql = `
  //   CREATE TABLE IF NOT EXISTS projects (
  // 	id INTEGER PRIMARY KEY AUTOINCREMENT,
  // 	name TEXT)`;
  // db.run(sql, (result) => {
  //   console.log(result);
  // });

  const app = await NestFactory.create(AppModule);
  // app.enableCors(); //if not have postman Agent
  await app.listen(3000);
}
bootstrap();
