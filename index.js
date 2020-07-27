const http = require('http')
class HelloWorldPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    let array = []
    compiler.hooks.emit.tap('HelloWorldPlugin', (compilation, callback) => {
      compilation.chunks.forEach((chunk) => {
        chunk.files.forEach( (filename) => {
          const regex = /\.js$/
          const regex2 = /rights(:\w+)*/
          if (regex.test(filename)) {
            let source = compilation.assets[filename].source()
            let res = source.match(regex2)
            if (res) {
              array.push(res[0])
            }
          }
        })
      })
      console.log(array);
      const req = http.request({
        hostname: 'nodejs.cn',
        port: 80,
        method: 'POST',
        path: '/upload',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      }, res => {
        res.on('data', chunk => {
          console.log('发送请求');
          
        })
      })
      req.write(JSON.stringify({ msg: 111 }))
      req.end()
    })
  }
}

module.exports = HelloWorldPlugin
