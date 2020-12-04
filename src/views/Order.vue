<template>
  <div class="order">
    <form action="/" class="search-box">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @clear="goSearch"
        @cancel="goSearch"
        @search="onSearch"
      />
    </form>
    <div class="total" v-if="list.total > 0">{{ list.total }}个相关影片</div>
    <PostsList :today="list" />
  </div>
</template>

<script>
import request from "../apis/axios";
import PostsList from "../components/PostsList";
export default {
  name: "Order",
  data() {
    return {
      value: "",
      keyword: "",
      list: [],
    };
  },
  created() {
    let kw = this.$route.query.kw;
    this.keyword = kw;
    this.getSearchOrder();
  },
  methods: {
    //  回到搜索
    goSearch() {
      this.$router.push({ name: "Search" });
    },
    onSearch() {
      this.$router.push({
        name: "Order",
        query: {
          kw: this.value,
        },
      });
    },
    getSearchOrder() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });
      request.getSearchOrder(this.keyword).then((res) => {
          this.$nextTick(()=> {
              this.list = res.data.data.result;
               this.$toast.clear();
          })
      });
    },
  },
  components: {
    PostsList,
  },
};
</script>

<style lang="scss" scoped>
.order {
  .search-box {
    padding: 10px 12px;
  }

  color: #979797;
  min-height: 100vh;
  background-color: #1a1a1a;

  /deep/ .van-search {
    padding: 0;
    background-color: transparent;
  }

  /deep/ .van-search__action {
    color: gray;
    background-color: #1a1a1a;
  }
  /deep/ .van-search__content {
    background-color: #252525;
  }

  /deep/ .van-cell {
    color: #838383;
  }

  /deep/ .van-cell__value--alone {
    color: white;
  }

  /deep/ .van-field__control {
    color: #ffffff;
  }

  .total {
    padding: 10px 12px;
    line-height: 16px;
    font-size: 12px;
    color: white;
  }
}
</style>
