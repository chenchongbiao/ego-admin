import request from '@/utils/request'

export default {
  // 课程分类列表
  getSubjectList() {
    return request({
      url: '/egoservice/subject/getAllSubject',
      method: 'get'
    })
  }
//   deleteAdminById(admin_id) {
//     return request({
//       url: `/egoservice/admin/remove/${admin_id}`,
//       method: 'delete'
//     })
//   },
//   // 添加讲师
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
