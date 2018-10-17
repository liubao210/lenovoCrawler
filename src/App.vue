<template>
  <div id="app">
    <!--<router-view></router-view>-->
    <el-container><!--elementUi 主容器-->
      <el-main><!--elementUi main容器-->
        <mySelect></mySelect><!--选择菜单-->
        <transition name="el-fade-in"><!--渐变-->
          <tabControlSelect></tabControlSelect><!--第二级选择菜单-->
        </transition>
        <submitButton></submitButton><!--提交按钮-->
        <div id="resultHolder">
          <tabControlResult></tabControlResult><!--页面切换-->
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import mySelect from "@/components/mySelect"
import submitButton from '@/components/submitButton'
import tabControlResult from '@/components/tabControlResult'
import tabControlSelect from '@/components/tabControlSelect'
export default {
  name: 'App',
  components: {
    mySelect,
    submitButton,
    tabControlResult,
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
