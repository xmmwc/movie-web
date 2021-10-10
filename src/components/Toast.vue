<template>
  <transition name="fade">
    <div class="toast" v-if="toast.msg">{{ toast.msg }}</div>
  </transition>
</template>
<script>
import toast from '../lib/toast'

export default {
  data () {
    return {
      toast
    }
  }
}
</script>
<style lang="scss">
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba($color: #000000, $alpha: 0.65);
  color: #fff;
  border-radius: 10px;
  font-size: 12px;
  padding: 7.5px 12.5px;
  text-align: center;
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 200;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
