<template>
  <div class="app-container">
    <!--查询表单 :inline="true" 表示一行显示-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="activityQuery.title" placeholder="活动名称"/>
      </el-form-item>

      <!-- 活动发布组织 -->
      <el-form-item label="活动发布组织">
        <el-select
          v-model="activityQuery.teamId"
          placeholder="请选择">

          <el-option
            v-for="team in teamList"
            :key="team.id"
            :label="team.teamname"
            :value="team.id"/>

        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="activityQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="activityQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
    </el-form>
    <!--查询表单 :inline="true" 表示一行显示-->
    <el-form :inline="true" class="demo-form-inline">
      <!-- 所属分类 TODO -->
      <el-form-item>
        <el-select
          v-model="activityQuery.subjectParentId"
          placeholder="一级分类"
          @change="subjectLevelOneChanged">

          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>
      </el-form-item>
      <!-- 二级分类 -->
      <el-select v-model="activityQuery.subjectId" placeholder="二级分类">
        <el-option
          v-for="subject in subjectTwoList"
          :key="subject.id"
          :label="subject.title"
          :value="subject.id"/>
      </el-select>
      <el-form-item>
        <el-input v-model="activityQuery.applyMinCount" placeholder="活动参与最小人数"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="activityQuery.applyMaxCount" placeholder="活动参与最大人数"/>
      </el-form-item>

      <!--查询表单 :inline="true" 表示一行显示-->
      <!-- <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="activityQuery.username" placeholder="活动最小志愿时长"/>
        </el-form-item>
        <el-form-item>
          <el-input v-model="activityQuery.username" placeholder="活动最大志愿时长"/>
        </el-form-item>
        <el-form-item>
          <el-input v-model="activityQuery.username" placeholder="活动最小浏览"/>
        </el-form-item>
        <el-form-item>
          <el-input v-model="activityQuery.username" placeholder="活动最大浏览"/>
        </el-form-item>
      </el-form> -->
      <el-form-item>
        <el-input v-model="activityQuery.address" placeholder="活动地点"/>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
      <!-- 表格 -->
      <el-table
        :data="list"
        border
        fit
        highlight-current-row>

        <el-table-column
          label="序号"
          width="70"
          align="center">
          <template slot-scope="scope">
            {{ (page - 1) * limit + scope.$index + 1 }}
          </template>
        </el-table-column>

        <el-table-column prop="title" label="活动名称" width="80" />

        <el-table-column prop="activityTime" label="志愿时长" width="80" />

        <el-table-column prop="status" label="活动状态" width="80" />

        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <router-link :to="'/activity/info/'+scope.row.id">
              <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
            </router-link>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        :current-page="page"
        :page-size="limit"
        :total="total"
        style="padding: 30px 0; text-align: center;"
        layout="total, prev, pager, next, jumper"
        绑定事件
        @current-change="getList"
      />
    </el-form>
  </div>
</template>

<script>
// 引入调用js文件
import activity from '@/api/ego/activity'
import team from '@/api/ego/team'
import subject from '@/api/ego/subject'
export default {
  // 写核心代码位置
  data() { // 定义变量和初始值
    return {
      list: null, // 查询之后接口返回集合
      page: 1, // 当前页
      limit: 10, // 每页记录数
      total: 0, // 总记录数
      activityQuery: {
      }, // 条件封装对象
      activityId: '', // 活动id
      activityList: [], // 封装所有的活动
      teamList: [], // 封装所有的组织
      subjectOneList: [], // 一级分类
      subjectTwoList: []// 二级分类
    }
  },
  created() { // 页面渲染之前执行，一般调用methods定义的方法
    this.getList()
    this.getListTeam()
    // 初始化一级分类
    this.getOneSubject()
  },
  methods: { // 创建具体的方法，调用activity.js定义的方法
    // 组织列表的方法
    getList(page = 1) {
      this.page = page
      activity.getActivityListPage(this.page, this.limit, this.activityQuery)
        .then(response => { // 请求成功
          // response接口返回的数据
          // console.log(response)
          this.list = response.data.rows
          this.total = response.data.total
        })
        // .catch(error => { // 请求失败
        //   console.log(erroe)
        // })
    },
    // 查询所有的组织
    getListTeam() {
      team.getTeamList()
        .then(response => {
          this.teamList = response.data.items
        })
    },
    resetData() { // 清空的方法
      // 表单输入项数据清空
      this.activityQuery = {}
      // 查询所有讲师数据
      this.getList()
    },
    // 查询所有的一级分类
    getOneSubject() {
      subject.getSubjectList()
        .then(response => {
          this.subjectOneList = response.data.list
        })
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
    // 删除活动的方法
    removeDataById(id) {
      this.$confirm('此操作将永久删除活动记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 点击确定，执行then方法
        // 调用删除的方法
        activity.removeActivity(id)
          .then(response => { // 删除成功
            // 提示信息
            this.$message({
              type: 'success',
              message: '删除活动成功!'
            })
            // 回到列表页面
            this.getList()
          })
      }) // 点击取消，执行catch方法
    }
  }
}
</script>
