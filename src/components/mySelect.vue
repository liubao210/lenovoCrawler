<template>
  <div id="mySelect">
    <h1><span>Lenovo</span>Crawler</h1>
    <intro></intro>
    <div>
      <table>
        <tr>
          <th>Site</th>
        </tr>
        <tr>
          <td><el-select
            v-model="siteValue"
            @change=changeSite
            placeholder="请先选择站点">
            <el-option
              v-for="item in siteList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select></td>
        </tr>
      </table>
      <table>
        <tr>
          <td><el-radio v-model="taskType" label='0' @change='changeTaskType'>subseries基本信息</el-radio></td>
          <td><el-radio v-model="taskType" label='1' @change='changeTaskType'>subseries详细信息</el-radio></td>
          <td><el-radio v-model="taskType" label='2' @change='changeTaskType'>model基本信息</el-radio></td>
          <td><el-radio v-model="taskType" label='3' @change='changeTaskType'>model详细信息</el-radio></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import EVENTBUS from '@/eventBus.js'
  import intro from '@/components/intro_dialog'
  export default {
    name: "mySelect",
    components: {
      intro,
    },
    data() {
      return {
        /*placeholderSpliterStatus:'请先选择Site',
        placeholderBrandStatus:'请先选择Site',
        isSpliterDisabled: true,
        isBrandDisabled: true,
        spliterValue:null,
        brandValue:null,
        spliterList:[],//有接口后通过后台的爬虫获得
        brandlist:[],//根据spliterList，通过后台爬虫获得*/
        taskType: null,
        siteValue: null,//每个site的索引值，后期可以考虑将其重命名为siteIndex来语义化
        //静态的站点资料，其children数组是查询spliter与brand所需要的参数
        siteList: [
          {
            value: 0,
            label: "Algeria (DZ)",
            children: [
              {
                region: 'MEA',
                cc: 'dz',
                lc: 'fr',
              },
            ]
          },
          {
            value: 1,
            label: "Angola (AO)",
            children: [
              {
                region: 'MEA',
                cc: 'ao',
                lc: 'en',
              }
            ]
          },
          {
            value: 2,
            label: 'Australia (AU)',
            children: [
              {
                region: 'ANZ',
                cc: 'au',
                lc: 'en',
              }
            ],
          },
          {
            value: 3,
            label: 'Belarus (BY)',
            children: [
              {
              	region: 'RUCIS',
              	cc: 'by',
              	lc: 'ru',
              }
            ],
          },
          {
            value: 4,
            label: 'Bulgaria (BG)',
            children: [
              {
              	region: 'EET',
              	cc: 'bg',
              	lc: 'bg',
              }
            ],
          },
          {
            value: 5,
            label: 'Croatia (HR)',
            children: [
              {
              	region: 'EET',
              	cc: 'hr',
              	lc: 'hr',
              }
            ],
          },
          {
            value: 6,
            label: 'Czech Republic (CZ)',
            children: [
              {
              	region: 'EET',
              	cc: 'cz',
              	lc: 'cs',
              }
            ],
          },
          {
            value: 7,
            label: 'Egypt (EG)',
            children: [
              {
              	region: 'MEA',
              	cc: 'eg',
              	lc: 'en',
              }
            ],
          },
          /*{
            value: 8,
            label: 'Germany (DE)',
            children: [],
          },罗睿说germany不用管*/
          {
            value: 9,
            label: 'Ghana (GH)',
            children: [
              {
              	region: 'MEA',
              	cc: 'gh',
              	lc: 'en',
              }
            ],
          },
          {
            value: 10,
            label: 'Greece (GR)',
            children: [
              {
              	region: 'EET',
              	cc: 'gr',
              	lc: 'el',
              }
            ],
          },
          {
            value: 11,
            label: 'Hong Kong (HK)',
            children: [
              {
              	region: 'CAP',
              	cc: 'hk',
              	lc: 'zf',
              }
            ],
          },
          {
            value: 12,
            label: 'Hong Kong(EN) (HK)',
            children: [
              {
              	region: 'CAP',
              	cc: 'hk',
              	lc: 'en',
              }
            ],
          },
          {
            value: 13,
            label: 'Hungary (HU)',
            children: [
              {
              	region: 'EET',
              	cc: 'hu',
              	lc: 'hu',
              }
            ],
          },
          {
            value: 14,
            label: 'Indonesia (ID)',
            children: [
              {
              	region: 'CAP',
              	cc: 'id',
              	lc: 'in',
              }
            ],
          },
          {
            value: 15,
            label: 'Greece (GR)',
            children: [
              {
              	region: 'EET',
              	cc: 'gr',
              	lc: 'el',
              }
            ],
          },
          {
            value: 16,
            label: 'Japan (JP)',
            children: [
              {
              	region: 'JP',
              	cc: 'jp',
              	lc: 'ja',
              }
            ],
          },
          {
            value: 17,
            label: 'Jordan (JO)',
            children: [
              {
              	region: 'MEA',
              	cc: 'jo',
              	lc: 'en',
              }
            ],
          },
          {
            value: 18,
            label: 'Kazakhstan (KZ)',
            children: [
              {
              	region: 'RUCIS',
              	cc: 'kz',
              	lc: 'ru',
              }
            ],
          },
          {
            value: 19,
            label: 'Kenya (KE)',
            children: [
              {
              	region: 'MEA',
              	cc: 'ke',
              	lc: 'en',
              }
            ],
          },
          {
            value: 20,
            label: 'Korea (KR)',
            children: [
              {
              	region: 'CAP',
              	cc: 'kr',
              	lc: 'ko',
              }
            ],
          },
          {
            value: 21,
            label: 'KSA (SA)',
            children: [
              {
              	region: 'EMA',
              	cc: 'sa',
              	lc: 'en',
              }
            ],
          },
          {
            value: 22,
            label: 'Lebanon (LB)',
            children: [
              {
              	region: 'MEA',
              	cc: 'lb',
              	lc: 'en',
              }
            ],
          },
          {
            value: 23,
            label: 'Macedonia (MK)',
            children: [
              {
              	region: 'EET',
              	cc: 'mk',
              	lc: 'mk'
              }
            ],
          },
          {
            value: 24,
            label: 'Malaysia (MY)',
            children: [
              {
              	region: 'CAP',
              	cc: 'my',
              	lc: 'en',
              }
            ],
          },
          {
            value: 25,
            label: 'Moldova (MD)',
            children: [
              {
              	region: 'RUCIS',
              	cc: 'md',
              	lc: 'ru',
              }
            ],
          },
          {
            value: 26,
            label: 'Morocco (MA)',
            children: [
              {
                region: 'MEA',
                cc: 'ma',
                lc: 'fr',
              }
            ],
          },
          {
            value: 27,
            label: 'New Zealand (NZ)',
            children: [
              {
              	region: 'ANZ',
              	cc: 'nz',
              	lc: 'en',
              }
            ],
          },
          {
            value: 28,
            label: 'Nigeria (NG)',
            children: [
              {
              	region: 'MEA',
              	cc: 'ng',
              	lc: 'en',
              }
            ],
          },
          {
            value: 29,
            label: 'Pakistan (PK)',
            children: [
              {
              	region: 'MEA',
              	cc: 'pk',
              	lc: 'en',
              }
            ],
          },
          {
            value: 30,
            label: 'Philippines (PH)',
            children: [
              {
              	region: 'CAP',
              	cc: 'ph',
              	lc: 'en',
              }
            ],
          },
          {
            value: 31,
            label: 'Poland (PL))',
            children: [
              {
              	region: 'EET',
              	cc: 'pl',
              	lc: 'pl',
              }
            ],
          },
          {
            value: 32,
            label: 'Romania (RO)',
            children: [
              {
              	region: 'EET',
              	cc: 'ro',
              	lc: 'ro',
              }
            ],
          },
          {
            value: 33,
            label: 'Russia (RU)',
            children: [
              {
              	region: 'RUCIS',
              	cc: 'ru',
              	lc: 'ru',
              }
            ],
          },
          {
            value: 34,
            label: 'South Africa (ZA)',
            children: [
              {
              	region: 'MEA',
              	cc: 'za',
              	lc: 'en',
              }
            ],
          },
          {
            value: 35,
            label: 'Taiwan (TW)',
            children: [
              {
              	region: 'CAP',
              	cc: 'tw',
              	lc: 'zh',
              }
            ],
          },
          {
            value: 36,
            label: 'Tanzania (TZ)',
            children: [
              {
              	region: 'MEA',
              	cc: 'tz',
              	lc: 'en',
              }
            ],
          },
          {
            value: 37,
            label: 'Thailand (TH)',
            children: [
              {
              	region: 'CAP',
              	cc: 'th',
              	lc: 'th',
              }
            ],
          },
          {
            value: 38,
            label: 'Tunisia (TN)',
            children: [
              {
              	region: 'MEA',
              	cc: 'tn',
              	lc: 'fr',
              }
            ],
          },
          {
            value: 39,
            label: 'Turkey (TR)',
            children: [
              {
              	region: 'EET',
              	cc: 'tr',
              	lc: 'tr',
              }
            ],
          },
          {
            value: 40,
            label: 'UAE (AE)',
            children: [
              {
              	region: 'MEA',
              	cc: 'ae',
              	lc: 'en',
              }
            ],
          },
          {
            value: 41,
            label: 'Ukrain (UA)',
            children: [
              {
              	region: 'RUCIS',
              	cc: 'ua',
              	lc: 'uk'
              }
            ],
          },
          {
            value: 42,
            label: 'Viet Nam (VN)',
            children: [
              {
              	region: 'CAP',
              	cc: 'vn',
              	lc: 'vn',
              }
            ],
          },
        ],
        }
      },
    /*舍弃的级联选择模式
    watch: {
      siteValue: function(){
        (isNaN(parseInt(this.siteValue)))?this.placeholderSpliterStatus='请先选择Site' :this.placeholderSpliterStatus='请选择';
        (isNaN(parseInt(this.spliterValue)))?this.placeholderBrandStatus='请先选择Spliter' :this.placeholderBrandStatus='请选择';
      },
      spliterValue: function(){
        (isNaN(parseInt(this.spliterValue)))?this.placeholderBrandStatus='请先选择Spliter' :this.placeholderBrandStatus='请选择';
      }
    },*/
    methods: {
      /*舍弃的级联选择模式
      handleChange(value) {
         console.log(value);
      },
      handleItemChange(val) {
        console.log('active item:', val);
        this.siteList[0].children[0].children = [
          {
            value: "thinkpad.com",
            label: "thinkpad",
          },
        ]
      }*/
      changeSite(val){
        /*(isNaN(parseInt(this.siteValue)))?this.isSpliterDisabled = true :this.isSpliterDisabled = false;//更改级联选择可选择状态
        this.spliterList = this.siteList[val].children;//给spliter赋值，有接口后通过后台爬虫获得*/
        console.log('The site index is ' + this.siteValue)
        console.log('...Loading...')
        //EVENTBUS.$emit('activatingSubmitButton', this.siteValue)//EVENTBUS传递参数给submitButton，激活submitButton为可选择状态
        //EVENTBUS.$emit('activatingSpliterNbrand', this.siteValue)//EVENTBUS传递参数给spliterNbrand，激活spliterNbrand为可见择状态
        EVENTBUS.$emit('activeGetSpliter', this.siteList[this.siteValue].children[0])//EVENTBUS传递参数给spliterNbrand，激活向后端发送请求
      },
      changeTaskType(){
        EVENTBUS.$emit('changeTaskType' ,this.taskType);
        //console.log(this.taskType);
      },
      /*舍弃的级联选择模式
        changeSpliter(val){
        (isNaN(parseInt(this.spliterValue)))?this.isBrandDisabled = true :this.isBrandDisabled = false;
        this.brandList = this.spliter[val].children;//给brand赋值，有接口后通过后台爬虫获得
      },*/
    }
  }
</script>

<style scoped>
  table {
    margin: auto;
  }
  h1 {
    font-size: 35px;
    color: #1fc8db;
  }
  th {
    font-weight: normal;
    font-size: 10px;
    color: #909399;
  }
  #mySelect {
    text-align: center;
    margin-bottom: 5px;
  }
</style>
