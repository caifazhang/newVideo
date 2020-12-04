import axios from "axios";

const url = "http://api.kele8.cn/agent/https://app.vmovier.com/apiv3";

const instance = axios.create({
  timeout: 30000,
});

const request = {
  // 发现页
  getHomeFind() {
    return instance.get(`${url}/index/index`);
  },
  // 每日海报
  getDayCover() {
    return instance.get(`${url}/DayCover/getDayCover`);
  },
  // 频道页
  getCateList() {
    return instance.get(`${url}/cate/getList`);
  },
  // 前天数据
  getYesterday(id) {
    return instance.get(`${url}/index/getIndexPosts/lastid/${id}`);
  },
  // 视频播放详情信息
  getDetailByPostId(id) {
    return instance.get(`${url}/post/view?postid=${id}`);
  },
  getPostInCate(options) {
    if (!options) {
      return new Promise((resolve, reject) => reject());
    }

    const params = {
      p: options.p ? options.p : 1,
      size: options.size ? options.size : 10,
    };

    if (options.tab) {
      params.tab = options.tab;
    } else {
      params.id = options.id;
    }

    return instance.get(`${url}/post/getPostByTab`, { params });
  },
  // 频道cateid分类
  getCateid(val) {
    return instance.get(`${url}/post/getPostInCate?cateid=${val}`);
  },
  getCateListSeries() {
    return instance.get(`${url}/series/getList`  );
  },
  // 搜索页
  getSearchIndex(value) {
    return instance.get(`${url}/search?kw=${value}`);
  },
  getSearchOrder(keyword) {
    return instance.get(`${url}/search/index/kw/${keyword}`);
  }
};
export default request;