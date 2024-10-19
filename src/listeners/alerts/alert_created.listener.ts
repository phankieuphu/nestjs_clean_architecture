import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventConstant } from '../../constant/event.constant';
import { NotificationAutoAlertService } from '../../services';
import { AlertCreatedEvent } from '../../events/alerts/alert_created.event';

@Injectable()
export class AlertCreatedListener {
  constructor(
    private notificationAutoAlertService: NotificationAutoAlertService,
  ) {}

  @OnEvent(EventConstant.ALERT_CREATED)
  async handleAlertCreatedEvent(event: AlertCreatedEvent) {
    await this.notificationAutoAlertService.notificationAutoAlert(
      event.alertId,
      event.disasterType,
      event.areaCodes,
    );
  }
}
