import request from '@/utils/request'

export default {
  // 添加组织
  addTeam(teamInfo) {
    return request({
      url: `/egoservice/team/addTeam`,
      method: 'post',
      data: teamInfo
    })
  },
  // 删除组织
  removeTean(id) {
    return request({
      url: `/egoservice/team/remove/${id}`,
      method: 'delete'
    })
  },
  // 修改组织信息
  updateTeam(teamInfo) {
    return request({
      url: '/egoservice/team/updateTeamInfo',
      method: 'post',
      data: teamInfo
    })
  },
  // 根据组织id查询组织基本信息
  getTeamInfoId(id) {
    return request({
      url: `/egoservice/team/getTeamInfo/${id}`,
      method: 'get'
    })
  },
  // 查询所有组织
  getTeamList() {
    return request({
      url: `/egoservice/team/findAll`,
      method: 'get'
    })
  },
  // 组织列表，条件查询分页
  //   current分页当前页, limit每页的记录数 , teamQuery条件对象
  getTeamListPage(current, limit, teamQuery) {
    return request({
      url: `/egoservice/team/pageTeamCondition/${current}/${limit}`,
      method: 'post',
      // /adminQuery条件对象，后端使用requestbody获取数据
      // data表示把对象转化为json传递到接口里面
      data: teamQuery

    })
  }

//   deleteAdminById(admin_id) {
//     return request({
//       url: `/egoservice/admin/remove/${admin_id}`,
//       method: 'delete'
//     })
//   },
//   // 添加管理员
//   addAdmin(Admin) {
//     return request({
//       url: `/egoservice/admin/addAdmin`,
//       method: 'post',
//       data: Admin
//     })
//   },
//   // 根据id查询管理员
//   getAdminInfo(id) {
//     return request({
//       url: `/egoservice/admin/getAdmin/${id}`,
//       method: 'get'
//     })
//   },
//   // 修改管理员
//   updateAdminInfo(admin) {
//     return request({
//       url: `/egoservice/admin/updateAdmin`,
//       method: 'post',
//       data: admin
//     })
//   }
}
