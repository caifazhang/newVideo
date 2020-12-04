<template>
  <div class="vm-find" v-if="banner">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in banner" :key="index">
        <router-link :to="{ name: 'Play', params: { id: item.id } }">
          <img :src="item.image" class="images" height="200px" />
        </router-link>
      </van-swipe-item>
    </van-swipe>
    <PostsList :today="indexData.today" />
    <PostsList :today="indexData.hot" :col="true" />
    <PostsList :today="indexData.album" :col="true" />
    <PostsList :today="indexData.posts" />
  </div>
</template>

<script>
import PostsList from "../components/PostsList";
import request from "../apis/axios";
export default {
  // 主页
  name: "Find",
  data() {
    return {
      indexData: [],
      banner: [],
      id: "",
    };
  },
  created() {
    this.$nextTick(()=> {
      this.getHomeFind();
    })
  },
  methods: {
    getHomeFind() {
      this.$toast.loading({
        message: "玩命加载中...",
        // 禁止穿透点击
        forbidClick: true,
        // 提示时间, 0：表示没有时间限制
        duration: 3000,
      });
      const findFromLocal = window.localStorage.getItem("Find");
      if (findFromLocal && JSON.parse(findFromLocal).expire > Date.now()) {
        this.$toast.clear();
        this.indexData = JSON.parse(findFromLocal).data;
        this.banner = this.indexData.banner.list;
        this.banner.map((v) => {
          let { app_banner_param } = v.extra_data;
          v.id = app_banner_param.slice(0, 5);
        });
        
      } else {
        request.getHomeFind().then((res) => {
          this.$toast.clear();
          this.indexData = res.data.data;
          this.banner = this.indexData.banner.list;
          this.banner.map((v) => {
            let { app_banner_param } = v.extra_data;
            v.id = app_banner_param.slice(0, 5);
          });
          window.localStorage.setItem(
            "Find",
            JSON.stringify({
              data: res.data.data,
              expire: Date.now() + 2 * 60 * 60 * 1000,
            })
          );
        });
      }
    },
  },

  components: {
    PostsList,
  },
};
</script>

<style lang="scss">
.van-swipe {
  margin-top: 40px;
  .van-swipe-item {
    display: inline-block;
    .images {
      width: 100%;
      background-size: 100% 100%;
      vertical-align: top;
    }
  }

  .van-swipe__indicators {
    .van-swipe__indicator {
      width: 12px;
      height: 2px;
    }

    .van-swipe__indicator--active {
      background-color: #ddd6cc;
    }
  }
}
</style>
