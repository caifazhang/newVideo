<template>
  <div class="my">
    <div
      class="my-bg"
      v-if="userInfo.userBg"
      :style="{ backgroundImage: `url('${userInfo.userBg}')` }"
    >
      <van-uploader class="upload-box" :after-read="uploadBg" />
    </div>

    <div v-else :style="backgrundCover">
      <van-uploader class="upload-box" :after-read="uploadBg" />
    </div>

    <div class="content">

        <div class="my-info">
          <div class="my-img">
            <img
              v-if="userInfo.userImg"
              class="auto-img"
              :src="userInfo.userImg"
              alt=""
            />
            <img
              class="person"
              v-else
              src="../assets/images/person.jpg"
              alt=""
            />
          </div>
          <div class="my-info-box">
            <div v-if="userInfo.nickName" class="user-name">
              {{ userInfo.nickName }}
            </div>
            <div v-else class="user-name block" @click="goPage('Login')">
              去登陆
            </div>

            <div class="user-desc" v-if="userInfo.desc">
              个性签名:
              {{
                userInfo.desc == ""
                  ? "这家伙很懒，什么也没有留下！"
                  : userInfo.desc
              }}
            </div>

            <div class="user-desc" v-else>
              个性签名: 这家伙很懒，什么也没有留下！
            </div>
          </div>

          <div class="me-content">
            <ul class="content-list clearfix">
              <li
                class="van-hairline--top"
                v-for="(item, index) in contentList"
                :key="index"
                @click="goPage(item.name)"
              >
                <span :class="item.icon"></span>
                <span>{{ item.title }}</span>
                <span class="icon-shezhi-youjiantou"></span>
              </li>
            </ul>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import "../assets/scss/me.scss";

export default {
  name: "Me",
  data() {
    return { 
      contentList: [
        {
          icon: "icon-gerenziliao",
          title: "个人资料",
          name: "Account",
        },

        {
          icon: "icon-shoucang",
          title: "我的收藏",
          name: "Like",
        },
        {
          icon: "icon-kaiqihuancun",
          title: "离线缓存",
          name: "Download",
        },
        {
          icon: "icon-lishi",
          title: "播放历史",
          name: "History",
        },
        {
          icon: "icon-caichananquan",
          title: "安全中心",
          name: "Secure",
        },
      ],
      //用户信息
      userInfo: {},
      backgrundCover: {
        backgroundImage: "url(" + require("../assets/images/bg.jpg") + ")",
        backgroundRepeat: "no-repeat",
        height: "55.55vw",
        backgroundSize: "100% 100%",
      },
    };
  },
  created() {
    //获取用户信息
    this.getUserInfo();
  },

  methods: {
    //获取用户信息
    getUserInfo() {
      let tokenString = localStorage.getItem("__tk");

      if (!tokenString) {
        return this.$router.push({ name: "Me" });
      }

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        method: "GET",
        url: "http://www.kangliuyong.com:10002/findMy",
        params: {
          appkey: this.appkey,
          tokenString,
        },
      })
        .then((result) => {
          this.$toast.clear();
          // ("getUserInfo result ==> ", result);
          if (result.data.code == 700) {
            //token检验无效,则跳到登录页面
            this.$router.push({ name: "Login" });
          } else if (result.data.code == "A001") {
            this.userInfo = result.data.result[0];
          }
        })
        .catch(() => {
          this.$toast.clear();
        });
    },

    //上传背景
    uploadBg(file) {
      // ('file ==> ', file);
      //允许文件类型
      let type = ["gif", "png", "jpg", "jpeg"];

      //允许最大文件大小 1MB
      let size = 1;

      //判断文件类型
      let fileType = file.file.type.split("/")[1];
      if (type.indexOf(fileType) === -1) {
        this.$toast(`文件类型只支持${type.join(",")}`);
        return;
      }

      //判断文件大小 B, 1024B = 1KB, 1024KB = 1MB
      let fileSize = file.file.size / 1024 / 1024;
      "fileSize ==> ", fileSize;
      if (fileSize > size) {
        this.$toast(`文件允许最大不能超过${size}MB`);
        return;
      }

      //处理base64的标记data:image/jpeg;base64,
      let base64 = file.content.replace(/^data:image\/[A-Za-z]+;base64,/, "");
      // ('base64 ==> ', base64);

      //发起请求
      let tokenString = localStorage.getItem("__tk");

      if (!tokenString) {
        //跳回登录页面
        this.$toast("请先登录");
        return this.$router.push({ name: "Login" });
      }

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        method: "POST",
        url: "http://www.kangliuyong.com:10002/updateUserBg",
        data: {
          appkey: this.appkey,
          tokenString,
          imgType: fileType,
          serverBase64Img: base64,
        },
      })
        .then((result) => {
          this.$toast.clear();
          "uploadBg result ==> ", result;
          if (result.data.code == 700) {
            //token检验无效,则跳到登录页面
            this.$router.push({ name: "Login" });
          } else if (result.data.code == "I001") {
            this.userInfo.userBg = result.data.userBg;
          }

          this.$toast(result.data.msg);
        })
        .catch(() => {
          this.$toast.clear();
        });
    },

    goPage(name) {
      this.$router.push({ name });
    },
  },
  components: {
    
  },
};
</script>
