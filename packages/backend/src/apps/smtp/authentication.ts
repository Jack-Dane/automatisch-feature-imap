import nodemailer from 'nodemailer';
import App from '../../models/app';

export default class Authentication {
  client: any
  connectionData: any
  appData: any

  constructor(connectionData: any) {
    this.client = nodemailer.createTransport({
      host: connectionData.host,
      port: connectionData.port,
      secure: connectionData.useTls,
      auth: {
        user: connectionData.username,
        pass: connectionData.password,
      },
    });

    this.connectionData = connectionData;
    this.appData = App.findOneByKey('smtp');
  }

  async verifyCredentials() {
    await this.client.verify()

    return {
      screenName: this.connectionData.username
    }
  }

  async isStillVerified() {
    try {
      await this.client.verify()
      return true;
    } catch(error) {
      return false
    }
  }
}