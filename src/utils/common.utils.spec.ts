import { CommonUtils } from './common.utils';

describe('CommonUtils', () => {
  const utils = new CommonUtils();

  it('generateString returns an alphanumeric string of the given length', () => {
    expect(utils.generateString(12)).toMatch(/^[A-Za-z0-9]{12}$/);
  });

  it('getType detects the value type', () => {
    expect(utils.getType([])).toBe('array');
    expect(utils.getType('a')).toBe('string');
    expect(utils.getType({})).toBe('object');
    expect(utils.getType(1)).toBe('number');
    expect(utils.getType(null)).toBe('other');
  });

  it('renderTimes builds time slots between start and end', () => {
    expect(utils.renderTimes(30, '08:00', '09:30')).toEqual([
      '08:00',
      '08:30',
      '09:00',
    ]);
  });

  it('checks array membership and uniqueness', () => {
    expect(utils.checkIsInArray([1, 2], 2)).toBe(true);
    expect(utils.checkArrayIsUnique([1, 2])).toBe(true);
    expect(utils.checkArrayIsUnique([1, 1])).toBe(false);
  });

  it('convertConstantToKeyValueObject maps TYPES to name/value pairs', () => {
    const constant = {
      TYPES: [{ A: 'Type A' }, { B: 'Type B' }],
      KEY_TYPES: { A: 1, B: 2 },
    };
    expect(utils.convertConstantToKeyValueObject(constant)).toEqual([
      { name: 'Type A', value: 1 },
      { name: 'Type B', value: 2 },
    ]);
  });
});
