import { exec } from '../utils'
import { ReleaseVersionType } from '../version'

export const publishNpm = async (versionType: ReleaseVersionType) => {
  const res = await exec(`npm publish --tag ${versionType}`)
  console.log(res.stdout.toString())
}
