import { TypeOrmModuleOptions } from '@nestjs/typeorm';


const defaultDatabaseOptions = {
  // logger: new DatabaseLogger(),
  synchronize: process.env.DB_SYNCHRONIZE === 'true' || false,
  migrationsTableName: 'migrations',
};

export const CommonTypeOrmModuleOptions: TypeOrmModuleOptions = {
  ...defaultDatabaseOptions,
  // name: 'commonConnection',
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_DATABASE || '',
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  entities: ['dist/**/*.entity.js', '**/*.entity.js'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize:true,
  autoLoadEntities:false
};

// export class CommonTypeOrmModuleOptions implements TypeOrmModuleOptions {

  
//   ...defaultDatabaseOptions,
//   // name: 'commonConnection',
//   type: 'postgres',
//   host: process.env.DB_HOST || 'localhost',
//   port: parseInt(process.env.DB_PORT) || 5432,
//   database: process.env.DB_DATABASE || '',
//   username: process.env.DB_USERNAME || '',
//   password: process.env.DB_PASSWORD || '',
//   entities: ['dist/**/*.entity.js', '**/*.entity.js'],
//   migrations: ['dist/migrations/*{.ts,.js}'],
//   synchronize:true,
//   autoLoadEntities:false
// };
