<template>
  <div class="albumList">
    <van-nav-bar title="专题" left-arrow fixed @click-left="goBack" />
    <div v-for="(item, index) in album" :key="index">
      <div class="item">
        <router-link
          :to="{ name: 'Play', params: { id: item.postid } }"
          key="{item.postid}"
        >
          <img :src="item.image" />
          <div class="info">
            <span class="title">专题</span>
            <h3>{{ item.title }}</h3>
            <h5>{{ item.app_fu_title }}</h5>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../apis/axios";
import "../assets/scss/album.scss";
export default {
  name: "Album",
  data() {
    return {
      query: "",
      album: [],
    };
  },
  created() {
    this.getCate();
  },
  methods: {
    getCate() {
      this.query = this.$route.query;
      let options = { p: 1, size: 10 };
      if (this.query.tab) {
        options.tab = this.query.tab;
      } else {
        options.id = this.query.cateid;
      }
      this.$toast.loading({
        message: "玩命加载中...",
        // 禁止穿透点击
        forbidClick: true,
        // 提示时间, 0：表示没有时间限制
        duration: 3000,
      });
      const hotFromLocal = window.localStorage.getItem("hot_list");
      if (hotFromLocal && JSON.parse(hotFromLocal).expire > Date.now()) {
        this.album = JSON.parse(hotFromLocal).data;
        this.$toast.clear();
      } else {
        request.getPostInCate(options).then((res) => {
          this.album = res.data.data;
          (this.album);

          this.$toast.clear();
          window.localStorage.setItem(
            "album_list",
            JSON.stringify({
              data: res.data.data,
              expire: Date.now() + 2 * 60 * 60 * 1000,
            })
          );
        });
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
