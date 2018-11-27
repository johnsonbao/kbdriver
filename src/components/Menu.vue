<template>
  <el-row class="tac">
  <el-col :span="24">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      mode="horizontal"
      router
      unique-opened
      @open="handleOpen"
      @close="handleClose"
      active-text-color="#00c2ff">
      <el-menu-item v-for="(item,index) in $router.options.routes" :index="item.path" :disabled="item.disable" v-if="item.visible">
        <i :class="item.icon"></i>
        <span slot="title">{{$t("menu")[item.lang]}}</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
</template>

<style scoped>
  .over-hide{
    overflow: hidden;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none;
    background: none;
  }
  .el-dropdown-menu__item--divided:before, .el-menu, .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
    background-color: transparent;
  }
</style>

<script>
  import menu from '~/config/menu'
  export default {
    data () {
      return {
        menu: menu
      }
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>