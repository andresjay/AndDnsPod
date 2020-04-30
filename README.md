# AndDnsPod
基于DNSPod用户API的Node.js动态域名客户端

# Useage
AndDnsPod依赖Node.js的`request`包，确保在使用前已安装：
```
$ npm install request
```

拉取项目
```
$ git clone https://github.com/andresjay/AndDnsPod
```

## Step 1
填写配置，在`config.js`中填入
  * token id （**必填**）：https://console.dnspod.cn/account/token# 中获得的token id；
  * token （**必填**）：https://console.dnspod.cn/account/token# 中获得的token；
  * domain （**必填**）：域名；
  * subdomain （**必填**），即需要绑定的子域名，需要与https://console.dnspod.cn/dns/list 内创建的**A类型**的主机记录名相同；
  * intervalTime： 循环时间，大于0时启用，单位为**分钟**。
  
示例：
```JavaScript
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
```

## Step 2

配置填写完成后，即可直接运行程序，或设定循环并在后台挂起:
```
$ node AndDnsPod.js
```
