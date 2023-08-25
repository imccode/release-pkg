import { exec } from '../utils'
import { inputCommit } from './commit'
import { addGitCache, createGitCommit, createGitTag, hasNotCache } from './git'
import { ReleaseVersionType, selectVersion } from './version'



interface RunReleaseOptions {
  versionType: ReleaseVersionType
}

export const runRelease = async (options: RunReleaseOptions) => {
  const has = await hasNotCache()
  if (!has) return Promise.reject('无文件修改!')

  const version = await selectVersion(options.versionType)

  // const has = await hasNotCache()
  // if (has) {
  //   await exec('git add .')
  //   const commitContent = await inputCommit()
  //   await createGitCommit(commitContent)
  // }
  await createGitTag(version)
}
