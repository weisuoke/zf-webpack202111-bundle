var modules = {
  './src/title.js': (module, exports, require) => {
    // 一旦 webpack 检测到你的代码里有 export 和 import 关键字，它就认为这是一个 ES Module
    // ES 模块转换成 COMMONJS 之后有哪些不一样的地方？
    // exports.__esModule=true 你可以通过它来判断转换前是不是 ES Module
    require.r(exports)
    // ES 模块默认导出 export default 会挂载到 exports.default 上， age 会挂载到 exports.age 上
    require.d(exports, {
      default: () => DEFAULT_EXPORT,
      age: () => age
    })

    const DEFAULT_EXPORT = 'title_name';
    const age = 'title_age'
  }
}

var cache = {};
function require(moduleId) {
  var cachedModule = cache[moduleId]
  if (cachedModule !== undefined) {
    return cachedModule.exports;
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

require.d = (exports, definition) => {
  for (var key in definition) {
    Object.defineProperty(exports, key, { get: definition[key] })
  }
}

require.r = (exports) => {
  // 表示这个 exports 是一个 ES 模块的导出对象 [object Module]
  Object.defineProperty(exports, Symbol.toStringTag, {value: 'Module'});
  // exports.__esModule = true
  Object.defineProperty(exports, '__esModule', {value: true})
}

let title = require('./src/title.js');
console.log(title.default)
console.log(title.age)
