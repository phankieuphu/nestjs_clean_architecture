import { SESClient } from '@aws-sdk/client-ses';
import { SNSClient } from '@aws-sdk/client-sns';
import { SQSClient } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';

import config from './env.config';

@Injectable()
export class AwsConfig {
  private readonly region: string;
  private readonly accessKeyId: string;
  private readonly secretAccessKey: string;

  private readonly sessionToken: string;

  constructor() {
    this.region = config.AWS.REGION;
    this.accessKeyId = config.AWS.ACCESS_KEY;
    this.secretAccessKey = config.AWS.SECRET_KEY;
    this.sessionToken = config.AWS.SESSION_TOKEN;
  }

  getSESClient(): SESClient {
    if (config.ENV.NODE_ENV !== 'local') {
      return new SESClient();
    }
    return new SESClient({
      region: this.region,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
        sessionToken: this.sessionToken,
      },
    });
  }

  getSQSClient(): SQSClient {
    if (config.ENV.NODE_ENV !== 'local') {
      return new SQSClient();
    }
    return new SQSClient({
      region: this.region,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
        sessionToken: this.sessionToken,
      },
    });
  }
  getSNSClient(): SNSClient {
    if (config.ENV.NODE_ENV !== 'local') {
      return new SNSClient();
    }
    return new SNSClient({
      region: this.region,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
        sessionToken: this.sessionToken,
      },
    });
  }
}
