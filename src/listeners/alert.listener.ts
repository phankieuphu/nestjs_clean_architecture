// import { Injectable, Logger } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { OnEvent } from '@nestjs/event-emitter';
// import { EventConstant } from 'src/constant/event.constant';
// import { Alert } from 'src/entities';
// import { SendAlertService } from 'src/services/send_alert.service';

// @Injectable()
// export class AlertListener {
//   constructor(private readonly sendAlertService: SendAlertService) {}
//   @OnEvent(EventConstant.ALERT_CREATED)
//   async handleAlertCreatedEvent(event: Alert) {
//     // get list user with area  code
//     // get message setting
//     // get timeout alert
//     // get sending setting
//     Logger.log(EventConstant.ALERT_CREATED);
//     const configService = new ConfigService();
//     const expire_link = configService.get('EXPIRE_LINK');

//     await this.sendAlertService.alertHandler(event.id);
//     // send queue SQS
//   }
// }
