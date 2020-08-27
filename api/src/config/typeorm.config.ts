import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();

// SYNC env variable needs to be converted to a boolean value
// when it is being used to configure TypeORM
const sync = (syncOption: string): boolean => {
  if (syncOption === 'true') return true;
  else return false;
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: sync(process.env.SYNC),
};
