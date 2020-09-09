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

```javascript
一个项目仓库中管理多个模块/包，即多组件放置在同一个子目录下
```



## 4.Storybook

Storybook 是 UI 组件的开发环境，它允许开发者浏览组件库，查看每个组件的不同状态，**以及交互地开发和测试组件**;

Storybook是一个开源工具，用于独立开发React、Vue和Angular的UI组件。它能有组织和高效地构建UI组件;

Storybook 在 app 之外运行，这允许开发者**独立地**开发 UI 组件，这可以提高组件的重用性、可测试性和开发速度。所以可以快速构建，而不必担心应用程序特定的依赖关系;

### 1. 安装

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



### 2.使用

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

