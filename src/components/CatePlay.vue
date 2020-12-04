<template>
  <div class="cateplay" v-if="catelist">
    <van-nav-bar :title="title" left-arrow fixed @click-left="goBack" v-if="title" />
    <div>
      <div class="item" v-for="(item, index) in catelist" :key="index">
        <router-link
          :to="{ name: 'Play', params: { id: item.postid } }"
          key="{item.postid}"
        >
          <img :src="item.image" alt="" />
          <div class="info" v-for="(i, k) in item.cates" :key="k">
            <span>{{ i.catename }}</span>
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
import "../assets/scss/cateplay.scss";
export default {
  props: ["catelist","title"],
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
