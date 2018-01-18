import fetch from 'node-fetch'
import {ProxyHandler} from 'aws-lambda'
import {res200, res400, res500} from '../../lib/response'
import {slack} from '../../package.json'

function createSender(channel): ProxyHandler {
  return  async (event, context, cb) => {
    try {
      const {text} = JSON.parse(event.body)

      try {
        await fetch(channel, {
          headers: {'Content-Type': 'application/json'},
          method : 'POST',
          body   : JSON.stringify({text, mrkdwn: true})
        })
        return cb(null, res200({sent: true}))
      } catch(ex) {
        return cb(null, res500(ex))
      }
    } catch (ex) {
      cb(null, res400('check body.text'))
    }
  }
}

export const labs = createSender(slack.channel.labs)
