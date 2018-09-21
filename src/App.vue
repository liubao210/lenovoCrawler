<template>
  <div id="app">
    <el-container><!--elementUi 外层主容器-->
      <el-main><!--elementUi 外层容器-->
        <mySelect></mySelect><!--选择菜单-->
        <submitButton></submitButton>
        <tabControlSelect></tabControlSelect>
        <div id="resultHolder">
          <tabControl></tabControl><!--页面切换-->
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import mySelect from "@/components/mySelect"
import submitButton from '@/components/submitButton'
import tabControl from '@/components/tabControl'
import tabControlSelect from '@/components/tabControlSelect'
export default {
  name: 'App',
  components: {
    mySelect,
    submitButton,
    tabControl,
    tabControlSelect,
  },
}
</script>

<style>
  #resultHolder {
    margin: auto;
    border-radius: 10px;
    width: 100%;
    padding-bottom: 120px;
    background-color: #EBEEF5;
    overflow: hidden;
  }
</style>
