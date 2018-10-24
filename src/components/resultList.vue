<template>
  <div id="resultList">
    <el-table
      :data='tableData'
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
        prop="task_status"
        label="任务类型"
        width="170"
        :filters="[{ text: 'SubSeries基本信息', value: '0' }, { text: 'SubSeries详细信息', value: '1' }, { text: 'Model基本信息', value: '2' }, { text: 'Model详细信息', value: '3' }]"
        :filter-method="filterTag2"
        filter-placement="bottom-end"
        >
        <template slot-scope="scope">
          <el-tag
            :type='getTagType(scope.row.task_type)'
            disable-transitions
            >
            {{ getTaskType(scope.row.task_type) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="task_status"
        label="状态"
        width="120"
        :filters="[{ text: 'Completed', value: '2' }, { text: 'Loading', value: '1' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
        >
        <template slot-scope="scope">
          <el-tag
            :type='getTagType(scope.row.task_status)'
            disable-transitions
            >
            <!-- {{ scope.row.task_status === '1' ? 'Loading' : 'Completed' }} -->
            {{ getTaskStatus(scope.row.task_status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150">
        <template slot-scope="scope" style="text-align:center">
          <el-button-group>
            <el-button @click="handleClick(scope.row.ID)" :disabled="isDisabled(scope.row.task_status)" type="success" size="small">预览</el-button>
            <el-button @click="downLoadExcel(scope.row.ID)" :disabled="isDisabled(scope.row.task_status)" type="primary" size="small">下载</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 25, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total='totalItem'
        >
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import EVENTBUS from '@/eventBus'
  export default {
    data: function(){
      return{
        tableData: [],
        totalItem: 0,
        totalPage: 0,
        currentPage: 1,
      }
    },
    mounted: function () {
      this.getTaskList(1);
      this.getdata(1);
      this.updateList();
    },
    methods: {
      updateList() {
        EVENTBUS.$on('updateList', siteValue => {
          this.getTaskList(1);
        });//提交任务后刷新列表
      },

      getdata(task_id) {
        var url = '/GetSingleManualTaskDetail';
        this.$axios({
          methods: 'get',
          url: url,
          params: {
            task_id: task_id
          }
        })
        .then(function (response) {
        })
        .catch(error => {
          console.log(error);
        })
      },

      handleClick(row) {
        var url = './review.html?a=' + row;
        window.open(url);
      },

      filterTag(value, row) {
        return row.task_status === value;
      },

      filterTag2(value, row) {
        return row.task_type === value;
      },

      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
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
        })
        .then(function (response) {
          that.tableData = response.data.data;
          that.totalItem = response.data.totalItem;
          that.totalPage = response.data.totalPage;

        })
        .catch(error => {
          console.log(error);
        })
      },

      downLoadExcel(reg) {
        var url = '/DownloadTaskReportAsExcel?task_id=' + reg;
        window.location.href = url;
      },
      getTaskStatus(type){
        switch(type){
          case "0":
            return "已提交"
          case "1":
            return "进行中"
          case "2":
            return "已完成"
          case "3":
            return "已删除"
        }
      },

      getTaskType(type){
        switch(type){
          case "0":
            return "Subseries基本信息"
          case "1":
            return "Subseries详细信息"
          case "2":
            return "Model基本信息"
          case "3":
            return "Model详细信息"
        }
      },

      getTagType(type){
        switch (type) {
          case "0":
            return "success"
          case "1":
            return "info"
          case "2":
            return "warning"
          case "4":
            return ""
        }
      },

      isDisabled(status){
        switch(status){
          case "0":
            return true
          case "1":
            return true
          case "2":
            return false
          case "3":
            return true
        }
      },
    }
  }
</script>

<style scoped>
  #resultList {
    margin: auto;
    padding-left: auto;
    width: 90%;
  }
  .pagination {
    margin-top: 10px;
    text-align: center;
  }
</style>
