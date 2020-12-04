<template>
  <div class="todaylist" v-if="today" :class="{ col: col }">
    <div class="selection-title">
      <h1 v-if="today.selection_title">
        {{ today ? today.selection_title : "" }}
      </h1>
      <span v-show="col" @click="goState(today.selection_title)">more</span>
    </div>
    <div class="item" v-for="(item, index) in today.list" :key="index">
      <router-link
        :to="{ name: 'Play', params: { id: item.postid } }"
        key="{item.postid}"
      >
        <img :src="item.image" alt="" />
        <div class="info" v-for="cate in item.cates" :key="cate.cateid">
          <span>{{ cate.catename }}</span>
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
</template>

<script>
export default {
  props: ["today", "col"],
  data() {
    return {
      id: "",
      list: [],
      loading: false,
    };
  },
  methods: {
    goState(title) {
      if(title == "热门") {
        this.$router.push({name: 'HotList'})
      } else {
        this.$router.push({name: 'Album'})
      }
    }
  },
};
</script>

<style lang="scss">
.todaylist {
  background-color: #010101;

  .selection-title {
    position: relative;
    h1 {
      padding: 15px 0;
      text-align: center;
      font-size: 14px;
      color: #ffffff;
    }

    span {
      color: #adaaaa;
      position: absolute;
      right: 5px;
      top: 15px;
    }
  }

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
        line-height: 2em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  &.col {
    overflow: hidden;
    .item {
      &:not(:nth-child(2)) {
        max-width: 50%;
        float: left;

        .info {
          span {
            font-size: 12px;
          }
          h3 {
            font-size: 13px
          }
        }
      }
    }
  }
}
</style>
