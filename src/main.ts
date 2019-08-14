import * as core from '@actions/core'
import * as github from '@actions/github'
import { IncomingWebhook } from '@slack/webhook'
import { inspect } from 'util'

export async function run(url, message) {
  try {
    const webhook = new IncomingWebhook(url, {
      icon_emoji: ':bowtie:',
    })

    const response = await webhook.send({
      text: message,
    })

    let stdResponse = false
    if (response.text == '1' || response.text === 'ok' )  stdResponse = true
    return stdResponse

  } catch (error) {
    core.error(error)
    core.setFailed(error.message)
  }
}

if (core.getInput('debug') === 'true') core.debug(inspect(github.context, {showHidden: false, depth: null}))

// if (github.context.payload){
//   run(
//     core.getInput('webhook'),
//     core.getInput('message')
//   )
// }

