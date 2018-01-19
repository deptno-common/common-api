import fetch from 'node-fetch'
import {ProxyHandler} from 'aws-lambda'
import {res200, res400, res500} from '../../lib/response'
import {slack} from '../../package.json'

function createSender(channel): ProxyHandler {
  return  async (event, context, cb) => {
    try {
      const body = JSON.stringify({
        ...JSON.parse(event.body),
        mrkdwn: true
      })

      try {
        await fetch(channel, {
          headers: {'Content-Type': 'application/json'},
          method : 'POST',
          body
        })
        handleSuccess(event)
        return cb(null, res200({sent: true}))
      } catch(ex) {
        handleError(event)
        return cb(null, res500(ex))
      }
    } catch (ex) {
      handleError(event)
      cb(null, res400('check body.text'))
    }
  }
}

function handleSuccess(log) {
  console.log('success', new Date())
  console.log(log)
}
function handleError(log) {
  console.error('error', new Date())
  console.error(log)
}

export const labs = createSender(slack.channel.labs)
