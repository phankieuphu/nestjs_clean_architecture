import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventConstant } from '../../constant/event.constant';
import { AlertService } from '../../services';
import { EmergencyWarningCreatedEvent } from '../../events/disasters/emergency_warning_created.event';

@Injectable()
export class EmergencyWarningCreatedListener {
  constructor(private alertService: AlertService) {}

  @OnEvent(EventConstant.EMERGENCY_WARNING_CREATED)
  async handleEmergencyWarningCreatedEvent(
    event: EmergencyWarningCreatedEvent,
  ) {
    await this.alertService.checkEmergencyWarningConditions(
      event.emergencyWarning,
    );
  }
}
