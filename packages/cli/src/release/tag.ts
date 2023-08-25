import { createGitTag, removeGitTag } from "./git"

/** 创建标签 */
export const createTag = async (version: string) => {
  const tagName = `v${version}`
  try {
    await createGitTag(tagName)
    return tagName
  } catch (error) {
    await removeGitTag(tagName)
    return Promise.reject(error)
  }
}