import * as picocolors from 'picocolors'
import type { CAC } from 'cac'
import type { Animation } from 'chalk-animation'
import chalkAnimation from 'chalk-animation'
import { commitRule } from './rule'
import {
  addCommit,
  addModifyToCache,
  getCurrentCommitId,
  getModifyList,
  pushCommit,
  removeCommit,
  removeModifyCache
} from './utils'
import { confirmPushCommit, inputCommit } from './prompt'

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
  const modifyList = await getModifyList()
  if (modifyList.length < 1) {
    return Promise.reject(new Error('无文件改动'))
  }

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

// export const

/** git commit cli */
export const commandCommit = (cli: CAC) => {
  cli
    .command('commit', '创建Git Commit')
    .allowUnknownOptions()
    .action(async () => {
      let rainbow: Animation | null = null
      try {
        const commitContent = await inputCommit()
        const commitId = await createCommit(commitContent)
        const isPush = await confirmPushCommit()
        if (isPush) {
          rainbow = chalkAnimation.rainbow('🚀 推送本地数据到远程GIT服务器...')
          rainbow.start()
          await pushCommit(commitId)
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
