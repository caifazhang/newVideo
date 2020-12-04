<template>
  <div id="app">
      <router-view :key='$route.fullPath' />
  </div>
</template>

<script>
export default {
  name: 'App',
  // beforeCreate() {
  //   let likes = localStorage.getItem('likes');

  //   if(!likes) {
  //     localStorage.setItem('likes',JSON.stringify([]));
  //   }
  // },
}
</script>

<style lang="scss">
#app {
  // background-color: #161616;
  margin: 0;
  padding: 0;
}
a.router-link-exact-active {
  font-weight: normal;
  color: #ffffff !important;
  border-bottom: 2px solid #ffffff;
}

.fl {
  float: left;
}

.fr {
  float: left;
}

.clearfix {
  clear: both;
}
</style>
