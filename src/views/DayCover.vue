<template>
  <div class="vm-cover" v-if="cover">
    <div
      class="cover-bg"
      :style="{
        backgroundImage: 'url(' + image + ')',
        backgroundSize: '100% 100%',
        filter: 'blur(10px)',
      }"
    ></div>
    <span class="icon-shanchu" @click="closeCover"></span>
    <div class="cover-share">
      <img v-lazy="cover.image" alt="" />
      <div class="cover-share-day">
        <span class="share-day">{{ time.day }}</span>
        <span class="share-time">{{ time.month }}.<br />{{ time.week }}</span>
      </div>
      <h3 class="cover-share-title">{{ cover.title }}</h3>
      <p class="cover-share-content">{{ cover.content }}</p>
      <span class="icon-shangchuan" @click="showShare = true"></span>
    </div>
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
  </div>
</template>

<script>
import request from "../apis/axios";
import "../assets/scss/daycover.scss";
export default {
  data() {
    return {
      cover: {},
      time: [],
      image: "",
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],
    };
  },
  created() {
    this.getCoverFromServer();
  },
  methods: {
    closeCover() {
      this.$router.go(-1);
    },
    getCoverFromServer() {
      const coverListFromLocal = window.localStorage.getItem("cover");
      if ( coverListFromLocal && JSON.parse(coverListFromLocal).expire > Date.now() )  {
        this.cover = JSON.parse(coverListFromLocal).data;
        this.time = this.cover.time;
        this.image = this.cover.image;
      } else {
       request.getDayCover().then((res) => {
          if (res.status === 200) {
            this.cover = res.data.data;
            this.time =  this.cover.time;
            this.image =  this.cover.image

            window.localStorage.setItem("cover",
              JSON.stringify({
                data: res.data.data,
                expire: Date.now() + 2 * 60 * 60 * 1000,
              })
            );
          }
        })
      }
    },
    onSelect() {
      this.showShare = false;
    }
  },
};
</script>

