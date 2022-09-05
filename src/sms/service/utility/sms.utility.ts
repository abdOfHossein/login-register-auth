import axios from "axios";
import SmsConfig from "../../config/sms.config";


import { SmsEnum } from "../../enums/sms.enum"; 


export class SmsUtility {

  constructor() {
  }

  static async  sendSmsIr(mobile : string , pattern : string , inputData : Record<string, any> []){
    const data = {
      op: 'pattern',
      user: SmsConfig.mashhad_host.authorize.user,
      pass: SmsConfig.mashhad_host.authorize.pass,
      fromNum: '3000505',
      toNum: mobile,
      patternCode: pattern,
      inputData: inputData,
    };
    const config = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      url: 'http://ippanel.com/api/select',
    };
    const res = await axios.post('http://ippanel.com/api/select', data, config)
    if (res.data instanceof  Array){
     throw new Error(`${JSON.stringify({section : "sms" , value : SmsEnum.SMS_PROVIDER_HAS_ERROR})}` )
    } else if (res.data=="deny") {
      throw new Error(`${JSON.stringify({section : "sms" , value : SmsEnum.SMS_PROVIDER_CAN_NOT_RUN})}` )
    }
    return  res.data
  }
  async sendSmsGmail() {

  }
}