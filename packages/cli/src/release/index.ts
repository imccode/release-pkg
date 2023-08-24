import { prompt } from 'prompts'
import { commitRule } from './commitRule'
import { addGitCache, createGitCommit, hasNotCache } from './git'

export enum ReleaseVersionType {
  /** 正式版 */
  OFFICAIAL = 'OFFICAIAL',
  /** 内部测试版 */
  ALPHA = 'ALPHA',
  /** 公开测试版 */
  BETA = 'BETA',
  /** 稳定候选版 */
  RC = 'RC'
}

interface RunReleaseOptions {
  versionType: ReleaseVersionType
}

/** 输入commit内容 */
export const inputCommit = async () => {
  const res = await prompt([
    {
      type: 'select',
      name: 'prefix',
      message: '请输入Commit类型',
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
  ])
  return res.prefix + ': ' + res.content
}

export const runRelease = async (options: RunReleaseOptions) => {
  const has = await hasNotCache()
  if (has) {
    await addGitCache()
    const commitContent = await inputCommit()
    await createGitCommit(commitContent)
  }
}
