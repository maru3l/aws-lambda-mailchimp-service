import Mailchimp from 'mailchimp-api-v3';
import Slack from 'node-slack';
import MD5 from 'md5.js';
import response from './libs/response';

const slack = new Slack(process.env.SLACK_HOOKS_URL);
const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);

// eslint-disable-next-line import/prefer-default-export
export const subscribe = (event, context, callback) => {
  if (event.httpMethod === 'OPTIONS') callback(null, response(200, ''));

  const data = JSON.parse(event.body);
  const emailAddress = data.email;
  const emailMD5 = new MD5().update(emailAddress).digest('hex');

  mailchimp.put(`lists/${process.env.MAILCHIMP_LIST_ID}/members/${emailMD5}`, { email_address: emailAddress, status: 'pending' })
    .then((res) => {
      console.log(res);
      callback(null, response(200, { status: 'success' }));
    })
    .catch((error) => {
      if (error.title === 'Member Exists') {
        console.log(`${error.status} : ${error.detail};`);
        slack.send({ text: error.detail });
        callback(null, response(400, { status: 'error', message: 'member exists' }));
      } else {
        console.error(error);
        slack.send({ text: error.detail });
        callback(null, response(500, { status: 'error', message: 'undefined' }));
      }
    });
};
