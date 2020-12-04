<template>
  <div class="vm-play" v-if="Object.keys(detail).length !== 0">
    <header>
      <video
        width="100%"
        :src="detail.content_video[0].source_link"
        :poster="image"
        preload="metadata"
        controls
        :style="{ height: '55vw' }"
      ></video>
    </header>
    <section>
      <div class="info">
        <h1>{{ detail.title }}</h1>
        <div class="like">
          <van-goods-action-icon
            icon="like"
            :text="isLike ? '喜欢' : ''"
            :color="isLike ? '#dd5145' : '#646566'"
            @click="toggleLikeProduct"
          />
        </div>
        <div class="type" v-if="detail.cate">
          <span v-for="(v, index) in detail.cate" :key="index">{{ v }}</span>
          <span class="line">/</span>
          <span class="dur"
            >{{ detail.duration | TimeMinutes }}'{{
              detail.duration | TimeSeconds
            }}"</span
          >
        </div>
        <p>{{ detail.intro }}</p>
        <h3
          @click="showDetailCoverFunc"
          v-if="detail.format_content.length != 0"
        >
          阅读全文→
        </h3>
        <van-divider />
      </div>
    </section>
    <section
      class="relate"
      v-for="(relate, index) in detail.relate_video"
      :key="index"
    >
      <div class="title">
        <h3>{{ relate.name }}</h3>
        <span @click="goCate">more</span>
      </div>
      <ul class="relate-list">
        <li
          class="relate-item"
          v-for="(item, index) in relate.list"
          :key="index"
          @click="show(item.postid)"
        >
          <div class="thumb">
            <img :src="item.image" />
            <span class="duration">
              {{ item.duration | TimeMinutes }}'{{
                item.duration | TimeSeconds
              }}"
            </span>
            <h5>{{ item.title }}</h5>
          </div>
        </li>
      </ul>
    </section>
    <section class="comment">
      <div class="rating" v-if="comment">
        <van-collapse v-model="activeNames">
          <van-collapse-item title="查看评论">
            <div class="rating-count" v-if="comment.total.length > 0">
              {{ comment.total }} 条评论
            </div>
            <div
              class="rating-content"
              v-for="(item, index) in list"
              :key="index"
            >
              <div class="userinfo">
                <div class="user">
                  <div class="avatar">
                    <img :src="item.info.avatar" alt="" />
                    <span class="time">{{ item.time }}</span>
                  </div>
                  <span class="username">{{ item.info.username }}</span>
                </div>
                <div class="count-approve">
                  <van-icon name="good-job-o" class="good" />
                  <span class="count">{{ item.approve }}</span>
                </div>
              </div>
              <p>{{ item.text }}</p>
              <div class="subcomment" v-if="item.subcomment">
                <div
                  class="sub-userinfo"
                  v-for="(i, k) in item.subcomment"
                  :key="k"
                >
                  <div class="user">
                    <div class="avatar">
                      <img :src="i.userinfo.avatar" alt="" />
                      <span class="time">{{ i.addtime }}</span>
                    </div>
                    <span class="username">{{ i.userinfo.username }}</span>
                  </div>
                  <div class="count-approve">
                    <van-icon name="good-job-o" size="16px" class="good" />
                    <span class="count">{{ i.count_approve }}</span>
                  </div>
                  <p class="sub-txt">
                    <span v-if="i.reply_userinfo"
                      >回复
                      <a href="javascript:void(0)" class="reply-user">{{
                        i.reply_userinfo.username
                      }}</a
                      >：</span
                    >
                    {{ i.content }}
                  </p>
                </div>
              </div>
              <van-divider />
            </div>
            <div class="end">- End -</div>
          </van-collapse-item>
        </van-collapse>
      </div>
    </section>

    <transition name="fade">
      <DetailCover
        v-show="showDetailCover"
        :format="detail.format_content"
        :title="detail.title"
        :username="detail.editor.username"
        @close-detail-cover="hiddenDetailCoverFunc"
      />
    </transition>
  </div>
</template>

<script>
import request from "../apis/axios";
import DetailCover from "./DetailCover";
import "../assets/scss/play.scss";
export default {
  data() {
    return {
      pid: "",
      detail: [],
      sourceLink: "",
      image: "",
      comment: [],
      list: [],
      showDetailCover: false,
      isLike: false,
      activeNames: ["1"],
      video: [],
    };
  },
  created() {
    this.pid = this.$route.params.id;
    this.getDetailPostId();
    
    
    if(localStorage.getItem('likes')) {
      let id = JSON.parse(localStorage.getItem('likes'));
      for(let i = 0 ; i < id.length  ; i++){
      if(id[i].id == this.pid) {
        this.isLike = true;
        break;
      } 
    }
    }
  },

  
  methods: {
    show(postId) {
      this.$router.push({
        name: "Play",
        params: {
          id: postId,
        },
      });
    },
    getDetailPostId() {
      this.$toast.loading({
        message: "玩命加载中...",
        // 禁止穿透点击
        forbidClick: true,
        // 提示时间, 0：表示没有时间限制
        duration: 3000,
      });
      request.getDetailByPostId(this.pid).then((res) => {
        this.$toast.clear();
        this.detail = res.data.data;
        this.image = this.detail.content_video[0].image;
        this.comment = this.detail.comment;
        let data = [];
        for (let i = 0; i < this.comment.list.length; i++) {
         data.push({
            time: this.comment.list[i].addtime,
            text: this.comment.list[i].content,
            approve: this.comment.list[i].count_approve,
            info: this.comment.list[i].userinfo,
            subcomment: this.comment.list[i].subcomment,
          });
        }
        this.list = data;
        
      });
    },
    showDetailCoverFunc() {
      this.showDetailCover = true;
    },
    hiddenDetailCoverFunc() {
      this.showDetailCover = false;
    },
    goCate() {
      this.$router.push({ name: "Cate" });
    },

    toggleLikeProduct() {
      let tk = localStorage.getItem("__tk");
      if(!tk) {
        this.$toast("请先登录！")
        this.$router.push({ name: "Login" });
        return;
      }
      
      this.isLike = !this.isLike;
      if (this.isLike) {
        let likes = localStorage.getItem("likes");
        likes = likes ? JSON.parse(likes) : [];
        if(!likes.includes(this.pid)){
          likes.push({
            id: this.pid,
            image: this.image,
            title: this.detail.title,
            duration: this.detail.duration,
            catename: this.detail.cate[0]
          });
        }
        localStorage.setItem("likes", JSON.stringify(likes));
      } else {
        let likes = JSON.parse(localStorage.getItem("likes"));
        let index = likes.findIndex((item) => item.id == this.pid);
        if (index !== -1) {
          likes.splice(index, 1);
        }
        localStorage.setItem("likes", JSON.stringify(likes));
      }

    },

  },
  components: {
    DetailCover,
  },
};
</script>
