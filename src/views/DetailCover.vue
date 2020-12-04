<template> 

  <div class="detail-cover" v-if="Object.keys(format).length !== 0">
    <van-nav-bar title="详情" left-arrow fixed @click-left="closeDetailCover" />
    <h2 class="format-title">{{ title }}</h2>
    <div class="format" v-for="(item, index) in formatList" :key="index">
      <div v-if="formatList">
        <p v-html="parseLink(item)"></p>
      </div>
    </div>
    <div class="username">by {{ username }}</div>
  </div>
</template>

<script>
import "../assets/scss/detailCover.scss";
export default {
  props: ["format", "title", "username"],
  data() {
    return {
      attr: [],
      formatList: [],
    };
  },
  created() {
    this.$nextTick(()=>{
      this.show();
    })
  },
  methods: {
    closeDetailCover() {
      this.$emit("close-detail-cover");
    },
    parseLink(str) {
      var arr = str.match(/\[a: href="[^\\（]+" content="[^\\（]+"\]/g);

      if (arr) {
        var Parsed = arr.map((element) => {
          var tmp = element.split(" ");
          tmp.shift();
          return tmp.map((str) => {
            var patt = /".+"/;
            return patt.exec(str)[0].replace('"', "");
          });
        });
        var y = str.split(/\[a: href="[^\\（]+" content="[^\\（]+"\]/g);
        y.forEach((element, index) => {
          if (Parsed[index]) {
            y[index] =
              element + `<a href="${Parsed[index][0]}">${Parsed[index][1]}</a>`;
          }
        });
        return y.join();
      }
      return str;
    },
    show() {
     let list = [];
     this.format.map( v => {
       if(v.content != undefined) {
         list.push(v.content);
       }
     })
    this.formatList = list;
    }
  },
};
</script>

