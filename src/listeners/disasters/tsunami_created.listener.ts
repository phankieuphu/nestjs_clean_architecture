import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventConstant } from '../../constant/event.constant';
import { AlertService } from '../../services';
import { TsunamiCreatedEvent } from '../../events/disasters/tsunami_created.event';

@Injectable()
export class TsunamiCreatedListener {
  constructor(private alertService: AlertService) {}

  @OnEvent(EventConstant.TSUNAMI_CREATED)
  async handleTsunamiCreatedEvent(event: TsunamiCreatedEvent) {
    await this.alertService.checkTsunamiAlertConditions(event.tsunami);
  }
}
