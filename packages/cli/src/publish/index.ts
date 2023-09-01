import type { CAC } from 'cac'
import { selectVersionType } from './prompt'

/** 发布npm包版本 */
export const commandPublish = (cli: CAC) => {
  cli
    .command('publish', '发布npm包版本')
    .allowUnknownOptions()
    .action(async () => {
      selectVersionType()
    })
}
