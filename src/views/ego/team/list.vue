<template>
  <div class="app-container">
    <!--查询表单 :inline="true" 表示一行显示-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teamQuery.teamName" placeholder="组织名称"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="teamQuery.level" clearable placeholder="组织等级">
          <el-option :value="1" label="一星组织"/>
          <el-option :value="2" label="二星组织"/>
          <el-option :value="3" label="三星组织"/>
          <el-option :value="4" label="四星组织"/>
          <el-option :value="5" label="五星组织"/>
        </el-select>
      </el-form-item>

      <el-form-item label="创建时间">
        <el-date-picker
          v-model="teamQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="teamQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-form-item>
        <el-input v-model="teamQuery.minpersons" placeholder="最小人数"/>
      </el-form-item>

      <el-form-item>
        <el-input v-model="teamQuery.maxpersons" placeholder="最大人数"/>
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

        <el-table-column prop="teamName" label="组织名称" width="200" />

        <el-table-column prop="persons" label="人数" width="80" />

        <el-table-column prop="level" label="星级" width="80" />
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <router-link :to="'/team/edit/'+scope.row.id">
              <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
            </router-link>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.teamId)">删除</el-button>
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
  </el-form></div>
</template>

<script>
// 引入调用team.js文件
import team from '@/api/ego/team'
export default {
  // 写核心代码位置
  data() { // 定义变量和初始值
    return {
      list: null, // 查询之后接口返回集合
      page: 1, // 当前页
      limit: 10, // 每页记录数
      total: 0, // 总记录数
      teamQuery: {
      } // 条件封装对象
    }
  },
  created() { // 页面渲染之前执行，一般调用methods定义的方法
    this.getList()
  },
  methods: { // 创建具体的方法，调用team.js定义的方法
    // 组织列表的方法
    getList(page = 1) {
      this.page = page
      team.getTeamListPage(this.page, this.limit, this.teamQuery)
        .then(response => { // 请求成功
          // response接口返回的数据
          // console.log(response)
          this.list = response.data.rows
          this.total = response.data.total
          console.log(this.list)
          console.log(this.total)
        })
        // .catch(error => { // 请求失败
        //   console.log(erroe)
        // })
    },
    resetData() { // 清空的方法
      // 表单输入项数据清空
      this.teamQuery = {}
      // 查询所有讲师数据
      this.getList()
    },
    // 删除组织的方法
    removeDataById(id) {
      this.$confirm('此操作将永久删除记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 点击确定，执行then方法
        // 调用删除的方法
        team.deleteTeamById(id)
          .then(response => { // 删除成功
            // 提示信息
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 回到列表页面
            this.getList()
          })
      }) // 点击取消，执行catch方法
    }
  }
}
</script>
