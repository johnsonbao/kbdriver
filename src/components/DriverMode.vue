<template>
  <el-row class="tac">
    <el-col :span="18">
      <el-row id="device-show-box" v-bind:style="{height: lay_h_show + 'px'}">
        <cms-device v-bind="device" v-bind:scale="lay_show_scale"></cms-device>
        <el-radio-group v-model="layer" style="position:absolute;bottom:.5rem;left:1rem;">
          <el-radio-button label="Layer1">
          </el-radio-button>
          <el-radio-button label="Layer2">
          </el-radio-button>
          <el-radio-button label="Layer3">
          </el-radio-button>
          <el-radio-button label="Layer4">
          </el-radio-button>
          <el-radio-button label="Layer5">
          </el-radio-button>
        </el-radio-group>
        <el-radio-group v-model="layeroper" style="position:absolute;bottom:.5rem;right:1rem;">
          <el-radio-button label="Layeradd">
            <i class="el-icon-plus"></i>
          </el-radio-button>
          <el-radio-button label="Layerdelete">
            <i class="el-icon-delete"></i>
          </el-radio-button>
          <el-radio-button label="Layerdownload">
            <i class="el-icon-download"></i>
          </el-radio-button>
          <el-radio-button label="Layerupload">
            <i class="el-icon-upload2"></i>
          </el-radio-button>
        </el-radio-group>
      </el-row>

      <el-row id="device-keys-box" v-bind:style="{height: lay_h_keys + 'px'}">
        <cms-keyset></cms-keyset>
      </el-row>
    </el-col>
    <el-col :span="6">
      <el-row id="device-sets-box" v-bind:style="{height: lay_h_les + 'px'}">
        <cms-lelist v-bind="les" v-bind:height="lay_h_les_list"></cms-lelist>
      </el-row>

      <el-row id="device-sets-box" v-bind:style="{height: lay_h_macros + 'px'}">
        <cms-macrolist v-bind="macros" v-bind:height="lay_h_macros_list" style="position:absolute;bottom:0;width:100%;"></cms-macrolist>
      </el-row>
    </el-col>
  </el-row>
</template>

<style>
#device-show-box{
  background-color: rgba(30,30,30,.4);
}
#device-keys-box{
  background-color: rgba(50,50,50,.4);
}
#device-sets-box{
  background-color: rgba(80,80,80,.4);
}
</style>

<script>
let mainboxh = document.getElementById("mainbox").offsetHeight;
let mainboxw = document.getElementById("mainbox").offsetWidth;
import Device from '~/components/Device'
import KeySet from '~/components/KeySet'
import Lelist from '~/components/Lelist'
import Macrolist from '~/components/Macrolist'
export default {
  data () {
    return {
      mainh: mainboxh,
      mainw: mainboxw,
      layer: "layer1",
      layeroper: "",
      les: {
        lelist: this.GLOBAL.CMS.les
      },
      macros: {
        macrolist: this.GLOBAL.CMS.macros
      },
      device: {
        keymap: [],
        scale: mainboxw/24*18/1200
      }
    }
  },
  mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
        that.mainh = document.getElementById("mainbox").offsetHeight
        that.mainw = document.getElementById("mainbox").offsetWidth
      })()
    }
  },
  watch: {
    mainh (valh) {
      this.mainh = valh
    },
    mainw (valw) {
      this.mainw = valw
    }
  },
  components: {
    'cms-device': Device,
    'cms-keyset': KeySet,
    'cms-lelist': Lelist,
    'cms-macrolist': Macrolist
  },
  computed: {
    lay_show_scale: function(){
      return this.mainw/24*18/1200
    },
    lay_h_show: function(){
      return this.mainh/5*3
    },
    lay_h_keys: function(){
      return this.mainh/5*2
    },
    lay_h_les: function(){
      return this.mainh/2
    },
    lay_h_macros: function(){
      return this.mainh/2
    },
    lay_h_les_list: function(){
      return this.mainh/2-48-28*3
    },
    lay_h_macros_list: function(){
      return this.mainh/2-48-28*3
    }
  },
  methods: {
    
  }
}
</script>