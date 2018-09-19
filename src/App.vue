<template>
  <div id="app">
    <el-container><!--elementUi 外层容器-->
      <el-main><!--elementUi 外层容器-->
        <mySelect></mySelect><!--选择菜单-->
        <submitButton></submitButton>
        <resultList></resultList><!--结果列表-->
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
