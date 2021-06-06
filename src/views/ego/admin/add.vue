<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="管理员账号">
        <el-input v-model="admin.username"/>
      </el-form-item>
      <el-form-item label="管理员密码">
        <el-input v-model="admin.password"/>
      </el-form-item>
      <!-- 讲师头像：TODO -->

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// 引入调用admin.js文件
import admin from '@/api/admin/admin'
export default {
  data() {
    return {
      admin: {
        username: '',
        password: '',
        adminId: '',
        isDelete: false
      },
      saveBtnDisabled: false
      // 保存按钮是否禁用
    }
  },
  watch: { // 监听
    $route(to, from) { // 路由变化方式，路由发生变化，方法就会执行
      this.init()
    }
  },
  created() { // 页面渲染之前执行
    this.init()
  },
  methods: {
    // getList(page = 1) {
    //   admin.getAdminListPage(this.page, this.limit, this.adminQuery)
    //     .then(response => { // 请求成功
    //       this.adminId = response.data.total
    //     })
    // }
    init() {
      console.log(this.$route.params)
      // 判断路径有id值,做修改
      if (this.$route.params && this.$route.params.id) {
        // 从路径获取id值
        const adminId = this.$route.params.id
        // 调用根据id查询的方法
        this.getInfo(adminId)
      } else { // 路径没有id值，做添加
        // 清空表单
        this.admin = {}
      }
    },
    // 根据管理员id查询的方法
    getInfo(id) {
      admin.getAdminInfo(id)
        .then(response => {
          this.admin = response.data.admin
        })
    },
    saveOrUpdate() {
      // 判断修改还是添加
      // 根据admin是否有id
      if (!this.admin.adminId) {
        // 添加
        this.saveAdmin()
      } else {
        // 修改
        this.updateAdmin()
      }
    },
    // 修改管理员的方法
    updateAdmin() {
      admin.updateAdminInfo(this.admin)
        .then(response => {
          // 提示信息
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          // 回到列表页面 路由跳转
          this.$router.push({ path: '/admin/table' })
        })
    },
    // 添加管理员的方法
    saveAdmin() {
      admin.addAdmin(this.admin)
        .then(response => { // 添加成功
          // 提示信息
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          // 回到列表页面 路由跳转
          this.$router.push({ path: '/admin/list' })
        })
    }
  }
}
</script>
