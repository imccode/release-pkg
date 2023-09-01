import * as picocolors from 'picocolors'
import type { CAC } from 'cac'
import { exec } from '../utils'
import { commitRule } from './rule'
import { addModifyToCache, getModifyList, removeModifyCache } from './utils'
import { inputCommit } from './prompt'

export { inputCommit } from './prompt'
export { commitRule } from './rule'

/** 显示git commit 内容规则 */
export const showCommitRule = () => {
  console.log(picocolors.dim('Commit规则: ') + picocolors.gray('Commit类型 + 英文冒号 + 空格 + Commit内容'))
  console.log(picocolors.dim('例如: ') + picocolors.gray('feat: 新增一个圈圈点击效果\n'))
}

/** 校验commit内容 */
export const validateCommitRule = (content: string) => {
  if (!content) return false

  const rulePrefixList = commitRule.map(item => item.prefix)
  const isConform = rulePrefixList.some(prefix => content.startsWith(prefix + ': '))

  return isConform
}

/** 创建commit */
export const createCommit = async (commitContent: string) => {
  try {
    await addModifyToCache()
  } catch (error) {
    await removeModifyCache()
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

// export const 

/** git commit cli */
export const commandCommit = (cli: CAC) => {
  cli.command('commit', '创建Git Commit').allowUnknownOptions().action(async () => {
    try {
      const modifyList = await getModifyList()
      if (modifyList.length < 1) {
        throw new Error('无文件改动')
      }
      const commitContent = await inputCommit()
      await createCommit(commitContent)
    } catch (error) {
      console.log(picocolors.red(picocolors.bold('\nERROR:\n')) + picocolors.red(error))
    }
  })
}
