import { BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';
import { getListUserSchema } from 'src/dtos/schema/user.schema';
import { JoiValidationPipe } from './joi.pipe';

describe('JoiValidationPipe', () => {
  it('moves pagination fields into meta and applies defaults', () => {
    const pipe = new JoiValidationPipe(getListUserSchema);
    expect(
      pipe.transform({ keyword: 'jo', page: '2' }, { type: 'query' }),
    ).toEqual({
      keyword: 'jo',
      meta: {
        page: 2,
        pageSize: 20,
        orderBy: 'created_at',
        sortOrder: 'DESC',
      },
    });
  });

  it('returns the value without meta when there are no pagination fields', () => {
    const pipe = new JoiValidationPipe(Joi.object({ name: Joi.string() }));
    expect(pipe.transform({ name: 'John' }, { type: 'body' })).toEqual({
      name: 'John',
    });
  });

  it('throws a BadRequestException with field details', () => {
    const pipe = new JoiValidationPipe(
      Joi.object({ name: Joi.string().required() }),
    );
    try {
      pipe.transform({}, { type: 'body' });
      expect.fail('should throw');
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.getResponse().message[0].field).toBe('name');
    }
  });
});
