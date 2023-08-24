import { CAC } from 'cac'
import { ReleaseVersionType, runRelease } from './release'
const pkg = require('../package.json')

const cli = new CAC('pkg-cli')
cli.usage('命令行工具')

cli
  .command('release', '创建发布版本')
  .option('-o, --officaial', '正式版')
  .option('-a, --alpha', '内部测试版')
  .option('-b, --beta', '公开测试版')
  .option('-r, --rc', '稳定候选版')
  .action(options => {
    let versionType = ReleaseVersionType.ALPHA
    if (options.officaial) {
      versionType = ReleaseVersionType.OFFICAIAL
    } else if (options.rc) {
      versionType = ReleaseVersionType.RC
    } else if (options.beta) {
      versionType = ReleaseVersionType.BETA
    } else {
      cli.outputHelp()
      return
    }

    runRelease({ versionType })
  })

cli.version(pkg.version).help().parse()
