import { ReleaseType } from "semver"
import { exec } from "../utils"
import { createGitTag, getGitBranchList, getGitTagList, removeGitTag } from "./git"
import { ReleaseVersionType } from "./version"

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