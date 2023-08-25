import { pushGitData, pushGitTag } from './git'
import prompts from 'prompts'
import chalkAnimation from 'chalk-animation'

/** 推送git数据 */
export const pushData = async (tagName: string) => {
  const { value } = await prompts(
    [
      {
        type: 'confirm',
        name: 'value',
        message: '是否推送本地数据到远程GIT',
        initial: true
      }
    ],
    {
      onCancel() {
        process.exit(-1)
      }
    }
  )
  if (!value) return

  const rainbow = chalkAnimation.rainbow('🚀 推送本地数据到远程GIT服务器中...')
  try {
    rainbow.start()
    await pushGitData()
    await pushGitTag(tagName)
    rainbow.replace('')
    console.log('✅ 推送成功！')
  } catch (error) {
    rainbow.stop()
    rainbow.replace('')
    return Promise.reject(error)
  }
}
