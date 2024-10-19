import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventConstant } from '../../constant/event.constant';
import { EarthquakeCreatedEvent } from '../../events/disasters/earthquake_created.event';
import { AlertService } from '../../services';

@Injectable()
export class EarthquakeCreatedListener {
  constructor(private alertService: AlertService) {}

  @OnEvent(EventConstant.EARTHQUAKE_CREATED)
  async handleEarthquakeCreatedEvent(event: EarthquakeCreatedEvent) {
    await this.alertService.checkEarthquakeAlertConditions(event.earthquake);
  }
}
