<template>
  <div class="contains">

    <!--<tree-table ref="recTree" :list.sync="treeDataSource" @actionFunc="actionFunc" @deleteFunc="deleteFunc" @handlerExpand="handlerExpand" @orderByFunc="orderByFunc"></tree-table>-->
    <!--<tree-table ref="recTree" :list.sync="reportJson" @actionFunc="actionFunc" @deleteFunc="deleteFunc" @handlerExpand="handlerExpand" @orderByFunc="orderByFunc"></tree-table>-->
    <tree-table ref="recTree" :list.sync="reportJson2" @actionFunc="actionFunc" @deleteFunc="deleteFunc" @handlerExpand="handlerExpand" @orderByFunc="orderByFunc"></tree-table>
  </div>
</template>
<script>
// import dataJson from './data.json'
import reportJson from './Test-Report-1.json'
import treeTable from './components/tree-table.vue'
export default {
  data() {
    return {
      reportJson: reportJson.spliter_arr,
      reportJson2: [],
      testReportJson: [],
      // treeDataSource: dataJson,
    }
  },
  components: {
    treeTable
  },
  mounted:function() {
    console.log(this.treeDataSource)
    this.getdata()
    this.getTaskId()
    // this.jsonParse()
  },
  methods: {
    getTaskId() {
      var url = window.location.search;
      // alert(url.length);
      // alert(url.lastIndexOf('='));
      var loc = url.substring(url.lastIndexOf('=')+1, url.length);
      // alert(loc)
    },
    getdata() {
      var url = '/GetSingleManualTaskDetail';
      var that =this;
      var Now_url = window.location.search;
      var task_id = Now_url.substring(Now_url.lastIndexOf('=')+1, Now_url.length);
      this.$axios({
        methods: 'get',
        url: url,
        params: {
          task_id: task_id
        }
      }).then(function (response) {
        console.log(response);
        that.testReportJson = response.data.task_report.spliter_arr
        console.log(that.reportJson2)
        var replace_str =  JSON.stringify(response).replace(/brand_arr/g,"children")
        // replace_str =  JSON.stringify(response).replace(/spliter_arr/g,"children")
        replace_str =  replace_str.replace(/subseries_arr/g,"children")
        replace_str =  replace_str.replace(/series_arr/g,"children")
        replace_str =  replace_str.replace(/models_arr/g,"children")
        console.log(JSON.parse(replace_str))
        that.reportJson2 = JSON.parse(replace_str).data.task_report.spliter_arr
        console.log(that.reportJson2)
        // this.testReportJson = response.data.scope_json.spliter_arr
      }).catch(error=>{
        console.log(error);
      })
    },
    // jsonParse() {
    //   alert("sad")
    //   var replace_str =  JSON.stringify(this.reportJson2).replace(/brand_arr/g,"children")
    //   console.log(replace_str)
    //   this.reportJson2 = JSON.parse(replace_str)
    //   console.log(this.reportJson2)
    // },
    orderByFunc(val) {
      alert('排序')
      alert(val)
    },
    actionFunc(m) {
      alert('编辑')
    },
    deleteFunc(m) {
      alert('删除')
    },
    handlerExpand(m) {
      console.log('展开/收缩')
      m.isExpand = !m.isExpand
    }
    // getTreeData() {
    //   // 取父节点
    //   let parentArr = this.list.filter(l => l.parentId === 0)
    //   this.treeDataSource = this.getTreeData(this.list, parentArr)
    // },
    // // 这里处理没有children结构的数据
    // getTreeData(list, dataArr) {
    //   dataArr.map((pNode, i) => {
    //     let childObj = []
    //     list.map((cNode, j) => {
    //       if (pNode.Id === cNode.parentId) {
    //         childObj.push(cNode)
    //       }
    //     })
    //     pNode.children = childObj
    //     if (childObj.length > 0) {
    //       this.getTreeData(list, childObj)
    //     }
    //   })
    //   return dataArr
    // }
  }
}
</script>

<style>
.contains {
    width: 100%;
    margin: 15px auto;
}
</style>
