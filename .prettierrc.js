/** @type {import("prettier").Options} */
const config = {
  // 每行最大宽度，超出自动折行显示
  printWidth: 120,
  // 缩进空格数
  tabWidth: 2,
  // 使用空格来缩进
  useTabs: false,
  // 在每行末尾不追加分号
  semi: false,
  // 使用单引号而不是双引号
  singleQuote: true,
  // jsx忽略单、双引号
  jsxSingleQuote: false,
  // 对象文字中括号之间的空格
  bracketSpacing: true,
  // 将>多行 HTML（HTML、JSX、Vue、Angular）元素的 放在单独一行
  bracketSameLine: false,
  // 唯一的箭头函数参数周围不包含括号
  arrowParens: 'avoid',
  // 不会更改 Markdown 文本中的换行
  proseWrap: 'preserve',
  // 在多行逗号分隔的语法结构中尽不打印尾随逗号
  trailingComma: 'none'
}

module.exports = config
