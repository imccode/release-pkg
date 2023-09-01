import { getProjectPackage } from '../utils'
import { createCommit } from './commit'
import { hasNotCache, removeGitTag, resetGitCommit } from './git'
import { pushData } from './push'
import { createTag } from './tag'
import { ReleaseVersionType, createVersion, resetVersion, selectVersion } from './version'

interface RunReleaseOptions {
  versionType: ReleaseVersionType
}

export const runRelease = async (options: RunReleaseOptions) => {
  const has = await hasNotCache()
  if (!has) return Promise.reject('无文件修改!')

  const pkg = await getProjectPackage<{ version: string }>('packages/cli')
  let tagName = ''
  try {
    const version = await selectVersion(options.versionType)
    await createVersion(version)
    // await createCommit()
    tagName = await createTag(version)
    await pushData(tagName)
  } catch (error) {
    await resetVersion(pkg.version)
    await resetGitCommit()
    await removeGitTag(tagName)
    return Promise.reject(error)
  }
}
