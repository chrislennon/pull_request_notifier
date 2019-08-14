import * as core from '@actions/core';
import { post } from 'request-promise-native'

export class SlackClient {
  private readonly notifyMessage: string
  private readonly webhook: string
  private readonly notifyUsername: string

  public constructor(message, webhook) {

    this.notifyMessage =
      (
        core.getInput('message') != ''
      ) ? core.getInput('message') : message;
    this.webhook =
      (
        core.getInput('webhook') != ''
      ) ? core.getInput('webhook') : webhook;

    this.notifyUsername = 'pull_request_notifier_action'
  }

  public async sendMessage() {

    const body = {
      text: this.notifyMessage,
      username: this.notifyUsername,
    };

    const options = {
      url: this.webhook,
      body: body,
      json: true,
      method: 'post',
      headers: {
        'User-Agent': this.notifyUsername,
        'Content-Type': 'application/json',
      }
    }

    return post(options)
      .then(function (body) {
        // POST succeeded...
        return body
      })
      .catch(function (err) {
        // POST failed...
        return new Error(err)
      });
  }
}
