import { Injectable, Logger } from '@nestjs/common';
import { Command, Positional } from 'nestjs-command';

@Injectable()
export class HelloCommand {
  @Command({ command: 'hello <name>', describe: 'Example command' })
  run(@Positional({ name: 'name', type: 'string' }) name: string) {
    Logger.log(`Hello ${name}!`, HelloCommand.name);
  }
}
