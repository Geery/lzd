const fs = require('fs')
const path = require('path')
const babelParser = require('@babel/parser') //生成抽象语法树
const traverse = require("@babel/traverse").default;
const { transformFromAst } = require('@babel/core')
module.exports = class Webpack {
    constructor(options) {
        const { entry, output } = options;
        this.entry = entry;
        this.output = output;
    }
    run() {
        this.parse(this.entry.main)
    }
    parse(entryFile) {
        // 分析依赖和内容
        const contents = fs.readFileSync(entryFile, 'utf-8')
        const Ast = babelParser.parse(contents, {
            sourceType: 'module'
        })
        const dependencies = {};
        traverse(Ast, {
            ImportDeclaration({ node }) {
                //分析出引⼊模块，在项⽬中的路径
                const newPath = './' + path.join(path.dirname(entryFile), node.source.value)
                dependencies[node.source.value] = newPath;
            }
        });
        const { code } = transformFromAst(Ast, null, {
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
}