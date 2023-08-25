import { exec } from '../utils'

/** 添加文件到git暂存 */
export const addGitCache = async () => {
  await exec('git add .')
}

/** 取消git文件暂存 */
export const resetGitCache = async () => {
  await exec('git reset HEAD -- .')
}

/** 是否存在未缓存的文件 */
export const hasNotCache = async () => {
  const res = await exec('git status -s')
  return !!res.stdout
}

/** 创建commit */
export const createGitCommit = async (content: string) => {
  await exec(`git commit -m "${content}"`)
}

/** 取消commit */
export const resetGitCommit = async () => {
  await exec('git reset HEAD^')
}

/** 创建分支 */
export const createGitBranch = async (branchName: string) => {
  await exec(`git branch ${branchName}`)
}

/** 获取分支列表 */
export const getGitBranchList = async () => {
  const res = await exec('git branch --list')
  return res.stdout.split('\n').filter(v => !!v)
}

/** 获取分支 */
export const removeGitBranch = async (branchName?: string) => {
  await exec(`git branch -d ${branchName || ''}`)
}

/** 推送分支 */
export const pushGitBranch = async (branchName?: string) => {
  await exec(`git push -u origin ${branchName || ''}`)
}

/** 创建标签 */
export const createGitTag = async (tagName: string) => {
  await exec(`git tag ${tagName}`)
}

/** 获取标签列表 */
export const getGitTagList = async () => {
  const res = await exec('git tag')
  return res.stdout.split('\n').filter(v => !!v)
}

/** 获取最后一个标签 */
export const getGitLastTag = async () => {
  const tags = await getGitTagList()
  return tags[tags.length - 1]
}

/** 删除标签 */
export const removeGitTag = async (tagName: string) => {
  await exec(`git tag -d ${tagName}`)
}

/** 推送git数据 */
export const pushGitData = async () => {
  await exec('git push')
}

/**
 * 推送标签
 *
 * - `tagName` 标签名，不传标签名即推送本地所有标签
 */
export const pushGitTag = async (tagName?: string) => {
  if (!tagName) {
    await exec('git push origin --tags')
  } else {
    await exec(`git push origin ${tagName}`)
  }
}