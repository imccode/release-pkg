import { pushGitData } from './git'
import prompts from 'prompts'
import { rainbow } from 'chalk-animation'

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

  const chalkAnimation = rainbow('推送本地数据到远程GIT服务器中...')
  try {
    chalkAnimation.start()
    await pushGitData()
  } catch (error) {
    chalkAnimation.stop()
    chalkAnimation.replace('')
    console.log('1111111', error)
  }
}
