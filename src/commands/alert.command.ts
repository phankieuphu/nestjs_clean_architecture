import { Injectable, Logger } from '@nestjs/common';
import { Command, Positional } from 'nestjs-command';
import { SendAlertService } from 'src/services';

@Injectable()
export class AlertCommand {
  constructor(private readonly sendAlertService: SendAlertService) {}

  @Command({
    command: 'alert:retry <alert_id>',
    describe: 'RUN RETRY ALERT',
  })
  async run(
    @Positional({
      name: 'alert_id',
      describe: 'the alert id',
      type: 'string',
    })
    alert_id: string,
  ): Promise<void> {
    Logger.log('ALERT ID: ', alert_id);
    if (!alert_id) {
      throw new Error('Alert ID is not defined');
    }
    await this.sendAlertService.alertHandler(alert_id);
    return;
  }
}
