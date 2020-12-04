<template>
  <div class="likes">
    <van-nav-bar title="收藏" left-arrow fixed @click-left="goBack" />
    <div class="like-list">
      <div class="item" v-for="(item, index) in likeData" :key="index">
        <div>
          <router-link
            :to="{ name: 'Play', params: { id: item.id } }"
            key="{item.id}"
          >
            <img :src="item.image" alt="" />
            <div class="info">
              <span>{{ item.catename }}</span>
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
    <div v-if="emptyShow" class="empty">
      <van-empty description="目前还没有收藏哦~">
        <van-button round color="#0c0101" class="bottom-button" @click="goHome">
          去发现新天地
        </van-button>
      </van-empty>
    </div>
  </div>
</template>

<script>
export default {
  name: "Like",
  data() {
    return {
      likeData: [],
      emptyShow: false,
    };
  },
  created() {
    this.getLike();
  },
  methods: {
    goHome() {
      this.$router.push({ name: "Find" });
    },
    goBack() {
      this.$router.go(-1);
    },
    getLike() {
      let like = JSON.parse(localStorage.getItem("likes"));
      if (!like) {
        this.emptyShow = true;
        return;
      }
      this.likeData = like;
    },
  },
};
</script>

<style lang="scss" scoped>
.likes {
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

  .like-list {
    padding-top: 46px;

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
}
</style>
