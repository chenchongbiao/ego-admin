import request from '@/utils/request'

export default {
  // 添加
  addAdmin(Team) {
   return request({
      url: `/egoservice/team/addTeam`,
      method: 'post',
      data: Team
    })
  },
  // 删除
  removeTean(id) {
    return request({
      url: `/egoservice/team/remove/${id}`,
      method: 'get'
    })
  },
  // 修改
  updateActivityInfo(activityInfoVo) {
    return request({
      url: '/egoservice/activity/updateActivityInfo',
      method: 'post',
      data: activityInfoVo
    })
  },
  // 查询所有用户仅id和姓名
  getVolunteerIdList() {
    return request({
      url: '/ucenter/volunteer/findAllVolunteer',
      method: 'get'
    })
  }
}