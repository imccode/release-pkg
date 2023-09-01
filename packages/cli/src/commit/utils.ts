import { exec } from '../utils'
import { fileModifyRule } from './rule'

/** 添加改动文件到暂存区 */
export const addModifyToCache = async () => {
  try {
    await exec('git add .')
  } catch (error) {
    return Promise.reject(new Error('添加改动文件到暂存区失败'))
  }
}

/** 移除暂存区文件到改动文件区 */
export const removeModifyCache = async () => {
  try {
    await exec('git reset HEAD -- .')
  } catch (error) {
    return Promise.reject(new Error('移除暂存区文件到改动文件区失败'))
  }
}

/** 获取改动的文件信息 */
export const getModifyList = async () => {
  try {
    const { stdout } = await exec('git status -s')
    return stdout.split('\n').map(str => {
      const [mark, file] = str
        .trimStart()
        .split(' ')
        .filter(v => !!v)
      const findData = fileModifyRule.find(item => mark.startsWith(item.type))
      return { type: mark, typeName: findData?.name || '未知', file }
    })
  } catch (error) {
    return Promise.reject(new Error(error))
  }
}
