<template>
  <div id="resultList">
    <el-table
      :data="tableData"
      >
      <el-table-column
        prop="ID"
        label="ID"
        width="120">
      </el-table-column>
      <el-table-column
        prop="create_date"
        label="爬取日期"
        width="150">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="爬取时间"
        width="120">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="task_type"-->
        <!--label="任务类型"-->
        <!--width="120">-->
      <!--</el-table-column>-->
      <el-table-column
        prop="task_status"
        label="任务类型"
        width="170"
        :filters="[{ text: 'SubSeries基本信息', value: '0' }, { text: 'SubSeries详细信息', value: '1' }, { text: 'Model基本信息', value: '2' }, { text: 'Model详细信息', value: '3' }]"
        :filter-method="filterTag2"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type=getTaskType(scope.row.task_type)
            disable-transitions>{{ getTaskType2(scope.row.task_type) }}</el-tag>
        </template>
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="task_status"-->
        <!--label="任务状态"-->
        <!--width="200">-->
      <!--</el-table-column>-->
      <el-table-column
        prop="task_status"
        label="状态"
        width="120"
        :filters="[{ text: 'Completed', value: '2' }, { text: 'Loading', value: '1' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.task_status === '1' ? 'primary' : 'success'"
            disable-transitions>{{ scope.row.task_status === '1' ? 'Loading' : 'Completed' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150">
        <template slot-scope="scope" style="text-align:center">
          <el-button-group>
            <el-button @click="handleClick(scope.row)" type="success" size="small"><a style="text-decoration: none; color: white" :href="'./review.html?a=' + scope.row.ID">预览</a></el-button>
            <el-button @click="downLoadExcel(scope.row.ID)" type="primary" size="small">下载</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 25, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total=totalItem>
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    mounted: function () {
      this.getTaskList(1)
      this.getdata(1)
      // console.log(this.getTaskType(0))
    },
    data: function(){
      return{
        tableData:[],
        totalItem:0,
        totalPage:0
      }
    },
    methods: {
      getdata(task_id) {
        var url = '/GetSingleManualTaskDetail';
        this.$axios({
          methods: 'get',
          url: url,
          params: {
            task_id: task_id
          }
        }).then(function (response) {
          console.log(response);
        }).catch(error => {
          console.log(error);
        })
      },
      handleClick(row) {
        console.log(row);
        // console.log(this.getTaskType(0))
      },
      filterTag(value, row) {
        return row.task_status === value;
      },
      filterTag2(value, row) {
        return row.task_type === value;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        // console.log(val);
        this.getTaskList(val)
      },
      getTaskList(reg) {
        var that = this;
        var url = '/GetAllManualTaskByPage';
        this.$axios({
          methods: 'get',
          url: url,
          params: {
            pageSize: "10",
            currentPage: reg,
          }
        }).then(function (response) {
          console.log(response.data);
          // console.log(response.data.totalItem);
          // console.log(response.data.spliter_arr);

          that.tableData = response.data.data;
          that.totalItem = response.data.totalItem;
          that.totalPage = response.data.totalPage;

          // console.log(that.testData.spliter_arr);
          console.log(that.totalPage)
          console.log(that.totalItem)
        }).catch(error => {
          console.log(error);
        })
      },
      downLoadExcel(reg) {
        // var that =this;
        console.log(reg);
        var url = '/DownloadTaskReportAsExcel?task_id=' + reg;
        window.location.href = url;
      },
      getTaskType2(type){
        switch(type){
          case "1":
            return "Subseries基本信息"
          case "2":
            return "Subseries详细信息"
          case "3":
            return "Model基本信息"
          case "4":
            return "Model详细信息"
        }
      },
      getTaskType(type){
        switch (type) {
          case "1":
            return "success"
          case "2":
            return "info"
          case "3":
            return "warning"
          case "4":
            return ""
        }
      }
    }
  }
</script>
