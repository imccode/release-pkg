import prompts from 'prompts'
import { ReleaseVersionType, releaseVersionRule } from '../version'

/** 请选择发布版本类型 */
export const selectVersionType = async () => {
  const { type } = await prompts(
    [
      {
        type: 'select',
        name: 'type',
        message: '请选择版本类型',
        choices: releaseVersionRule.map(item => ({
          title: `${item.emoji} ${item.name}`,
          description: '按空格、回车键选中',
          value: item.type
        }))
      }
    ],
    {
      onCancel() {
        process.exit(-1)
      }
    }
  )
  return type as ReleaseVersionType
}