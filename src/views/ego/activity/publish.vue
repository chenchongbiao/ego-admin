<template>

  <div class="app-container">

    <h2 style="text-align: center;">活动发布</h2>

    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写活动基本信息"/>
      <el-step title="活动发布"/>
    </el-steps>

    <div class="ccInfo">
      <img :src="activityPublish.photos">
      <div class="main">
        <h2>{{ activityPublish.title }}</h2>
        <p class="gray"><span>共 {{ activityPublish.activityTime }} 志愿时长</span></p>
        <p><span>所属分类：{{ activityPublish.subjectLevelOne }} — {{ activityPublish.subjectLevelTwo }}</span></p>
        <p>发布组织：{{ activityPublish.teamname }}</p>
        <p class="red">活动时间:{{ activityPublish.startTime }}到{{ activityPublish.endTime }}</p>
      </div>
    </div>

    <el-form label-width="120px">

      <el-form-item>
        <el-button @click="previous">返回修改</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="publish">活动发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import activity from '@/api/ego/activity'
export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      activityId: '', // 课程id
      activityPublish: {}
    }
  },

  created() {
    console.log('publish created')
    // 获取路由的id值
    if (this.$route.params && this.$route.params.id) {
      this.activityId = this.$route.params.id
      // 调用接口方法根据课程id查询
      this.getActivityPublishId()
    }
  },

  methods: {
    // 根据活动id查询
    getActivityPublishId() {
      activity.getPublihActivityInfo(this.activityId)
        .then(response => {
          this.activityPublish = response.data.publishActivity
        })
    },
    previous() {
      console.log('previous')
      this.$router.push({ path: '/activity/info/' + this.activityId })
    },

    publish() {
      activity.publihActivity(this.activityId)
        .then(response => {
          // 提示
          this.$message({
            type: 'success',
            message: '课程发布成功!'
          })
          // 跳转课程列表页面
          this.$router.push({ path: '/activity/list' })
        })
    }
  }
}
</script>
<style scoped>
.ccInfo {
    background: #f5f5f5;
    padding: 20px;
    overflow: hidden;
    border: 1px dashed #DDD;
    margin-bottom: 40px;
    position: relative;
}
.ccInfo img {
    background: #d6d6d6;
    width: 500px;
    height: 278px;
    display: block;
    float: left;
    border: none;
}
.ccInfo .main {
    margin-left: 520px;
}

.ccInfo .main h2 {
    font-size: 28px;
    margin-bottom: 30px;
    line-height: 1;
    font-weight: normal;
}
.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}

.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}
.ccInfo .main h3 {
    left: 540px;
    bottom: 20px;
    line-height: 1;
    font-size: 28px;
    color: #d32f24;
    font-weight: normal;
    position: absolute;
}
</style>
