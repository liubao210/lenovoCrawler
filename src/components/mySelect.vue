<template>
  <div id="mySelect">
    <h1>Web Crawler</h1>
    <div class="select">
      <el-select v-model="siteValue" @change="changeSite" placeholder="请选择Site">
        <el-option
          v-for="item in siteList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="splitterValue" clearable :disabled=isSplitterDisabled placeholder="请选择Spliter">
        <el-option
          v-for="item in splitterList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="brandValue" clearable :disabled=isBrandDisabled placeholder="请选择Brand">
        <el-option
          v-for="item in brandlist"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
  export default {
  name: "myselect",
  data() {
  return {
    isSplitterDisabled: true,
    isBrandDisabled: true,
    selectedOptions: [],
    siteValue:'',
    index1:'',
    splitterValue:'',
    index2:'',
    brandValue:'',
    index3:'',
    splitterList:[],
    brandlist:[],
    siteList: [
      {
        url: "japan.com",
        value: 0,
        label: "japan",
        children: [
          {
            url: "jp.laptop.com",
            value:0,
            label: "laptop",
            children: []
          },
          {
            url: "jp.deskyop.com",
            value:1,
            label: "desktop",
            children: []
          }
        ]
      },
      {
        url: "korea.com",
        value: 0,
        label: "korea",
        children: [
          {
            url: "ko.laptop.com",
            value:0,
            label: "laptop",
            children: []
          },
          {
            url: "ko.desktop.com",
            value:1,
            label: "desktop",
            children: []
          }
        ]
      }
    ],
    props: {
      value: 'value',
      label: 'label',
      children: 'children'
    },
    serieslist: [],
    subserieslist: []
  }
  },
  methods: {
  handleChange(value) {
    // console.log(value);
  },
  handleItemChange(val) {
    console.log('active item:', val);
    // console.log(this.siteList[0]);
    this.siteList[0].children[0].children = [
      {
        value: "thinkpad.com",
        label: "thinkpad",
      },
    ]
  },
  changeSite(val){
    //console.log(val)
    this.isSplitterDisabled = false
    this.splitterList = this.siteList[val].children
    //console.log(this.splitterList)
  },
  }
  }
</script>

<style scoped>
  #mySelect {
    text-align: center;
    margin-bottom: 5px;
    }

</style>
