import { exec, getProjectPackage } from '../utils'
import { createCommit, inputCommit } from './commit'
import { addGitCache, createGitCommit, createGitTag, hasNotCache, removeGitTag, resetGitCommit } from './git'
import { createTag } from './tag'
import { ReleaseVersionType, createVersion, resetVersion, selectVersion } from './version'

interface RunReleaseOptions {
  versionType: ReleaseVersionType
}

export const runRelease = async (options: RunReleaseOptions) => {
  const has = await hasNotCache()
  if (!has) return Promise.reject('无文件修改!')

  const pkg = getProjectPackage<{ version: string }>('packages/cli')
  let tagName = ''
  try {
    const version = await selectVersion(options.versionType)
    await createVersion(version)
    const commit = await createCommit()
    tagName = await createTag(version)
    console.log(version, tagName, commit)
  } catch (error) {
    await resetVersion(pkg.version)
    await resetGitCommit()
    await removeGitTag(tagName)
    return Promise.reject(error)
  }
}
