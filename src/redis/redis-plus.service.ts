import { Injectable } from '@nestjs/common';
import IoRedis from 'ioredis';

@Injectable()
export class RedisPlusService {
  public ioRedis: any;

  constructor() {
    this.ioRedis = new IoRedis({
      port: 6379,
      host: '127.0.0.1',
      // password: '',
      // db: 0
    });
  }

  async getKeys(patter: string): Promise<string[]> {
    return await this.ioRedis.keys(patter);
  }

  // async scanLess(patter: string, timeInSecond: number): Promise<boolean> {
  //   new Promise<boolean>((resolve, rej) => {
  //     resolve(true);
  //   })

  //   // this.ioRedis.scanStream({
  //   //   match: patter,
  //   // }).on('data', (resultKeys: any) => {
  //   //     const res = [];
  //   //     for (var i = 0; i < resultKeys.length; i++) {
  //   //       res.push(resultKeys[i]);
  //   //       return res;
  //   //     }
  //   //   }).on('end', function () {
  //   // });
  // }
}
