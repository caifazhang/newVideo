<template>
  <div>
    <CatePlay :catelist="cate" :title="title" />
  </div>
</template>

<script>
import request from "../apis/axios";
import CatePlay from "../components/CatePlay.vue";
export default {
  data() {
    return {
      query: "",
      cate: [],
      title: "",
    };
  },
  created() {
    this.getCate();
  },
  methods: {
    getCate() {
      this.query = this.$route.query;
      this.query;

      this.$toast.loading({
        message: "玩命加载中...",
        // 禁止穿透点击
        forbidClick: true,
        // 提示时间, 0：表示没有时间限制
        duration: 3000,
      });

      request.getCateid(this.query.cateid).then((res) => {
        this.cate = res.data.data;
        this.title = this.cate[0].cates[0].catename;
        this.$toast.clear();
      });
    },
  },
  components: {
    CatePlay,
  },
};
</script>
