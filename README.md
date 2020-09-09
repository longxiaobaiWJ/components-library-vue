## 1.cli-service-global

```shell
npm install -g @vue/cli-service-global # 快速进行原型开发

# 通过vue serve 直接运行组件，若不指定参数，默认以当前目录下: main.js、index.js、App.vue、app.vue 为入口文件
vue serve .\src\App.vue
```



## 2.async-validator

```shell
npm install --save-dev async-validator
# https://www.cnblogs.com/wozho/p/10955525.html
```



## 3.Monorepo

```shell
# 一个项目仓库中管理多个模块/包，即多组件放置在同一个子目录下
# 结合yarn workspaces使用
```



## 4.Storybook

Storybook 是 UI 组件的开发环境，它允许开发者浏览组件库，查看每个组件的不同状态，**以及交互地开发和测试组件**;

Storybook是一个开源工具，用于独立开发React、Vue和Angular的UI组件。它能有组织和高效地构建UI组件;

Storybook 在 app 之外运行，这允许开发者**独立地**开发 UI 组件，这可以提高组件的重用性、可测试性和开发速度。所以可以快速构建，而不必担心应用程序特定的依赖关系;

### 1.安装依赖

```shell
# https://storybook.js.org/docs/react/get-started/install
# 在现有项目的根目录中运行此命令:
npx sb init # npx sb init --type <type>
npm run storybook

# 新建项目，并指定vue框架
npx -p @storybook/cli sb init --type vue
yarn add vue --save
yarn add vue-loader vue-template-compiler --dev


# 新建项目，后续编码，记录详见components-storybook目录
mkdir components-storybook 
cd components-storybook 
npx -p @storybook/cli sb init --type vue
yarn storybook

# 在现有项目中集成Storybook操作
npx sb init --type vue
yarn storybook
```



### 2.使用说明

```javascript
// 在现有项目中集成Storybook, 编码示例 ---- /src/stoties/App.stories.js
import App from '../App.vue';

export default {
  title: 'Example/App',
  component: App,
  args: {
    // 参数传递.
  },
  argTypes: { onClick: { action: 'clicked' } }, // 事件触发类型
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { App },
    template: '<app :source="source"/>',
});

export const Components = Template.bind({});
Components.args = {
    source: "This is Params Example" // 
};


// Storybook入口文件 --- .storybook/main.js:
module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ]
}

```



## 5.yarn workspaces

```json
// Workspace 能更好的统一管理有多个项目的仓库, 可以使多个项目共享同一个 node_modules 目录，提升开发效率和降低磁盘空间占用;
// 修改根目录下package.json, 如下示例:

{
    "private":true,
	"workspaces":["common","server", "packages/*"] 
}

// 开源社区则都基本上使用 "workspaces": ["packages/*"] 的目录结构，这与 Lerna 的目录结构一致;

// 可用的 Yarn Workspace 命令:
yarn workspace <workspace_name> <command>
yarn workspaces run <command>
```



## 6.lerna

### 1. 安装使用

```shell
# lerna是GitHub上面开源的一款js代码库管理软件， 用来对一系列相互耦合比较大、又相互独立的js git库进行管理;
# https://segmentfault.com/a/1190000019350611?utm_source=tag-newest
yarn global add lerna

lerna init # 初始化lerna目录
lerna publish

lerna list # 如何查看本地包列表
lerna bootstrap # 下载依赖包或者生成本地软连接
lerna add axios # 所有包都添加axios模块

# 某些发布的情况，开发者需要指定安装包版本，或者指定子目录发布
lerna publish --dist-tag next   # 指定当前版本号
lerna publish --contents dist   # 指定dist目录为发布目录
```



### 2.测试代码

```javascript
https://github.com/longxiaobaiWJ/components-library-vue
```



### 3.发布测试

```shell
lerna publish # npm whoami

# lerna ERR! E403 [no_perms] Private mode enable, only admin can publish this module.
# 出现原因：使用的是淘宝源cnpm,登陆到的是cnpm; 解决方法：切换到npmjs的网址

# lerna ERR! EWHOAMI Authentication error. Use `npm whoami` to troubleshoot.
# 解决方法：npm login

npm unpublish test # 撤销已发布的包 
npm unpublish test --force # 强制撤销已发布的包 
npm unpublish --force # 强制删除

npm unpublish guitest@1.0.1 # 指定版本号

npm info lg-message # 查看插件所有版本及信息

npm unpublish lg-message --force
```



