// @ts-ignore
import { execa } from 'execa'
import { resolve } from 'path'
import { JsonType } from './types'
import { type } from 'os'

export const exec = async (command: string) => {
  try {
    const res = await execa(command, { shell: true })
    if (res.exitCode === 0) return Promise.resolve(res)
    return Promise.reject(res.stderr)
  } catch (error) {
    return Promise.reject(error.stderr)
  }
}

/** 获取项目package.json内容 */
export const getProjectPackage = async <T extends JsonType = JsonType>(projectDir?: string) => {
  const cwd = process.cwd()
  const pkgPath = resolve(cwd, projectDir || '', 'package.json')
  const pkgJson = require(pkgPath)
  return pkgJson as T
}