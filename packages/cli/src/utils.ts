import { execa } from 'execa'
import { resolve } from 'path'

export const exec = async (command: string) => {
  try {
    const res = await execa(command, { shell: true })
    if (res.exitCode === 0) return Promise.resolve(res)
    return Promise.reject(res.stderr)
  } catch (error) {
    return Promise.reject(error.stderr)
  }
}

/** 获取项目版本 */
export const getProjectVersion = (projectDir?: string) => {
  const cwd = process.cwd()
  const pkgPath = resolve(cwd, projectDir || '', 'package.json')
  const pkgJson = require(pkgPath)
  return pkgJson.version || ''
}