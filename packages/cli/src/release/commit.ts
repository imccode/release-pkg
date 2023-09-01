import * as picocolors from 'picocolors'
import prompts from 'prompts'
import { exec } from '../utils'
import { createGitCommit, resetGitCache, resetGitCommit } from './git'

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

/** 输入commit内容 */
export const inputCommit = async () => {
  const res = await prompts([
    {
      type: 'select',
      name: 'prefix',
      message: '请选择Commit类型',
      choices: commitRule.map(item => ({
        title: `${item.emoji} ${item.prefix} \t${item.desc}`,
        description: '按空格、回车键选中',
        value: item.prefix
      }))
    },
    {
      type: 'text',
      name: 'content',
      message: '请输入Commit内容',
      validate(value) {
        console.log(value)
        if (!value) return 'Commit内容不能为空'
        return true
      }
    }
  ], {
    onCancel() {
      process.exit(-1)
    }
  })
  return res.prefix + ': ' + res.content
}

/** 创建commit */
export const createCommit = async (commitContent: string) => {
  try {
    await exec('git add .')
  } catch (error) {
    await exec('git reset HEAD -- .')
    return Promise.reject(error)
  }

  try {
    await exec(`git commit -m "${commitContent}"`)
    return commitContent
  } catch (error) {
    await exec('git reset HEAD -- .')
    return Promise.reject(error)
  }
}
