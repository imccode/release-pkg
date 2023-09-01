import { existsSync, readFileSync } from 'fs'
import { readFile } from 'fs/promises'
import { glob } from 'glob'
import { resolve } from 'path'
import { JsonType } from '../types'

export interface WorkspacesPackageInfo<T extends JsonType = JsonType> {
  /** 包信息 */
  pkgInfo: T
  /** 目录（绝对路径） */
  absDir: string
}

const cwd = process.cwd()

/** 获取package.json信息 */
const getPackageInfo = async <T extends JsonType = JsonType>(dir: string): Promise<T | undefined> => {
  try {
    const filePath = resolve(cwd, dir, 'package.json')
    if (!existsSync(filePath)) return

    const pkgJson = await readFile(filePath, 'utf-8')
    return JSON.parse(pkgJson)
  } catch (error) {
    return undefined
  }
}

/** 是否monorepo项目 */
export const isWorkspaces = () => {
  try {
    const pkgJson = readFileSync(resolve(cwd, 'package.json'), 'utf-8')
    const { workspaces } = JSON.parse(pkgJson)
    return !!(workspaces && Array.isArray(workspaces.packages))
  } catch (error) {
    return false
  }
}

/** 获取项目列表 */
export const projectList = async () => {
  try {
    const pkgJson = await readFile(resolve(cwd, 'package.json'), 'utf-8')
    const { workspaces } = JSON.parse(pkgJson)
    if (workspaces && Array.isArray(workspaces.packages)) {
      const findProjectList = async (pl: Set<string>, globList: string[]): Promise<Set<string>> => {
        if (globList.length < 1) return pl
        const list = await glob(globList[0])
        list.forEach(str => pl.add(str))
        return findProjectList(pl, globList.slice(1))
      }

      const pkgList: WorkspacesPackageInfo[] = []
      const list = Array.from(await findProjectList(new Set(), workspaces.packages))
      for (let i = 0; i < list.length; i++) {
        const pkgPath = list[i]
        const pkgInfo = await getPackageInfo(pkgPath)
        if (pkgInfo) {
          pkgList.push({ pkgInfo, absDir: resolve(cwd, pkgPath) })
        }
      }

      return pkgList
    }
    return []
  } catch (error) {
    return Promise.reject(error)
  }
}
