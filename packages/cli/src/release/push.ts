import { pushGitData } from './git'
import prompts from 'prompts'

/** 推送git数据 */
export const pushData = async () => {
  const { value } = await prompts([
    {
      type: 'confirm',
      name: 'value',
      message: '是否推送本地数据到远程GIT',
      initial: true
    }
  ])

  if (!value) return
  try {
    await pushGitData()
  } catch (error) {
    console.log('1111111', error)
  }
}
