<template>
  <div class="vm-search">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <div class="vm-search-hot">
      <h3>热门搜索</h3>
      <ul class="hot-list">
        <li
          v-for="(item, index) in keywords"
          :key="index"
          @click="goSearchDetail(item.kw)"
        >
          {{ item.kw }}
        </li>
      </ul>
    </div>
    <div class="vm-search-history">
      <div class="history-title">
        <h6>搜索历史</h6>
        <h6 @click="emptySearch">清除<span class="icon-uniE900"></span></h6>
      </div>
      <ul class="history-list">
        <li
          v-for="(i, index) in historyList"
          :key="index"
          @click="goSearchDetail(i)"
        >
          {{ i }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import request from "../apis/axios";
import "../assets/scss/search.scss";
export default {
  data() {
    return {
      value: "", // 输入框的值
      keywords: "", // 热门搜索
      historyList: [], // 历史搜索记录，存本地
    };
  },
  created() {
    this.SearchIndex();
  },
  mounted() {
    // 如果本地存储的数据historyList有值，直接赋值给data中的historyList;
    if (JSON.parse(localStorage.getItem("historyList"))) {
      this.historyList = JSON.parse(localStorage.getItem("historyList"));
    }
  },
  methods: {
    // 搜索
    onSearch() {
      if (this.value == "") {
        Toast("请输入内容");
        return;
      } else {
        //  Toast(val);
        // 没有搜索记录，把搜索值push进数组首位，存入本地
        if (!this.historyList.includes(this.value)) {
          this.historyList.unshift(this.value);
          localStorage.setItem("historyList", JSON.stringify(this.historyList));
        } else {
          // 有搜索记录，删除之前的旧记录将新搜索值push到数组首位
          let i = this.historyList.indexOf(this.value);
          this.historyList.splice(i, 1);
          this.historyList.unshift(this.value);
          localStorage.setItem("historyList", JSON.stringify(this.historyList));
        }

        this.$router.push({
          name: "Order",
          query: {
            kw: this.value,
          },
        });
      }
    },
    onCancel() {
      this.$router.push({ name: "Find" });
    },
    // 点击历史搜索，跳转搜索结果页面
    goSearchDetail(title) {
      this.$router.push({
        name: "Order",
        query: {
          kw: title,
        },
      });
    },
    // 清空历史记录
    emptySearch() {
      Toast("清空历史搜索成功");
      localStorage.removeItem("historyList");
      this.historyList = [];
    },
    SearchIndex() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      const searchFromLocal = window.localStorage.getItem("search_keywords");
      if (searchFromLocal && JSON.parse(searchFromLocal).expire > Date.now()) {
         this.$toast.clear();
         this.keywords = JSON.parse(searchFromLocal).data;
      } else {
        request.getSearchIndex().then((res) => {
          this.$nextTick(() => {
            this.keywords = res.data.data.recommend_keywords;
            this.$toast.clear();
          });
          window.localStorage.setItem(
            "search_keywords",
            JSON.stringify({
              data: res.data.data.recommend_keywords,
              expire: Date.now() + 2 * 60 * 60 * 1000,
            })
          );
        });
      }
    },
  },
};
</script>