## 7. 单元测试

```shell
# https://jestjs.io/docs/en/configuration.html
# https://vue-test-utils.vuejs.org/zh/guides/

yarn add jest @vue/test-utils vue-jest babel-jest -D -W

yarn add babel-core@bridge -D -W # 解决babel-core不兼容问题
```

### 1. 配置文件

```javascript
// jest.config.js
module.exports = {
	"testMatch": ["**/__tests__/**/*.[jt]s?(x)"],
	"moduleFileExtensions": ['js','json','jsx','vue'],
	"transform": {
		".*\\.(vue)$": "vue-jest",
		".*\\.(js)$": "babel-jest"
	}
}

```



## 8.rollup

### 1. 安装依赖

```shell
yarn add rollup rollup-plugin-terser rollup-plugin-vue@5.1.9 -D -W

yarn workspace lg-message run build

# rollup无法识别node_modules中的包，需要安装插件npm install --save-dev rollup-plugin-node-resolve，并使用
# 全局配置打包所需安装
yarn add @rollup/plugin-json rollup-plugin-postcss @rollup/plugin-node-resolve -D -W

yarn add cross-env -D -W

```

### 2.全局配置

```javascript
import fs from 'fs'
import path from 'path'
import json from '@rollup/plugin-json'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import vue from 'rollup-plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'

const plugins = [
	vue({
    css: true,
    completeTemplate: true
  }),
  json(),
  nodeResolve(),
  postcss({
    extract: true
  })
]

const isProduction = process.env.NODE_ENV === 'production'

const source = path.resolve(__dirname, '.', 'packages')

if (isProduction) {
  plugins.push(terser())
}

const targets = fs.readdirSync(source)
  .filter(dir => fs.existsSync(path.resolve(source, dir, 'package.json')))
  .map(dir => {
    const context = require(path.resolve(source, dir, 'package.json'), 'utf8')
    return {
      input: path.resolve(source, dir, 'index.js'),
      output: [
        {
          exports: 'auto',
          file: path.resolve(source, dir, context.main),
          format: 'cjs'
        },
        {
          exports: 'auto',
          file: path.resolve(source, dir, context.module),
          format: 'es'
        }
      ],
      plugins: plugins,
    }
  })


module.exports = targets

```



## 9. Usage-plop

```javascript
// yarn add plop -D -W // 安装依赖

// plopfile.js
const fs = require('fs')
const path = require('path')

/**
 * 通过readdirSync函数加载使用
 * 组合函数，适用于自定义逻辑
 * 在使用过程中，只需修改该函数
 * @param {String} relative 
 * @param {String} tail 
 * @param {Boolean} isHbs 
 * @param {RegExp} regexp 
 */
const component = (relative = "", tail = "", isHbs = "", regexp = /component/) => {
  tail = tail.replace(regexp, '{{name}}')
  const extra = path.join(relative, tail)
  .replace('templates', `packages\\{{name}}`)
  return isHbs ? extra.replace(/\.hbs/, '') : extra
}

/**
 * 通过.hbs文件，生成动态文件内容
 * 根据实际文件结构，动态加载模板文件
 * 可根据目录名称变化，动态加载compose函数
 * @param {Sting} source 
 * @param {Array} targets 
 * @param {Function} compose 
 */
const readdirSync = (source = ".", targets = [], compose = component) => {
  const relative = path.join('.', source)

  if (fs.existsSync(relative)) {
    const dirs = fs.readdirSync(relative)
    for (const dir of dirs) {
      const template = path.join(relative, dir)
      if (fs.statSync(template).isDirectory()) {
        readdirSync(template, targets, compose)
      } else {
        const isHbs = /\.hbs$/.test(template)
        targets.push({
          template: template,
          path: compose(relative, dir, isHbs)
        })
      }
    }
  }
  return targets
}

module.exports = plop => {
  plop.setGenerator('component', {
    description: '视图组件',
    prompts: [{
      type: 'input',
      name: 'name',
      message: '组件的名字, MyAppComponent:',
      validate: function (value) {
        return true;
      }
    }],
    actions: readdirSync('templates').map(action => {
      return {
        type: 'add', // 新建文件
        path: action.path,
        templateFile: action.template
      }
    })
  })
}
```

