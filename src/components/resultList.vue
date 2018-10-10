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
      <el-table-column
        prop="task_type"
        label="任务类型"
        width="120">
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
            <el-button @click="handleClick(scope.row)" type="success" size="small">预览</el-button>
            <el-button @click="downLoadExcel(scope.row.ID)" type="primary" size="small">下载</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    mounted: function(){
      this.getTaskList(1)
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      filterTag(value, row) {
        return row.task_status === value;
      },
      getTaskList(reg) {
        var that =this;
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
          console.log(response.data.data);
          // console.log(response.data.spliter_arr);
          that.tableData = response.data.data;
          console.log(that.testData.spliter_arr);
        }).catch(error=>{
          console.log(error);
        })
      },
      downLoadExcel(reg) {
        // var that =this;
        console.log(reg);
        var url = '/DownloadTaskReportAsExcel';
        this.$axios({
          methods: 'get',
          url: url,
          params: {
            task_id: reg,
          }
        }).then(function (response) {
          console.log(response);
        }).catch(error=>{
          console.log(error);
        })
      },
    },

    data() {
      return {
        tableData: [{
          create_date: '2016-05-03',
          create_time: 'xxx',
          task_status: '2',
          task_type: '1',
          ID: 1,
          site: 'Japan',
          splitter: 'Laptop',
          brand: 'ThinkPad',
          series: 'ThinkPad x AlienWare',
          subseries: 23333333,
        },]
      }
    }
  }
</script>

<style scoped>
  #resultList {
    margin: auto;
    width: 90%;
    }
</style>
