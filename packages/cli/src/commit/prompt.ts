import prompts from 'prompts'
import { commitRule } from './rule'

/** 输入commit内容 */
export const inputCommit = async () => {
  const res = await prompts(
    [
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
        message: '请简要描述修改内容',
        validate(value) {
          console.log(value)
          if (!value) return 'Commit内容不能为空'
          return true
        }
      }
    ],
    {
      onCancel() {
        process.exit(-1)
      }
    }
  )
  return res.prefix + ': ' + res.content
}

/** 确认是否推送commit */
export const confirmPushCommit = async () => {
  const { value } = await prompts(
    [
      {
        type: 'confirm',
        name: 'value',
        message: '推送Commit到Git远程服务器',
        initial: true
      }
    ],
    {
      onCancel() {
        process.exit(-1)
      }
    }
  )
  return !!value
}