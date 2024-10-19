import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventConstant } from '../../constant/event.constant';
import { NotificationAdminService } from '../../services';
import { EmergencyWarningMetConditionEvent } from '../../events/disasters/emergency_warning_met_condition.event';

@Injectable()
export class EmergencyWarningMetConditionListener {
  constructor(private notificationAdminService: NotificationAdminService) {}

  @OnEvent(EventConstant.EMERGENCY_WARNING_MET_CONDITION)
  async handleEmergencyWarningMetConditionEvent(
    event: EmergencyWarningMetConditionEvent,
  ) {
    await this.notificationAdminService.notificationToAdmin(event.result);
  }
}
