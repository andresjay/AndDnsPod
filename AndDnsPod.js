/* 
  AndDnsPod v0.1
  Dynamic DNS using DNSPod API by Node.js
  Original by AndresJay<jianqingze@163.com>
*/

var request = require('request')
var config = require('./config.js')

var andToken = `${config.tokenId},${config.token}`
var recordId, currentIp, mainInterval

function getRecordId () {
  return new Promise ((resolve, reject) => {
    request.post({
      url: 'https://dnsapi.cn/Record.List',
      form: {
        login_token: andToken,
        format: 'json',
        domain: config.domain
      }
    }, (err, res, body) => {
      if (!err && !!body) {
        let targetDomain = JSON.parse(body).records.find(item => {
          return item.name === config.subDomain
        })
        recordId = targetDomain.id
        resolve()
      } else {
        reject(err)
      }   
    })
  })
}

function updateIpAdd (newIp) {
  if (!!recordId) { // Record ID existed.
    request.post({
      url: 'https://dnsapi.cn/Record.Modify',
      form: {
        login_token: andToken,
        format: 'json',
        domain: config.domain,
        record_id: recordId,
        sub_domain: config.subDomain,
        record_type: 'A',
        record_line: '默认',
        value: newIp
      }
    }, (err, res, body) => {
      if (JSON.parse(body.status.code) == 1) {
        currentIp = newIp // update current ip
        console.log(JSON.parse(body).status.message)
      } else {
        console.log(err)
      }
    })
  } else {
    getRecordId().then(() => {
      updateIpAdd(newIp)
    }).catch((err) => {
      console.log(err)
    })
  }
}

function getIp () {
  return new Promise ((resolve, reject) => {
    request('http://pv.sohu.com/cityjson', (error, response, body) => {
      if (!error && response.statusCode == 200) {
        let json = body.slice(19, -1) // Cut the bullshit
        let ip = JSON.parse(json).cip
        resolve(ip)
      } else {
        reject(error)
      }
    })
  })	
}

function main () {
  if (config) {
    getIp().then(newIp => {
      if (newIp != currentIp) { // IP has changed.
        updateIpAdd(newIp)
      }
    }).catch(err => {
      console.log(err)
    })
  } else {
    console.log('Lack of core config file.')
    window.clearInterval(mainInterval)
  }
}

!!config.intervalTime&&config.intervalTime>0?mainInterval=setInterval(main(), config.intervalTime*60000):main()