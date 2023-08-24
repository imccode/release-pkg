import * as picocolors from 'picocolors'

/** git commit 消息规则 */
export const commitRule = [
  { prefix: 'feat', desc: 'Features | 新功能', emoji: '✨' },
  { prefix: 'fix', desc: 'Bug Fixes | Bug 修复', emoji: '🐛' },
  { prefix: 'docs', desc: 'Documentation | 文档更新', emoji: '📝' },
  { prefix: 'style', desc: 'Styles | 代码风格', emoji: '💄' },
  { prefix: 'refactor', desc: 'Code Refactoring | 代码重构', emoji: '♻️' },
  { prefix: 'perf', desc: 'Performance Improvements | 性能优化', emoji: '⚡️' },
  { prefix: 'test', desc: 'Tests | 测试', emoji: '✅' },
  { prefix: 'build', desc: 'Build System | 构建', emoji: '📦️' },
  { prefix: 'ci', desc: 'Continuous Integration | CI 配置', emoji: '🔧' },
  { prefix: 'revert', desc: 'Reverts | 代码回退', emoji: '⏪' },
  { prefix: 'chore', desc: 'Chores | 其他修改', emoji: '🎫' }
]

// export const showCommitRuleTable = () => {
//   const table = new Table<[string, string, string]>()
//   table.header([colors.bold('标识'), colors.bold('类型'), colors.bold('说明')])
//   table.body(commitRule.map((item) => [item.emoji, item.prefix, item.desc]))
//   table.border(true)
//   table.render()
// }

/** 显示git commit 消息规则 */
export const showCommitRule = (message: string) => {
  console.log(picocolors.dim('Commit规则: ') + picocolors.gray('Commit类型 + 英文冒号 + 空格 + Commit内容'))
  console.log(picocolors.dim('例如: ') + picocolors.gray('feat: 新增一个圈圈点击效果\n'))
}

/** 校验commit消息 */
export const checkCommitRule = (str?: string, showTip?: boolean) => {
  if (!str) {
    showTip && showCommitRule(str || '')
    return false
  }

  const prefixs = commitRule.map(item => item.prefix)
  const isConform = prefixs.some(prefix => str.startsWith(prefix + ': '))

  if (!isConform && showTip) showCommitRule(str)

  return isConform
}
