// User config

// *Necessary*
// 1. Token: input your token id and token from https://console.dnspod.cn/account/token#
const tokenId = '123456'
const token = '1a2b3c4d5e6f7g'

// *Necessary*
// 2. Domain: input your Domain and A type subdomain from https://console.dnspod.cn/dns/list
const domain = 'hello.world'
const subDomain = 'subdomain'

// 3. Interval: set interval if needed. Equal or greater than 0 strated. Units: minutes.
const intervalTime = 0

module.exports = {tokenId, token, domain, subDomain, intervalTime}