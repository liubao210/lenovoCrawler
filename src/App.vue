<template>
  <div id="app">
    <el-container><!--elementUi 主容器-->
      <el-main><!--elementUi main容器-->
        <mySelect></mySelect><!--选择菜单-->
        <splitterNbrand></splitterNbrand><!--第二级选择菜单-->
        <div id="resultHolder">
          <resultHolder></resultHolder><!--页面切换-->
        </div>
      </el-main>
      <el-footer style="width:90%; margin:auto;">
        <foot></foot>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import mySelect from "@/components/mySelect"
import resultHolder from '@/components/resultHolder'
import splitterNbrand from '@/components/splitter_brand'
import foot from '@/components/foot'
export default {
  name: 'App',
  components: {
    mySelect,
    resultHolder,
    splitterNbrand,
    foot,
  },
}
</script>

<style>
  #app {}
  #resultHolder {
    margin: auto;
    border-radius: 10px;
    width: 90%;
    padding-bottom: 120px;
    background-color: #EBEEF5;
    overflow: hidden;
  }
</style>
