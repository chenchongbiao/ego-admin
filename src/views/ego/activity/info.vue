<template>

  <div class="app-container">

    <h2 style="text-align: center;">填写活动基本信息</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写活动基本信息"/>
      <el-step title="发布活动"/>
    </el-steps>

    <el-form label-width="100px">
      <el-form-item label="活动标题">
        <el-input v-model="activityInfo.title" placeholder=" 示例：培训活动，少儿编程"/>
      </el-form-item>

      <!-- 所属分类 TODO -->
      <el-form-item label="活动分类">
        <el-select
          v-model="activityInfo.subjectParentId"
          placeholder="一级分类"
          @change="subjectLevelOneChanged">

          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>

        <!-- 二级分类 -->
        <el-select v-model="activityInfo.subjectId" placeholder="二级分类">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>
      </el-form-item>

      <el-form :inline="true" label-width="100px" class="demo-form-inline">
        <!-- 活动发布组织 -->
        <el-form-item label="活动发布组织">
          <el-select
            v-model="activityInfo.teamId"
            placeholder="请选择"
          >

            <el-option
              v-for="team in teamList"
              :key="team.id"
              :label="team.teamName"
              :value="team.id"/>

          </el-select>
        </el-form-item>
        <el-form-item label="志愿时长">
          <el-input-number :min="0" v-model="activityInfo.activityTime" controls-position="right" placeholder="请填写活动的时长"/>小时
        </el-form-item>
      </el-form>

      <el-form label-width="100px">
        <el-form-item label="地点">
          <el-input v-model="activityInfo.address" placeholder=" 示例：广州市九龙服务区"/>
        </el-form-item>
        <!--查询表单 :inline="true" 表示一行显示-->
        <el-form :inline="true" label-width="100px" class="demo-form-inline">
          <el-form-item label="添加时间">
            <el-date-picker
              v-model="activityInfo.startTime"
              type="datetime"
              placeholder="选择开始时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              default-time="00:00:00"
            />
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="activityInfo.endTime"
              type="datetime"
              placeholder="选择截止时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              default-time="00:00:00"
            />
          </el-form-item>
        </el-form>
        <!-- 活动简介-->
        <el-form-item label="活动简介">
          <tinymce :height="300" v-model="activityInfo.intro"/>
        </el-form-item>

        <!-- 活动封面-->
        <el-form-item label="活动照片">

          <el-upload
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :action="BASE_API+'/ossservice/fileoss'"
            class="avatar-uploader">
            <img :src="activityInfo.photos">
          </el-upload>

        </el-form-item>

        <el-form-item label="可报名人数">
          <el-input-number :min="1" v-model="activityInfo.applyMax" controls-position="right" placeholder=""/> 人
        </el-form-item>
        <el-form-item>
          <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
        </el-form-item>
      </el-form>
    </el-form>
  </div>
</template>

<script>
import activity from '@/api/ego/activity'
import team from '@/api/ego/team'
import subject from '@/api/ego/subject'
import Tinymce from '@/components/Tinymce' // 引入组件
export default {
  // 声明组件
  components: { Tinymce },
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      activityInfo: {
        title: '', // 活动标题
        subjectId: '', // 二级分类id
        subjectParentId: '', // 一级分类id
        teamId: '', // 组织id
        applyMax: 0, // 活动参与人数
        intro: '', // 活动描述
        activityTime: 0, // 志愿时长
        startTime: '', // 报名开始时间
        endTime: '', // 报名结束时间
        address: '', // 活动地点
        photos: '/static/tangsan.jpg'// 活动照片路径
      },
      activityId: '', // 活动id
      BASE_API: process.env.BASE_API, // 接口API地址
      // adminList: [], // 封装所有的管理员
      teamList: [], // 封装所有的组织
      subjectOneList: [], // 一级分类
      subjectTwoList: []// 二级分类
    }
  },

  created() {
    // 获取路由id值
    if (this.$route.params && this.$route.params.id) {
      this.activityId = this.$route.params.id
      // 调用根据id查询活动的方法
      this.getInfo()
    } else {
      console.log(this.photos)
      // 初始化所有管理员
      this.getListTeam()
      // 初始化所有组织
      // this.getListTeam()
      // 初始化一级分类
      this.getOneSubject()
    }
  },
  methods: {
    // 根据活动id查询
    getInfo() {
      activity.getActivityInfoId(this.activityId)
        .then(response => {
          // 在activityInfo活动基本信息，包含 一级分类id 和 二级分类id
          this.activityInfo = response.data.ActivityInfoVo
          // 1 查询所有的分类，包含一级和二级
          subject.getSubjectList()
            .then(response => {
              // 2 获取所有一级分类
              this.subjectOneList = response.data.list
              // 3 把所有的一级分类数组进行遍历，
              for (var i = 0; i < this.subjectOneList.length; i++) {
                // 获取每个一级分类
                var oneSubject = this.subjectOneList[i]
                // 比较当前activityInfo里面一级分类id和所有的一级分类id
                if (this.activityInfo.subjectParentId === oneSubject.id) {
                  // 获取一级分类所有的二级分类
                  this.subjectTwoList = oneSubject.children
                }
              }
            })
          this.activityTime = response.data.activityTime
          console.log('照片' + this.photos)
          if (!this.photos) {
            this.photos = '/static/tangsan.jpg'
          } else {
            this.photos = response.data.photos
          }
          // 初始化所有组织
          this.getListTeam()
        })
    },
    // 上传图片成功调用的方法
    handleAvatarSuccess(res, file) {
      this.activityInfo.photos = res.data.url
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
    // 点击某个一级分类，触发change，显示对应二级分类
    subjectLevelOneChanged(value) {
      // value就是一级分类id值
      // 遍历所有的分类，包含一级和二级
      for (var i = 0; i < this.subjectOneList.length; i++) {
        // 每个一级分类
        var oneSubject = this.subjectOneList[i]
        // 判断：所有一级分类id 和 点击一级分类id是否一样
        if (value === oneSubject.id) {
          // 从一级分类获取里面所有的二级分类
          this.subjectTwoList = oneSubject.children
          // 把二级分类id值清空
          this.activityInfo.subjectId = ''
        }
      }
    },
    // 查询所有的一级分类
    getOneSubject() {
      subject.getSubjectList()
        .then(response => {
          this.subjectOneList = response.data.list
        })
    },
    // 查询所有的组织
    getListTeam() {
      team.getTeamList()
        .then(response => {
          this.teamList = response.data.items
          console.log('team', this.teamList)
        })
    },
    // 添加活动
    addActivity() {
      activity.addActivityInfo(this.activityInfo)
        .then(response => {
          // 提示
          this.$message({
            type: 'success',
            message: '添加活动信息成功!'
          })
          // 跳转到第二步
          this.$router.push({ path: '/activity/publish/' + response.data.activityId })
          console.log(this.activityInfo)
        })
    },
    // 修改活动
    updateActivity() {
      activity.updateActivityInfo(this.activityInfo)
        .then(response => {
          // 提示
          this.$message({
            type: 'success',
            message: '修改活动信息成功!'
          })
          // 跳转到第二步
          this.$router.push({ path: '/activity/publish/' + this.activityId })
        })
    },
    saveOrUpdate() {
      // 判断添加还是修改
      if (!this.activityInfo.id) {
        // 添加
        this.addActivity()
      } else {
        this.updateActivity()
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
