import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { MaintenanceEmailService } from 'src/services';

@Injectable()
export class SendMaintenanceEmailCommand {
  constructor(
    private readonly maintenanceEmailService: MaintenanceEmailService,
  ) {}

  @Command({
    command: 'send-maintenance-emails',
    describe: 'Send maintenance emails',
  })
  async run(): Promise<void> {
    await this.maintenanceEmailService.sendMaintenanceEmails();
    return;
  }
}
