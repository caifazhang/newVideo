<template>
  <div class="tabs">
    <span class="icon-fanhui" @click="goBack"></span>
    <div class="title">{{title}}</div>
    <div> </div>
  </div>
</template>

<script>
export default {
    props: ['title'],
    methods: {
      goBack() {
        this.$router.go(-1);
      }
    },
}
</script>

<style lang="scss" scoped>
.tabs {
  position: fixed;
  z-index: 999;
  top: 0px;
  left: 0;
  right: 0;

  display: flex;
  height: 40px;
  line-height: 40px;
  justify-content: space-between;
  background-color: #010101;
  color: #ffffff;

  .icon-fanhui {
      font-size: 21px;
      display: block;
      line-height: 40px;
      margin-left: 5px;
  }
  .title {
      margin-right: 10px;
  }
}
</style>
