<template>
  <div class="vm-series">
    <BackNav title="自制" />
    <div class="series-list" v-for="(item, index) in series" :key="index">
      <img v-lazy="item.image" alt="" />
      <h2>{{ item.title }}</h2>
      <p class="update">
        已更新至{{ item.update_to }} {{ item.follower_num }}人订阅
      </p>
      <p class="content">{{ item.content }}</p>
    </div>
  </div>
</template>

<script>
import request from "../apis/axios";
import BackNav from "../components/BackNav";
import "../assets/scss/series.scss";
export default {
  data() {
    return {
      series: [],
    };
  },
  created() {
    this.getSeries();
  },
  methods: {
    getSeries() {
      request.getCateListSeries().then((res) => {
        this.series = res.data.data;
      });
    },
  },
  components: {
    BackNav,
  },
};
</script>
