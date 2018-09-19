<template>
  <div id="app">
    <el-container><!--elementUi 外层主容器-->
      <el-main><!--elementUi 外层容器-->
        <mySelect></mySelect><!--选择菜单-->
        <submitButton></submitButton>
        <div id="resultHolder">
            <tabControl></tabControl><!--页面切换-->
        </div>


      </el-main>
    </el-container>
  </div>
</template>

<script>
import mySelect from "@/components/mySelect"
//import resultList from '@/components/resultList'
import submitButton from '@/components/submitButton'
import tabControl from '@/components/tabControl'
export default {
  name: 'App',
  components: {
    mySelect,
    //resultList,
    submitButton,
    tabControl,
  },
}
</script>

<style>
  #resultHolder {
    margin: auto;
    border-radius: 10px;
    width: 100%;
    min-height: 900px;
    background-color: #EBEEF5;
    overflow: hidden;
  }
</style>
