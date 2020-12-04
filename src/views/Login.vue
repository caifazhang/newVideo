<template>
  <div class="login">
    <van-nav-bar left-text="返回" right-text="先体验" @click-right="goBack">
      <template #left>
        <div class="nav-left">
          <div class="logo">
            <img src="../assets/images/Ddianying.png" alt="" />
          </div>
          <b class="logo-text">新天地</b>
        </div>
      </template>
    </van-nav-bar>
    <span class="icon-xiaoniao2 bird"></span>
    <span class="icon-bird bird2">
      <span class="path1"></span><span class="path2"></span>
      <span class="path3"></span><span class="path4"></span>
     <span class="path5"></span><span class="path6"></span >
    </span>
    <span class="icon-dianying movie-icon">
      <span class="path1">
      </span><span class="path2"></span>
    </span>
    <span class="icon-mima pwd"><span class="path1">
      </span><span class="path2"></span>
    </span>
    <House></House>
    <div class="user-box">
      <van-form>
        <van-field
        class="user-phone"
          v-model="userInfo.phone"
          name="手机号"
          left-icon="phone-circle-o"
          placeholder="密码必须为字母开头"
          autocomplete="off"
        />

        <van-field
        class="pwd-inp"
          v-model="userInfo.password"
          :type="isRegisterPassword ? 'password' : 'text'"
          name="密码"
          left-icon="phone-o"
          placeholder="密码必须为字母开头"
          :right-icon="isRegisterPassword ? 'closed-eye' : 'eye-o'"
          autocomplete="off"
          @click-right-icon="toggleRegsiterPasswordType"
        />

        <div class="commit-btn">
          <van-button round block color="#2291e0" @click="login">
            立即登录
          </van-button>
        </div>

        <div class="commit-handle">
          <span class="forgot" @click="goState('Forgot')">忘记密码?</span>
          <span class="liner"></span>
          <span class="commit-btn" @click="toggleRegisterBox"> 立即注册 </span>
        </div>
      </van-form>
    </div>

    <!-- 注册 -->
    <van-popup
      class="register-box"
      v-model="isShow"
      position="bottom"
      closeable
    >
      <div class="register-title">注册</div>
      <van-form>
        <van-field
          v-model="userRegisterInfo.phone"
          name="手机号"
          label="手机号"
          placeholder="11位手机号"
          autocomplete="off"
        />

        <van-field
          v-model="userRegisterInfo.password"
          :type="isRegisterPassword ? 'password' : 'text'"
          name="密码"
          label="密码"
          placeholder="密码必须为字母开头"
          :right-icon="isRegisterPassword ? 'closed-eye' : 'eye-o'"
          autocomplete="off"
          @click-right-icon="toggleRegsiterPasswordType"
        />

        <van-field
          v-model="userRegisterInfo.nickName"
          name="昵称"
          label="昵称"
          placeholder="昵称"
          autocomplete="off"
        />

        <div class="commit-btn register-btn">
          <van-button round block color="#2291e0" @click="register">
            注册
          </van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
//导入外部样式表
import "../assets/scss/login.scss";
import House from "../components/House";
//导入表单验证模块
import { validForm } from "../assets/js/validForm";

export default {
  name: "Login",
  data() {
    return {
      //用户登录信息
      userInfo: {
        phone: "",
        password: "",
      },

      //用户注册信息
      userRegisterInfo: {
        phone: "",
        password: "",
        nickName: "",
      },

      //是否显示注册框
      isShow: false,

      //切换注册密码框的类型
      isRegisterPassword: true,
    };
  },

  methods: {
    //切换注册框
    toggleRegisterBox() {
      this.isShow = true;
    },

    //切换注册密码框的类型
    toggleRegsiterPasswordType() {
      this.isRegisterPassword = !this.isRegisterPassword;
    },

    //注册
    register() {
      //构造表单验证信息
      let o = {
        phone: {
          value: this.userRegisterInfo.phone,
          errorMsg: "手机号格式不正确",
          reg: /^1[3-9]\d{9}$/,
        },
        password: {
          value: this.userRegisterInfo.password,
          errorMsg: "密码由数字字母下划线组合(6-16字符)",
          reg: /^[A-Za-z]\w{5,15}$/,
        },
        nickName: {
          value: this.userRegisterInfo.nickName,
          errorMsg: "昵称由字母数字下划线汉字组合(1-10字符)",
          reg: /^[\w\u4e00-\u9fa5]{1,10}$/,
        },
      };

      let isPass = validForm.valid(o);

      if (isPass) {
        //复制用户注册信息
        let userInfo = Object.assign({}, this.userRegisterInfo);
        userInfo.appkey = this.appkey;

        //启动加载提示
        this.$toast.loading({
          //文本提示
          message: "加载中...",
          //禁止穿透点击
          forbidClick: true,
          //提示时间, 0: 没有时间限制
          duration: 0,
        });

        //发起注册请求
        this.axios({
          //请求类型
          method: "POST",
          //请求路径
          url: "http://www.kangliuyong.com:10002/register",

          //POST请求参数, object
          data: userInfo,
        })
          .then((result) => {
            //关闭加载提示
            this.$toast.clear();

            if (result.data.code == 100) {
              this.isShow = false;
            } else {
              //如果注册失败，手机被注册了
              this.$toast(result.data.msg);
            }

            //
          })
          .catch(() => {
            //关闭加载提示
            this.$toast.clear();
          });
      }
    },

    //登录
    login() {
      if (this.$route.params.to && localStorage.getItem("__tk")) {
        this.$router.replace(this.$route.params.to);
      } 

      //构造表单验证信息
      let o = {
        phone: {
          value: this.userInfo.phone,
          errorMsg: "手机号格式不正确",
          reg: /^1[3-9]\d{9}$/,
        },
        password: {
          value: this.userInfo.password,
          errorMsg: "密码由数字字母下划线组合(6-16字符)",
          reg: /^[A-Za-z]\w{5,15}$/,
        },
      };

      let isPass = validForm.valid(o);

      if (isPass) {
        //发起登录请求
        //复制用户注册信息
        let userInfo = Object.assign({}, this.userInfo);
        userInfo.appkey = this.appkey;

        this.$toast.loading({
          message: "加载中...",
          forbidClick: true,
          duration: 0,
        });

        //发起注册请求
        this.axios({
          //请求类型
          method: "POST",
          //请求路径
          url: "http://www.kangliuyong.com:10002/login",

          //POST请求参数, object
          data: userInfo,
        })
          .then((result) => {
            this.$toast.clear();

            if (result.data.code == 200) {
              //登录成功
              //保存token, 以便后面验证登录
              localStorage.setItem("__tk", result.data.token);

              //其他操作
              this.$router.go(-1)
            } else {
              this.$toast(result.data.msg);
            }
          })
          .catch(() => {
            this.$toast.clear();
          });
      }
    },

    //跳转页面
    goState(name) {
      this.$router.push({ name });
    },

    goBack() {
      this.$router.go(-1);
    }
    
  },
  components: {
    House,
  },
};
</script>
