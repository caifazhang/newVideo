<template>
  <div>
    <div class="tabs">
      <div class="vm-header">
        <div class="tab-item" @click="goCover">
          <span class="icon-rili">
            <font>{{ getDay }}</font>
          </span>
        </div>
      </div>
      <div class="tabs-box">
        <router-link to="/main/find" class="tab-item">发现</router-link>
        <router-link to="/main/cate" class="tab-item">频道</router-link>
        <router-link to="/main/me" class="tab-item">我的</router-link>
      </div>

      <div class="tab-item" @click="goSearch">
        <span class="icon-ai219"></span>
      </div>
    </div>

  <!-- 二级路由 -->
  <div>
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
  </div>


  </div>
</template>

<script>
import "../assets/scss/main.scss";
export default {
  name: 'Main',
  computed: {
    getDay() {
      let day =
        new Date().getDate() < 10
          ? "0" + new Date().getDate()
          : new Date().getDate();
      return day;
    },
  },
   methods: {
    goCover() {
      this.$router.push({name: 'DayCover'})
    },
    goSearch() {
      this.$router.push({name: 'Search'})
    }
  },
};
</script>

