import { writeFile } from 'fs/promises'
import { resolve } from 'path'
import prompts from 'prompts'
import semver from 'semver'
import { getProjectPackage } from '../utils'

export enum ReleaseVersionType {
  /** 正式版 */
  OFFICAIAL = 'OFFICAIAL',
  /** 内部测试版 */
  ALPHA = 'alpha',
  /** 公开测试版 */
  BETA = 'beta',
  /** 稳定候选版 */
  RC = 'rc'
}

export const getVersionTypeName = (versionType: ReleaseVersionType) => {
  return {
    [ReleaseVersionType.OFFICAIAL]: '正式版本',
    [ReleaseVersionType.RC]: '稳定候选版本',
    [ReleaseVersionType.BETA]: '公开测试版本',
    [ReleaseVersionType.ALPHA]: '内部测试版本'
  }[versionType]
}

/** 选择版本 */
export const selectVersion = async (versionType: ReleaseVersionType) => {
  const { version: curVersion } = await getProjectPackage<{ version: string }>('packages/cli')
  const versionData = semver.parse(curVersion)
  if (!versionData) return ''

  const simpVersion = semver.valid(semver.coerce(versionData.version)) || ''
  const identifierVersion = typeof versionData.prerelease[1] === 'number' ? versionData.prerelease[1] + 1 : 1
  const versionTypeName = getVersionTypeName(versionType)

  if (versionType === ReleaseVersionType.OFFICAIAL) {
    const patchVersion = semver.inc(simpVersion, 'patch') || ''
    const minorVersion = semver.inc(simpVersion, 'minor') || ''
    const majorVersion = semver.inc(simpVersion, 'major') || ''

    const res = await prompts(
      [
        {
          type: 'select',
          name: 'version',
          message: `请选择修订的${versionTypeName}`,
          choices: [
            {
              title: `补丁版本 - Patch(${patchVersion})`,
              value: patchVersion,
              description: versionTypeName
            },
            {
              title: `次要版本 - Minor(${minorVersion})`,
              value: minorVersion,
              description: versionTypeName
            },
            {
              title: `主要版本 - Major(${majorVersion})`,
              value: majorVersion,
              description: versionTypeName
            }
          ]
        }
      ],
      {
        onCancel() {
          process.exit(-1)
        }
      }
    )
    return res.version as string
  }

  const increVersion = simpVersion + `-${versionType}.` + identifierVersion
  const patchVersion = semver.inc(simpVersion, 'prepatch', versionType, false) || '' + identifierVersion
  const minorVersion = semver.inc(simpVersion, 'preminor', versionType, false) || '' + identifierVersion
  const majorVersion = semver.inc(simpVersion, 'premajor', versionType, false) || '' + identifierVersion
  const res = await prompts(
    [
      {
        type: 'select',
        name: 'version',
        message: `请选择修订的${versionTypeName}`,
        choices: [
          {
            title: `增量版本 - Incre(${increVersion})`,
            value: increVersion,
            description: versionTypeName
          },
          {
            title: `补丁版本 - Patch(${patchVersion})`,
            value: patchVersion,
            description: versionTypeName
          },
          {
            title: `次要版本 - Minor(${minorVersion})`,
            value: minorVersion,
            description: versionTypeName
          },
          {
            title: `主要版本 - Major(${majorVersion})`,
            value: majorVersion,
            description: versionTypeName
          }
        ]
      }
    ],
    {
      onCancel() {
        process.exit(-1)
      }
    }
  )
  return res.version as string
}

/** 恢复版本 */
export const resetVersion = async (oldVersion: string) => {
  const cwd = process.cwd()
  const pkg = await getProjectPackage('packages/cli')
  pkg.version = oldVersion

  const pkgPath = resolve(cwd, 'packages/cli', 'package.json')
  await writeFile(pkgPath, JSON.stringify(pkg, null, 2))
}

/** 创建版本 */
export const createVersion = async (version: string) => {
  const cwd = process.cwd()
  const pkg = await getProjectPackage<{ version: string }>('packages/cli')
  const oldVersion = pkg.version

  const newPkg = JSON.parse(JSON.stringify(pkg))
  newPkg.version = version

  const pkgPath = resolve(cwd, 'packages/cli', 'package.json')
  try {
    await writeFile(pkgPath, JSON.stringify(newPkg, null, 2))
  } catch (error) {
    await createVersion(oldVersion)
    return Promise.reject(error)
  }
}


