import * as picocolors from 'picocolors'
import { $ } from 'execa'

export const exec = async (command: string) => {
  try {
    const res = await $`${command}`
    if (res.exitCode === 0) return Promise.resolve(res)
    return Promise.reject()
  } catch (error) {
    console.log(picocolors.red(error))
    return Promise.reject()
  }
}
