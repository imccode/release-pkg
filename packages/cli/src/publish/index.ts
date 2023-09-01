import * as picocolors from 'picocolors'
import type { CAC } from 'cac'
import { ReleaseVersionType } from '../version'
import { publishNpm } from './utils'
import { selectVersionType } from './prompt'

export { selectVersionType } from './prompt'
export * from './utils'

/** 发布npm包版本 */
export const commandPublish = (cli: CAC) => {
  cli
    .command('publish', '发布npm包版本')
    .option('-a, --alpha', '内部测试版')
    .option('-b, --beta', '公开测试版')
    .option('-r, --rc', '稳定候选版')
    .option('-l, --latest', '最新正式版')
    .allowUnknownOptions()
    .action(async options => {
      try {
        let versionType = ReleaseVersionType.ALPHA
        if (options.latest) {
          versionType = ReleaseVersionType.LATEST
        } else if (options.rc) {
          versionType = ReleaseVersionType.RC
        } else if (options.beta) {
          versionType = ReleaseVersionType.BETA
        } else if (options.alpha) {
          versionType = ReleaseVersionType.ALPHA
        } else {
          versionType = await selectVersionType()
        }
        await publishNpm(versionType)
      } catch (error) {
        console.log(picocolors.red(picocolors.bold('\nERROR:\n')) + picocolors.red(error))
      }
    })
}
