import request from '@/utils/request'

export default {
  // 添加活动信息功能
  addActivityInfo(activityInfo) {
    return request({
      url: '/egoservice/activity/addActivityInfo',
      method: 'post',
      data: activityInfo
    })
  },
  // 删除组织
  removeActivity(ActivityId) {
    return request({
      url: `/egoservice/activity/${ActivityId}`,
      method: 'delete'
    })
  },
  // 活动所有活动分页
  getActivityListPage(current, limit, activityQuery) {
    return request({
      url: `/egoservice/activity/pageActivityCondition/${current}/${limit}`,
      method: 'post',
      // /activityQuery
      // data表示把对象转化为json传递到接口里面
      data: activityQuery

    })
  },
  // 根据活动id查询活动基本信息
  getActivityInfoId(activityId) {
    return request({
      url: `/egoservice/activity/getActivityInfo/${activityId}`,
      method: 'get'
    })
  },
  // 修改活动信息
  updateActivityInfo(activityInfoVo) {
    return request({
      url: '/egoservice/activity/updateActivityInfo',
      method: 'post',
      data: activityInfoVo
    })
  },
  // 活动确认信息显示
  getPublihActivityInfo(id) {
    return request({
      url: `/egoservice/activity/getPublishActivityInfo/${id}`,
      method: 'get'
    })
  },
  // 课程最终发布
  publihActivity(id) {
    return request({
      url: `/egoservice/activity/publishActivity/${id}`,
      method: 'get'
    })
  }
}
