import request from '@/utils/request'

export default {
  // 管理员列表，条件查询分页
  // current分页当前页, limit每页的记录数 , adminQuery条件对象
  getAdminListPage(current, limit, adminQuery) {
    return request({
      url: `/egoservice/admin/pageAdminCondition/${current}/${limit}`,
      method: 'post',
      // /adminQuery条件对象，后端使用requestbody获取数据
      // data表示把对象转化为json传递到接口里面
      data: adminQuery

    })
  },
  // 查询所有管理员
  getAdminList() {
    return request({
      url: `/egoservice/admin/findAll`,
      method: 'get'
    })
  },
  // 删除管理员
  deleteAdminById(admin_id) {
    return request({
      url: `/egoservice/admin/remove/${admin_id}`,
      method: 'delete'
    })
  },
  // 添加管理员
  addAdmin(Admin) {
    return request({
      url: `/egoservice/admin/addAdmin`,
      method: 'post',
      data: Admin
    })
  },
  // 根据id查询管理员
  getAdminInfo(id) {
    return request({
      url: `/egoservice/admin/getAdmin/${id}`,
      method: 'get'
    })
  },
  // 修改管理员
  updateAdminInfo(admin) {
    return request({
      url: `/egoservice/admin/updateAdmin`,
      method: 'post',
      data: admin
    })
  }
}
