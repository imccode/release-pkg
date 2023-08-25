import { pushGitData } from './git'
import prompts from 'prompts'
import chalkAnimation from 'chalk-animation'

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

  const rainbow = chalkAnimation.rainbow('🚀 推送本地数据到远程GIT服务器中...')
  try {
    rainbow.start()
    await pushGitData()
    rainbow.replace('')
    console.log('✅ 推送成功！')
  } catch (error) {
    rainbow.stop()
    rainbow.replace('')
    return Promise.reject(error)
  }
}
