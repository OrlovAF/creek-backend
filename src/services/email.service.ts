import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';

const {
  SERVER_EMAIL,
  SERVER_EMAIL_PASSWORD,
  SERVER_EMAIL_SERVICE,
  SERVER_EMAIL_HOST,
  SERVER_EMAIL_PORT,
  TARGET_EMAIL,
  CHART_STORAGE_PATH,
} = process.env;

@Injectable()
export class EmailService {
  /**
   * Sends an email.
   * @param {any} options
   */
  static send(options = {}) {
    const transportOptions: any = {
      auth: {
        user: SERVER_EMAIL,
        pass: SERVER_EMAIL_PASSWORD,
      },
    };
    if (SERVER_EMAIL_SERVICE) {
      transportOptions.service = SERVER_EMAIL_SERVICE;
    } else {
      transportOptions.host = SERVER_EMAIL_HOST;
      transportOptions.port = SERVER_EMAIL_PORT;
    }

    const transporter = nodemailer.createTransport(transportOptions);
    const mailOptions = {
      from: 'FROM ' + SERVER_EMAIL,
      to: TARGET_EMAIL,
    };

    transporter.sendMail({...mailOptions, ...options}, (err, info) => {
      if (err) {
        console.log(err);
      }
    });
  }

  /**
   * Prepares html layout for email and then send email.
   * @param {string} subject
   * @param {string[]} images
   */
  static sendImages({subject, images}) {
    const tagStyle = 'display: block; margin-left: auto; margin-right: auto; width: 80%';
    let html = '';

    images.forEach(name => {
      const image = fs.readFileSync(`${CHART_STORAGE_PATH}${name}`);
      const base64 = new Buffer(image).toString('base64');
      html = html.concat(`<img style="${tagStyle}" src="data:image/png;base64, ${base64}"><br/>`);
    });
    this.send({subject, html});
  }
}