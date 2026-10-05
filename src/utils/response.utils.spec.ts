import { Response } from 'express';
import { ResponseUtils } from './response.utils';

const createResponse = () => {
  const res = {
    req: { originalUrl: '/v1/test' },
    setHeader: vi.fn(),
    status: vi.fn(),
    json: vi.fn(),
    send: vi.fn(),
  };
  res.status.mockReturnValue(res);
  return res;
};

describe('ResponseUtils', () => {
  const utils = new ResponseUtils();

  it('success returns data and meta', () => {
    const res = createResponse();
    utils.success(
      { data: [1], meta: { total: 1 } },
      res as unknown as Response,
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: [1], meta: { total: 1 } });
  });

  it('success with 204 sends no body', () => {
    const res = createResponse();
    utils.success({ status_code: 204 }, res as unknown as Response);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalledWith();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('failed defaults to 400 with a status message', () => {
    const res = createResponse();
    utils.failed({}, res as unknown as Response);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status_code: 400,
      message: 'Bad Request',
    });
  });

  it('successWithScim uses the scim content type', () => {
    const res = createResponse();
    utils.successWithScim({ data: { id: 1 } }, res as unknown as Response);
    expect(res.setHeader).toHaveBeenCalledWith(
      'Content-Type',
      'application/scim+json',
    );
    expect(res.json).toHaveBeenCalledWith({ id: 1 });
  });
});
