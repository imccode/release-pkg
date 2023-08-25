import * as picocolors from 'picocolors'
import { CAC } from 'cac'
import { runRelease } from './release'
import { version } from '../package.json'
import { ReleaseVersionType } from './release/version'

const cli = new CAC('pkg-cli')
cli.usage('命令行工具')

cli
  .command('release', '创建发布版本')
  .option('-o, --officaial', '正式版')
  .option('-a, --alpha', '内部测试版')
  .option('-b, --beta', '公开测试版')
  .option('-r, --rc', '稳定候选版')
  .allowUnknownOptions()
  .action(async options => {
    let versionType = ReleaseVersionType.ALPHA
    if (options.officaial) {
      versionType = ReleaseVersionType.OFFICAIAL
    } else if (options.rc) {
      versionType = ReleaseVersionType.RC
    } else if (options.beta) {
      versionType = ReleaseVersionType.BETA
    } else if (options.alpha) {
      versionType = ReleaseVersionType.ALPHA
    } else {
      cli.outputHelp()
      return
    }

    try {
      await runRelease({ versionType })
    } catch (error) {
      console.log(picocolors.white(picocolors.bgRed('\nERROR:\n')) + picocolors.red(error))
    }
  })

cli.version(version).help().parse()
