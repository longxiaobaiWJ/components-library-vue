
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