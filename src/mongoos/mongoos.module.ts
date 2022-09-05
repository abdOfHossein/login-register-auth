import { DynamicModule, Module } from "@nestjs/common";
import { MongoosService } from './service/mongoos.service';
import  mongoose from "mongoose";

@Module({

})
export class MongooseModule {
  static forRoot(host: string, port: number, dbName: string): DynamicModule {
    return {
      imports: [],
      module: MongooseModule,
      providers: [
        {
          provide: 'DATABASE_CONNECTION',
          useFactory: (): Promise<typeof mongoose> =>
            mongoose.connect(`mongodb://${host}:${port}/${dbName}`),
        },
        MongoosService,
      ],
      exports: [
        {
          provide: 'DATABASE_CONNECTION',
          useFactory: (): Promise<typeof mongoose> =>
            mongoose.connect(`mongodb://${host}:${port}/${dbName}`),
        },
        MongoosService,
      ],
    };
  }
}
