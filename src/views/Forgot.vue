<template>
  <div class="forgot">
    <van-nav-bar title="找回密码" left-arrow fixed @click-left="goBack" />

    <div class="user-box">
      <van-form v-show="!isNext">
        <van-field class="email" v-model="userInfo.email" name="邮箱" label="邮箱"  placeholder="请输入邮箱" autocomplete="off" />
        <van-field v-model="userInfo.code"  name="验证码" label="验证码" placeholder="验证码(6个字符)" autocomplete="off" maxlength="6">
           <template #button>
            <van-button size="small" color="#2291e0" :disabled="isSend" @click="getValidCode">{{text}}</van-button>
          </template>
        </van-field>
        
        <div class="commit-btn">
          <van-button @click="next" round block color="#2291e0">
            下一步
          </van-button>
        </div>
      </van-form>


      <van-form v-show="isNext">
        <van-field
          v-model="userInfo.phone"
          name="手机号"
          label="手机号"
          placeholder="请输入手机号"
          autocomplete="off"
        />

        <van-field
          v-model="userInfo.password"
          :type="isRegisterPassword ? 'password' : 'text'"
          name="密码"
          label="密码"
          placeholder="密码必须为字母开头"
          :right-icon="isRegisterPassword ? 'closed-eye' : 'eye-o'"
          autocomplete="off"
          @click-right-icon="toggleRegsiterPasswordType"
        />
        

        <div class="commit-btn">
          <van-button round block color="#2291e0" @click="commit">
            提交
          </van-button>
        </div>
        <div class="commit-btn">
          <van-button round block type="default" @click="back()">
            返回
          </van-button>
        </div>
      </van-form>

    </div>

  </div>
</template>

<script>
  //导入外部样式表
  import '../assets/scss/forgot.scss'

  //导入表单验证模块
  import {validForm} from '../assets/js/validForm'

  export default {
    name: 'Login',
    data() {

      return {
        //用户信息
        userInfo: {
          phone: '',
          password: '',
          email: '',
          code: ''
        },

        //切换注册密码框的类型
        isRegisterPassword: true,

        //是否下一步
        isNext: false,

        //是否发送
        isSend: false,

        text: '发送验证码'
      };
    },

    methods: {

      back(){
        this.isNext = false;
      },
      goBack() {
        this.$router.go(-1);
      },

      //切换注册框
      toggleRegisterBox() {
        this.isShow = true;
      },

      //切换注册密码框的类型
      toggleRegsiterPasswordType() {
        this.isRegisterPassword = !this.isRegisterPassword;
      },

      //下一步
      next() {
        //构造表单验证信息
        let o = {
          email: {
            value: this.userInfo.email,
            errorMsg: '邮箱格式不正确',
            reg: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
          },
          code: {
            value: this.userInfo.code,
            errorMsg: '验证码格式不正确',
            reg: /^[A-Za-z\d]{6}$/
          }
        };

        let isPass = validForm.valid(o);
        if (isPass) {
          //发起验证验证码请求
          //发起获取验证码请求
        this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0
          });

          this.axios({
            //请求类型
            method: 'POST',
            //请求路径
            url: 'http://www.kangliuyong.com:10002/checkValidCode',

            //POST请求参数, object
            data: {
              appkey: this.appkey,
              validCode: this.userInfo.code
            }

          }).then(result => {
            this.$toast.clear();

            this.$toast(result.data.msg);

            if (result.data.code == 'K001') {
              //下一步
              this.isNext = true;
            }
          }).catch(() => {
            this.$toast.clear();
          })  

        }
      },

      //跳转页面
      goState(name) {
        this.$router.push({name});
      },

      //获取邮箱验证码
      getValidCode() {

        //构造表单验证信息
        let o = {
          email: {
            value: this.userInfo.email,
            errorMsg: '邮箱格式不正确',
            reg: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
          }
        };

        let isPass = validForm.valid(o);

        if (!isPass) {
          return;
        }
        

        let time = 60;

        this.isSend = true;
        this.text = `${time}秒后重新发送`;

        let timer = setInterval(() => {
          if (time <= 0) {
            clearInterval(timer);
            timer = null;
            time = 60;
            this.isSend = false
          } else {
            time--;
            this.text = `${time}秒后重新发送`;
          }
        }, 1000)

        //发起获取验证码请求
        this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0
          });

          this.axios({
            //请求类型
            method: 'POST',
            //请求路径
            url: 'http://www.kangliuyong.com:10002/emailValidCode',

            //POST请求参数, object
            data: {
              appkey: this.appkey,
              email: this.userInfo.email
            }

          }).then(result => {
            this.$toast.clear();
            this.$toast(result.data.msg);
          }).catch(() => {
            this.$toast.clear(); 
          })  
      },

      //提交
      commit() {
        //构造表单验证信息
        let o = {
          phone: {
            value: this.userInfo.phone,
            errorMsg: '手机号格式不正确',
            reg: /^1[3-9]\d{9}$/
          },
          password: {
            value: this.userInfo.password,
            errorMsg: '新密码由数字字母下划线组合(6-16字符)',
            reg: /^[A-Za-z]\w{5,15}$/
          }
        };

        let isPass = validForm.valid(o);
        if (isPass) {
  
          this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0
          });

          //发起找回密码请求
          this.axios({
            //请求类型
            method: 'POST',
            //请求路径
            url: 'http://www.kangliuyong.com:10002/retrievePassword',

            //POST请求参数, object
            data: {
              appkey: this.appkey,
              phone: this.userInfo.phone,
              password: this.userInfo.password
            }

          }).then(result => {
            this.$toast.clear();
            this.$toast(result.data.msg)

            if (result.data.code == 'L001') {
              setTimeout(() => {
                this.goState('Login');
              }, 800)
            }

          }).catch(() => {
            this.$toast.clear();
          })        
        }
      },

    }
  }
</script>