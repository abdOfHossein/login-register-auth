// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { SmsService } from './sms.service';
// import { CreateSmDto } from './dto/create-sm.dto';
// import { UpdateSmDto } from './dto/update-sm.dto';
// import { ApiTags } from '@nestjs/swagger';

// @ApiTags('sms')
// @Controller('sms')
// export class SmsController {
//   constructor(private readonly smsService: SmsService) {}

//   @Post('/forget')
//   sendSms(@Body() createSmDto: CreateSmDto) {
//     console.log(createSmDto);

//     return this.smsService.sendSMS(createSmDto);
//   }

//   @Post()
//   create(@Body() createSmDto: CreateSmDto) {
//     return this.smsService.create(createSmDto);
//   }

//   @Get()
//   findAll() {
//     return this.smsService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.smsService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateSmDto: UpdateSmDto) {
//     return this.smsService.update(+id, updateSmDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.smsService.remove(+id);
//   }
// }

import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSmDto } from './dto/create-sm.dto';
import SmsService from './sms.service';

@ApiTags('sms')
@Controller('sms')
export default class SmsController {
  constructor(
    private readonly smsService: SmsService,
    private readonly dialogflowService: DialogflowService,
  ) {}


  @Post('/forget')
  async conversationHandler(
    @Body() createSmDto: CreateSmDto,
  ) {
   
  return  await this.smsService.sendMessage(createSmDto);

    
  }
}
