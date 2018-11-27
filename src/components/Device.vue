<template>
  <div class="device">
    <div class="device-panel" 
    :style="{'width': 1200*scale + 'px', 'height': 600*scale + 'px'}">
    </div>
    <div class="device-keycap" 
    :style="{'width': 1200*scale + 'px', 'height': 600*scale + 'px'}">
    </div>
    <div class="device-outline" 
    :style="{'width': 1200*scale + 'px', 'height': 600*scale + 'px'}">
    </div>
    <div class="device-key" v-for="key in showkeymap" :style="{'left': key.Position.Left + 'px', 'top': key.Position.Top + 'px', 'width': key.Position.Width + 'px', 'height': key.Position.Height + 'px'}">
      <span></span>
    </div>
  </div>
</template>

<style>
.device{
  position: relative;
  z-index: 0;
}
.device .device-panel{
  position: absolute;
  background-image: url('../devices/655491217/img/device_panel.png');
  background-size: 100% 100%;
  z-index: 0;
}
.device .device-keycap{
  position: absolute;
  background-image: url('../devices/655491217/img/device_keycap.png');
  background-size: 100% 100%;
  z-index: 1;
}
.device .device-outline{
  position: absolute;
  background-image: url('../devices/655491217/img/device_outline.png');
  background-size: 100% 100%;
  z-index: -1;
}
.device-key{
  position: absolute;
  text-align: center;
  text-overflow: hidden;
  background-color: green;
  display: table;
  border: .1rem solid #181818;
  border-radius: .6rem;
  box-shadow:0 0 1rem #313131 inset;  
  z-index: 0;
}
.device-key span{
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  width: 100%;
  height: 100%;
  z-index: 12;
}
</style>

<script>
import keymapdata from '~/devices/655491217/data/keymap.js'
export default {
  data () {
    return {
      deviceid: 655491217,
      keymap: keymapdata
    }
  },
  props: ['scale'],
  computed: {
    showkeymap: function(){
      let scale = this.scale;
      let showkeymapdata = [];
      for(let i=0;i<this.keymap.length;i++){
        let tempkeydata = JSON.parse(JSON.stringify(this.keymap[i]));
        tempkeydata.Position.Top = this.keymap[i].Position.Top * scale;
        tempkeydata.Position.Left = this.keymap[i].Position.Left * scale;
        tempkeydata.Position.Width = this.keymap[i].Position.Width * scale;
        tempkeydata.Position.Height = this.keymap[i].Position.Height * scale;
        showkeymapdata.push(tempkeydata);
      }
      return showkeymapdata;
    }
  },
  methods: {
    
  }
}
</script>