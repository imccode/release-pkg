import type { CAC } from 'cac'
import type { Animation } from 'chalk-animation'
import chalkAnimation from 'chalk-animation'
import * as picocolors from 'picocolors'
import { confirmPushCommit, inputCommit } from './prompt'
import { commitRule } from './rule'
import { addCommit, addModifyToCache, hasFileModify, pushBranchCommit, removeCommit, removeModifyCache } from './utils'

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
export const createCommit = async (content: string) => {
  try {
    await addModifyToCache()
  } catch (error) {
    await removeModifyCache()
    return Promise.reject(error)
  }

  try {
    const id = await addCommit(content)
    return id
  } catch (error) {
    await removeCommit()
    return Promise.reject(error)
  }
}

/** git commit cli */
export const commandCommit = (cli: CAC) => {
  cli
    .command('commit', '创建Git Commit')
    .allowUnknownOptions()
    .action(async () => {
      let rainbow: Animation | null = null
      try {
        const hasModify = await hasFileModify()
        if (!hasModify) return Promise.reject(new Error('无文件改动'))
        
        const commitContent = await inputCommit()
        await createCommit(commitContent)
        const isPush = await confirmPushCommit()
        if (isPush) {
          rainbow = chalkAnimation.rainbow('🚀 推送本地数据到远程GIT服务器...')
          rainbow.start()
          await pushBranchCommit()
          rainbow.stop()
          console.log('✅ 创建Git Commit并推送成功！')
        } else {
          console.log('✅ 创建Git Commit成功！')
        }
      } catch (error) {
        rainbow?.stop()
        console.log(picocolors.red(picocolors.bold('\nERROR:\n')) + picocolors.red(error))
      }
    })
}
