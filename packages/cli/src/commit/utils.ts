import { exec } from '../utils'
import { fileModifyRule } from './rule'

/** 同步远程Git仓库信息 */
export const gitFetch = async () => {
  try {
    await exec('git fetch --all --prune --jobs=10')
  } catch (error) {
    return Promise.reject(new Error('同步远程Git仓库信息失败'))
  }
}

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
    return stdout
      .split('\n')
      .filter(v => !!v)
      .map(str => {
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

/** 获取当前分支 */
export const getCurrentBranch = async () => {
  try {
    const { stdout } = await exec('git symbolic-ref --short HEAD')
    return stdout.trim()
  } catch (error) {
    return Promise.reject(new Error('获取当前分支失败'))
  }
}

/** 判断远程Git仓库是否存在指定分支 */
export const hasRemoteBranch = async (name: string) => {
  try {
    await gitFetch()
    const { stdout } = await exec('git branch --remote')
    return stdout
      .split('\n')
      .filter(v => !!v)
      .some(str => str.trim() === `origin/${name}`)
  } catch (error) {
    return Promise.reject(new Error('判断远程Git仓库是否存在指定分支失败'))
  }
}

/** 获取当前commitId */
export const getCurrentCommitId = async () => {
  try {
    const { stdout } = await exec('git rev-parse HEAD')
    return stdout.trim()
  } catch (error) {
    return Promise.reject(new Error('获取当前Commit ID失败'))
  }
}

/** 添加Git Commit */
export const addCommit = async (content: string) => {
  try {
    await exec(`git commit -m "${content}"`)
    return await getCurrentCommitId()
  } catch (error) {
    return Promise.reject(new Error('添加Git Commit失败'))
  }
}

/** 移除Git Commit */
export const removeCommit = async (commitId?: string) => {
  try {
    if (commitId) {
      await exec(`git reset --hard ${commitId}`)
    } else {
      await exec('git reset HEAD^')
    }
  } catch (error) {
    return Promise.reject(new Error('移除Git Commit失败'))
  }
}

/** 推送数据到Git远程服务器 */
export const pushBranchCommit = async () => {
  try {
    const branchName = await getCurrentBranch()
    if (await hasRemoteBranch(branchName)) {
      await exec(`git push`)
    } else {
      await exec(`git push --set-upstream origin ${branchName}`)
    }
  } catch (error) {
    return Promise.reject(new Error('推送数据到Git远程服务器失败'))
  }
}
