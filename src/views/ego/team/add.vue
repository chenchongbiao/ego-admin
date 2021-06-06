<template>

  <div class="app-container">

    <h2 style="text-align: center;">填写组织基本信息</h2>

    <el-form label-width="100px">
      <el-form-item label="组织名称">
        <el-input v-model="teamInfo.teamName" placeholder=" 示例：e行动-志愿服务队"/>
      </el-form-item>

      <el-form-item label="宗旨">
        <el-input v-model="teamInfo.theme" placeholder=" 示例：微笑象冬天般温暖，服务象夏天般火热。"/>
      </el-form-item>
      <!-- 组织负责人 -->
      <el-form-item label="负责人">
        <el-select
          v-model="teamInfo.teamManagerId"
          placeholder="请选择">

          <el-option
            v-for="Manager in ManagerList"
            :key="Manager.id"
            :label="Manager.username"
            :value="Manager.id"/>

        </el-select>
      </el-form-item>

      <el-form label-width="100px" :inline="true" class="demo-form-inline">
        <el-form-item label="微信">
         <el-input v-model="teamInfo.contact.weixin" placeholder=""/>
        </el-form-item>
        <el-form-item label="QQ">
         <el-input v-model="teamInfo.contact.qq" placeholder=""/>
        </el-form-item>
        <el-form-item label="电话">
         <el-input v-model="teamInfo.contact.phone" placeholder=""/>
        </el-form-item>
      </el-form>

      <!-- 活动简介-->
      <el-form-item label="活动简介">
        <tinymce :height="400" v-model="teamInfo.intro"/>
      </el-form-item>

      <!-- 组织主题图片封面-->
      <el-form-item label=" 组织主题图">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'/ossservice/fileoss'"
          class="avatar-uploader">
          <img :src="teamInfo.themeImg">
        </el-upload>

      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import activity from '@/api/ego/activity'
import team from '@/api/ego/team'
import volunteer from '@/api/ego/volunteer'
import Tinymce from '@/components/Tinymce' // 引入组件
export default {
  // 声明组件
  components: { Tinymce },
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      teamInfo: {
        teamName: '', // 组织名称
        theme: '', // 宗旨
        teamManagerId: '', // 负责人
        contact: {}, // 联系方式
        parentOrganization: '', // 上级组织
        intro: '', // 简介
        themeImg: '/static/tangsan.jpg'// 活动照片路径
      },
      teamId: '', // 活动id
      BASE_API: process.env.BASE_API, // 接口API地址
      ManagerList: [] // 封装所有的志愿者
    }
  },
  created() {
    console.log("查询id"+this.$route.params)
    // 获取路由id值
    if (this.$route.params && this.$route.params.id) {
      this.teamId = this.$route.params.id
      // 调用根据id查询组织的方法
      this.getInfo()
    } else {
      console.log(this.photos)
      // 初始化所有志愿者
      this.getVolunteerList()
      // 初始化所有组织
      // this.getListTeam()
      // 初始化一级分类
      // this.getOneSubject()
    }
  },
  methods: {
    // 根据组织id查询，则把所有志愿者查询出来
    getInfo() {
      team.getTeamInfoId(this.teamId)
        .then(response => {
          this.teamInfo = response.data.TeamInfo
          // 初始化所有所有志愿者
          this.getVolunteerList()
        })
    },
    // 上传图片成功调用的方法
    handleAvatarSuccess(res, file) {
      this.teamInfo.themeImg = res.data.url
    },
    // 上传之前调用的方法
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 查询所有的志愿者
    getVolunteerList() {
      volunteer.getVolunteerIdList()
        .then(response => {
          this.ManagerList = response.data.items
          console.log("志愿者"+this.ManagerList)
        })
    },
    // 添加组织
    addTeam() {
      this.teamInfo.contact = JSON.stringify(this.teamInfo.contact)
      team.addTeam(this.teamInfo)
        .then(response => {
          // 提示
          this.$message({
            type: 'success',
            message: '添加组织信息成功!'
          })
          // 跳转到组织列表
          this.$router.push({ path: '/team/list/'})
          console.log(this.teamInfo)
        })
    },
    // 修改组织信息
    updateTeam() {
      team.updateTeam(this.teamInfo)
        .then(response => {
          // 提示
          this.$message({
            type: 'success',
            message: '修改组织信息成功!'
          })
          // 跳转到第二步
          this.$router.push({ path: '/activity/publish/' + this.activityId })
        })
    },
    saveOrUpdate() {
      // 判断添加还是修改
      if (!this.teamInfo.id) {
        // 添加
        this.addTeam()
      } else {
        this.updateTeam()
      }
    }
  }
}

</script>
<style scoped>
  .tinymce-container {
    line-height: 29px;
    border-color: black;
  }
</style>
