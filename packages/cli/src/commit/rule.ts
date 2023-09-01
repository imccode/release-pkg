/** git commit 消息规则 */
export const commitRule = [
  { prefix: 'feat', desc: 'Features | 新功能', emoji: '✨' },
  { prefix: 'fix', desc: 'Bug Fixes | Bug 修复', emoji: '🐛' },
  { prefix: 'revert', desc: 'Reverts | 代码回退', emoji: '⏪' },
  { prefix: 'style', desc: 'Styles | 代码风格', emoji: '💄' },
  { prefix: 'docs', desc: 'Documentation | 文档更新', emoji: '📝' },
  { prefix: 'build', desc: 'Build System | 构建', emoji: '📦️' },
  { prefix: 'refactor', desc: 'Code Refactoring | 代码重构', emoji: '♻️' },
  { prefix: 'perf', desc: 'Performance Improvements | 性能优化', emoji: '⚡️' },
  { prefix: 'test', desc: 'Tests | 测试', emoji: '✅' },
  { prefix: 'ci', desc: 'Continuous Integration | CI 配置', emoji: '🔧' },
  { prefix: 'chore', desc: 'Chores | 其他修改', emoji: '🎫' }
]

/** git status 文件修改规则 */
export const fileModifyRule = [
  { type: 'A', name: '添加' },
  { type: 'D', name: '删除' },
  { type: 'M', name: '修改' },
  { type: '??', name: '未知' }
]
