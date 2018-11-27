<template>
  <el-row>
    <el-col :span="12">
      <el-row v-for="prop in settingdata.props" >
        <el-col :span="8" align="right">
          <p class="item-title">{{ prop.title }} :</p>
        </el-col>
        <el-col :span="16" align="left">
          <p class="item-info">{{ prop.val }}</p>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="12">
      <el-row v-for="setting in settingdata.settings">
        <el-col :span="8" align="right">
          <p class="item-title">{{ setting.title }} :</p>
        </el-col>
        <el-col :span="16" align="center">
          <p class="item-setting">

            <el-select v-if="setting.type === 'select'" v-model="setting.val">
              <el-option
                v-for="item in setting.opts"
                :key="item.value"
                :label="item.title"
                :value="item.val">
              </el-option>
            </el-select>

            <el-button v-if="setting.type === 'button'" :icon="setting.icon" :loading="setting.isloading" @click="setting.isloading = !setting.isloading">{{ setting.text }}</el-button>

            <el-radio-group v-if="setting.type === 'radio'" v-model="setting.val">
              <el-radio-button v-for="item in setting.opts" :label="item.val">{{ item.title }}</el-radio-button>
            </el-radio-group>

          </p>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<style>
.item-title, .item-info {
  font-size: 1.2rem;
  line-height: 2.8rem;
}
.item-title {
  color: #888;
}
.item-info {
  color: #bbb;
  padding-left: 1rem;
}
.item-setting {
  color: #d0d0d0;
  padding-left: 1rem;
  padding-right: 1rem;
}
.item-setting .el-button {
  width: 100%;
}
.el-select {
    width: 100%;
}
</style>

<script>
  export default {
    data () {
      return {
        settingdata: {
          props: [
            {title: "软件版本", val: "V8.0.0"},
            {title: "当前机型", val: "PG-K11-104-RGB"},
            {title: "固件版本", val: "V1.0.0"},
            {title: "灯效分类", val: "104"},
            {title: "更新日期", val: "2018-11-7"},
            {title: "更新说明", val: "修复了若干bug修复了若干bug"},
          ],
          settings: [
            {
              title: "语言",
              val: 0,
              type: 'select',
              opts: [
                {title: '简体中文', val: 0},
                {title: '繁体中文', val: 1},
                {title: '英语', val: 2},
                {title: '意大利', val: 3}
              ]
            },
            {
              title: "显示大小",
              val: 0,
              type: 'select',
              opts: [
                {title: '1024*768', val: 0},
                {title: '1280*960', val: 1},
                {title: '1600*1200', val: 2},
                {title: '1920*1440', val: 3}
              ]
            },
            {
              title: "当前设备",
              val: "0",
              type: "button",
              text: '恢复出厂设置',
              clickevent: 0,
              icon: 'el-icon-setting',
              isloading: false
            },
            {
              title: "更新灯效",
              val: "0",
              type: "button",
              text: '检测灯效更新',
              clickevent: 0,
              icon: 'el-icon-refresh',
              isloading: false
            },
            {
              title: "自动更新",
              val: "0",
              type: "radio",
              opts: [
                {title: '开启', val: 0},
                {title: '关闭', val: 1}
              ]
            },
            {
              title: "检测更新",
              val: "0",
              type: "button",
              text: '检测软件更新',
              clickevent: 0,
              icon: 'el-icon-upload',
              isloading: false
            },
          ],
        },
      }
    },
    methods: {
      startHacking () {
        this.$notify({
          title: 'It works!',
          type: 'success',
          message: 'It\'s time for you to build something epic!',
          duration: 2000,
          position: 'bottom-right'
        })
      }
    }
  }
</script>