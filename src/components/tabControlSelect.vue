<template>
  <div>
    <transition name="el-zoom-in-top">
      <div id="tabControlSelect" v-show='isActive'><!--绑定样式，激活与未激活-->
          <el-tabs tab-position=left style="height: 200px;">
            <el-tab-pane
              v-for='(splitter) in splitterLables'
              :key='splitter.splitterKey'
              :label='splitter.splitterNames'>  <!--display splitter list-->
              <span
                v-for='(brand, index) in splitter.brandNames'>    <!--display brand list-->
                {{ brand }}
              </span>
            </el-tab-pane>
          </el-tabs>
      </div>
    </transition>
  </div>
</template>
<script>
  import EVENTBUS from '@/eventBus'
  export default {
    data() {
      return {
        isActive : false,
        tabPosition: 'left',
        splitterLables: [
          {
            splitterNames:'Desktop',
            splitterKey: 1001,
            brandNames: [
              'ThinKPad',
              'Yoga',
              'IdeaPad',
            ],
          },
          {
            splitterNames: 'WorkStation',
            splitterKey: 1002,
            brandNames: [
              'ThinkStation',
              'ThinkServer',
            ],
          },
        ],
      };
    },
    created() {
      this.activateTabSelect()
    },
    methods: {
      activateTabSelect() {
        EVENTBUS.$on('activatingTabSelect', siteValue => {
          (isNaN(parseInt(siteValue)))?this.isActive = false :this.isActive = true;
        })
      }
    },
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
</style>
