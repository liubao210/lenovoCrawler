<template>
    <div>
      <h1>select</h1>
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
//import index from "../router";

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
    brandchange() {
      // var objs = document.getElementById("brand");
      // var brand = objs.options[objs.selectedIndex].getAttribute('value');
      // alert(brand)
      alert("brandchange")
    },
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
      //
      // setTimeout(_ => {
      //   if (val.indexOf('江苏') > -1 && !this.options2[0].cities.length) {
      //     this.options2[0].cities = [{
      //       label: '南京'
      //     }];
      //   } else if (val.indexOf('浙江') > -1 && !this.options2[1].cities.length) {
      //     this.options2[1].cities = [{
      //       label: '杭州'
      //     }];
      //   }
      // }, 300);
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

</style>
