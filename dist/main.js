;(() => {
   // 声明模块定义
  var modules = {
    // key 是模块的 ID，不管什么模块，它的模块ID都是相对于项目根目录的相对路径
    // COMMONJS的文件，在webpack打包之后都是 common.js
    './src/title.js': (module, exports, require) => { // module 代表当前的模块 exports = module.exports 代表当前模块的导出对象 require 加载别的模块的加载方法
      module.exports = 'title'
    }
  }
  // 如果模块加载过了就不需要再加载了
  var cache = {};
  function require(moduleId) {
    // 如果缓存中有此模块对应的模块数据
    if (cache[moduleId]) {
      // 直接返回缓存的结果
      return cache[moduleId].exports
    }

    // 创建一个新的模块
    var module = cache[moduleId] = {
      exports: {}
    }

    // 执行模块定义方法，给导出对象赋值
    modules[moduleId](module, module.exports, require);

    // 返回导出对象
    return module.exports;
  }

  let title = require('./src/title.js')
  console.log(title)
})()