<template>
  <div id="app">
    <el-container><!--elementUi 外层主容器-->
      <el-main><!--elementUi 外层容器-->
        <mySelect></mySelect><!--选择菜单-->
        <submitButton></submitButton><!--提交爬取申请的按钮-->
        <div id="resultHolder">
          <!--<resultList></resultList>结果列表通过按钮添加-->
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import mySelect from "@/components/mySelect"
import resultList from '@/components/resultList'
import submitButton from '@/components/submitButton'
export default {
  name: 'App',
  components: {
    mySelect,
    resultList,
    submitButton,
  },
}
</script>

<style>
</style>
