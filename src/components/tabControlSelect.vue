<template>
  <div id="tabControlSelect">
    <el-tabs tab-position=left style="height: 200px;">
      <el-tab-pane
        v-for='(splitter) in splitterLables'
        :label='splitter.splitterNames'>
        <span
          v-for='(brand, index) in splitter.brandNames'>
          {{ brand }}
        </span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        selectedIndex: 0,
        tabPosition: 'left',
        splitterLables: [
          {
            splitterNames:'Desktop',
            brandNames: [
              'ThinKPad',
              'Yoga',
              'IdeaPad',
            ],
          },
          {
            splitterNames: 'WorkStation',
            brandNames: [
              'ThinkStation',
              'ThinkServer',
            ],
          },

        ],
      };
    }
  };
</script>

<style scoped>
  #tabControlSelect {
    margin: auto;
    margin-top: 30px;
    margin-bottom: 30px;
    background-color: #EBEEF5;
    padding: 5px;
    border-radius: 10px;
  }
  .el-tabs__content {
  }
</style>
