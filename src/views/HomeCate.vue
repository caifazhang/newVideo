<template>
  <div class="vm-cate">
    <div class="catelist">
      <van-row>
        <van-col
          v-for="(cate, index) in cateList"
          :key="index"
          @click="goSeries(cate)"
        >
          <img v-lazy="cate.icon" alt="" />
          <h3>{{ cate.catename }}</h3>
        </van-col>
      </van-row>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import request from "../apis/axios";
import "../assets/scss/cate.scss";
export default {
  name: "Cate",
  data() {
    return {
      cateList: "",
    };
  },
  created() {
    this.$toast.loading({
      message: "玩命加载中...",
      // 禁止穿透点击
      forbidClick: true,
      // 提示时间, 0：表示没有时间限制
      duration: 0,
    });
    this.getCateFromServer();
    (this.cateList);
  },
  methods: {
    getCateFromServer() {
      const cateListFromLocal = window.localStorage.getItem("cateList");
      if (
        cateListFromLocal &&
        JSON.parse(cateListFromLocal).expire > Date.now()
      ) {
        this.cateList = JSON.parse(cateListFromLocal).data;
        this.$toast.clear();
      } else {
        request.getCateList().then((res) => {
          // 启动加载提示
          this.$nextTick(() => {
            if (res.status === 200) {
              this.$toast.clear();
              this.cateList = res.data.data;
              window.localStorage.setItem(
                "cateList",
                JSON.stringify({
                  data: res.data.data,
                  expire: Date.now() + 2 * 60 * 60 * 1000,
                })
              );
            }
          });
        });
      }
    },
    goSeries(cate) {
      if (cate.cate_type === "0") {
        this.$router.push({ path: `/catelist?cateid=${cate.cateid}` });
      } else {
        switch (cate.tab.toLowerCase()) {
          case "hot":
            this.$router.push({ path: "/hotlist?tab=hot" });
            break;
          case "album":
            this.$router.push({ path: `/album?tab=album` });
            break;
          case "series":
            this.$router.push({ path: `/series` });
            break;
        }
      }
    },
  },

  components: {},
};
</script>
