const fs = require('fs')
const path = require('path')
const babelParser = require('@babel/parser') //生成抽象语法树
const traverse = require("@babel/traverse").default;
const {
  transformFromAst
} = require('@babel/core')
module.exports = class Webpack {
  constructor(options) {
    const {
      entry,
      output
    } = options;
    this.entry = entry;
    this.output = output;
    this.modules = []
  }
  run() {
    const info = this.parse(this.entry.main)
    this.modules.push(info)
    // 寻找其他依赖模块
    for (let i = 0; i < modules.length; i++) {
      const item = modules[i];
      const {
        dependencies
      } = item;
      if (dependencies) {
        for (const j in dependencies) {
          this.modules.push(this.parse(dependencies[j]))
        }
      }

    }
    const obj = {}
    this.modules.forEach(item => {
      obj[item.entryFile] = {
        dependencies: item.dependencies,
        code: item.code
      }
    })
    this.file(obj)
  }
  parse(entryFile) {
    // 分析依赖和内容
    const contents = fs.readFileSync(entryFile, 'utf-8')
    const Ast = babelParser.parse(contents, {
      sourceType: 'module'
    })
    const dependencies = {};
    traverse(Ast, {
      ImportDeclaration({
        node
      }) {
        //分析出引⼊模块，在项⽬中的路径
        const newPath = './' + path.join(path.dirname(entryFile), node.source.value)
        dependencies[node.source.value] = newPath;
      }
    });
    const {
      code
    } = transformFromAst(Ast, null, {
      presets: ["@babel/preset-env"]
    })
    console.log({
      entryFile,
      dependencies,
      code
    })
    return {
      entryFile,
      dependencies,
      code
    };
  }
  file(code) {
    const outFilePath = path.join(this.output.path, this.output.filename)
    const newCode = JSON.stringify(code)
    const bundle = `(function (graph) {
      function require(module) {
        function localRequire(relativePath) {
          return
          require(graph[module].dependencies[relativePath]);
        }
        var exports = {};
        (function (require, exports, code) {
          eval(code)
        })(localRequire, exports, graph[module].code);
        return exports;
      };
      require('${entry}')
    })($ {newCode})`
    fs.writeFileSync(outFilePath, bundle, 'utf-8')
  }
}
