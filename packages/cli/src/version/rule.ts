export enum ReleaseVersionType {
  /** 最新正式版 */
  OFFICAIAL = 'latest',
  /** 内部测试版 */
  ALPHA = 'alpha',
  /** 公开测试版 */
  BETA = 'beta',
  /** 稳定候选版 */
  RC = 'rc'
}

export const releaseVersionRule = [
  { type: ReleaseVersionType.OFFICAIAL, name: '最新正式版本', emoji: '😎' },
  { type: ReleaseVersionType.RC, name: '稳定候选版本', emoji: '🎱' },
  { type: ReleaseVersionType.BETA, name: '公开测试版本', emoji: '🎨' },
  { type: ReleaseVersionType.ALPHA, name: '内部测试版本', emoji: '🧩' }
]
