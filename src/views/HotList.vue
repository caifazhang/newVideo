<template>
  <div class="hotList">
    <van-nav-bar title="热门" left-arrow fixed @click-left="goBack" />
    <div class="item" v-for="(item, index) in hot" :key="index">
      <div>
        <router-link
          :to="{ name: 'Play', params: { id: item.postid } }"
          key="{item.postid}"
        >
          <img :src="item.image" alt="" />
          <div class="info" v-for="cate in item.cates" :key="cate.cateid">
            <span>{{ cate.catename }}</span>
            <span class="dur">
              {{ item.duration | TimeMinutes }}'{{
                item.duration | TimeSeconds
              }}"</span
            >
            <h3>{{ item.title }}</h3>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../apis/axios";
export default {
  name: "Album",
  data() {
    return {
      query: "",
      hot: [],
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
        this.hot = JSON.parse(hotFromLocal).data;
        this.$toast.clear();
      } else {
        request.getPostInCate(options).then((res) => {
          this.hot = res.data.data;
          this.$toast.clear();
          window.localStorage.setItem(
            "hot_list",
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

<style lang="scss" scoped>
.hotList {
  padding-top: 46px;
  .van-nav-bar {
    background-color: #0c0101;
  }

  /deep/ .van-hairline--bottom::after {
    border: none;
  }

  /deep/ .van-nav-bar .van-icon {
    color: #ffffff;
  }

  /deep/ .van-nav-bar__title {
    color: #ffffff;
  }

  .item {
    position: relative;
    img {
      max-width: 100%;
      vertical-align: middle;
      filter: brightness(0.6);
    }
    .info {
      position: absolute;
      bottom: 0;
      left: 0;
      color: white;
      padding: 0 15px;
      width: calc(100% - 30px);
      span {
        &.dur {
          &::before {
            margin: 0 10px;
            content: "/";
          }
        }
      }
      h3 {
        margin: 0;
        line-height: 3em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
      }
    }
  }
}
</style>
