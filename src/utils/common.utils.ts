import { Injectable } from '@nestjs/common';
import moment from 'moment';
@Injectable()
export class CommonUtils {
  constructor() {}

  generateString(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  getType(p): string {
    if (Array.isArray(p)) return 'array';
    else if (typeof p == 'string') return 'string';
    else if (p != null && typeof p == 'object') return 'object';
    else if (typeof p == 'number') return 'number';
    return 'other';
  }
  // example value (15,"08:00","21:00")
  renderTimes(
    range: number,
    time_start: string,
    time_end: string,
  ): Array<string> {
    const mtimeStart = moment(time_start, 'HH:mm');
    const mtimeEnd = moment(time_end, 'HH:mm');
    const full_step = [];

    const time_step = mtimeStart.clone().startOf('minute');

    while (time_step.isBefore(mtimeEnd)) {
      full_step.push(time_step.format('HH:mm'));
      time_step.add(range, 'minutes');
    }
    return full_step;
  }

  public checkIsInArray(arr: Array<any>, value: any): boolean {
    return arr.includes(value);
  }

  checkArrayIsUnique(arr: Array<any>): boolean {
    return arr.length === new Set(arr).size;
  }

  convertConstantToKeyValueObject(constant) {
    const options = constant.TYPES.map((type) => {
      const key = Object.keys(type)[0];
      return {
        name: type[key],
        value: constant.KEY_TYPES[key],
      };
    });
    return options;
  }
}
