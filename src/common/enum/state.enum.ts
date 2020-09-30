/**
 * 业务数据常用枚举类型
 */

// 发布状态
export enum EPublishState {
  Pending = 'pending',
  Passed = 'passed',
  Rejected = 'rejected',
  Deleted = 'deleted',
  Locked = 'locked'
}

// 排序状态
export enum ESortType {
  Asc = 'asc', // 升序
  Desc = 'desc', // 降序
}
