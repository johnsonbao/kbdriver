<template>
<el-row class="tac">
  <el-col :span="18">
    <el-row id="device-show-box" v-bind:style="{height: layout.dshowh + 'px'}">
      here show device image
    </el-row>
    <el-row id="device-keys-box" v-bind:style="{height: layout.dkeysh + 'px'}">
      here show device setting keys
    </el-row>
  </el-col>
  <el-col :span="6">
    <el-row id="device-sets-box" v-bind:style="{height: layout.dsetsh + 'px'}">
      le and macros
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
  export default {
    data () {
      return {
        layout: {
          dshowh: mainboxh/5*3,
          dkeysh: mainboxh/5*2,
          dsetsh: mainboxh
        }
      }
    },
    methods: {
      
    }
  }
</script>