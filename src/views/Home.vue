<template>
  <div class="home">
    <!-- 标题 -->
    <header class="header">
      <img src="@public/image/logo.png" class="logo">
       <div class="phone">
          <img src="@public/image/tel.svg" class="phone-icon">
          <span class="phone-num">{{telephone}}</span>
        </div>
    </header>
    <!-- 主内容 -->
    <div class="content">
      <!-- 轮播 -->
      <el-carousel class="carousel">
        <el-carousel-item  v-for="(item,index) in bannerList" :key="index">
          <img :src="item.path" class="banner">
        </el-carousel-item>
      </el-carousel>
      <!-- 课程 -->
      <div class="course">
        <img :src="winWidth<768?require('@public/image/brand-course-m.png'):require('@public/image/brand-course.png')" class="set-img">
      </div>
      <!-- 师资培训 -->
     <!--  <div class="teacher-training">
        <img :src="winWidth<768?require('@public/image/teacher-title-m.png'):require('@public/image/teacher-title.png')" class="img-title">
      </div> -->
      <div>
        <img :src="winWidth<768?require('@public/image/teacher-training-m.png'):require('@public/image/teacher-training.png')" class="set-img">
      </div>
      <!-- 关于我们 -->
      <div>
        <img :src="winWidth<768?require('@public/image/about-us-m.png'):require('@public/image/about-us.png')" class="set-img">
      </div>
    </div>
    <!-- 底部 -->
    <div class="footer">
      <div class="we-chat button" @click="openWechat"></div>
      <div class="join button" @click="switchDialog('joinUs')"></div>
    </div>
    <!-- 微信图片弹窗 -->
    <el-dialog :visible.sync="weChat" center class="we-chat-dialog">
      <p slot="title" class="title">扫描下方二维码，加微信咨询详情</p>
      <img :src="weChatImg" class="qr-code" alt="二维码图片">
    </el-dialog>
    <!-- 加入我们 -->
    <el-dialog  :visible.sync="joinUs" center class="join-us-dialog">
      <p slot="title" class="title">请填写您的基本资料</p>
      <el-form>
        <el-form-item label="姓名">
          <el-input v-model="submitData.nickname"  placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="submitData.telephone" maxlength="11"  placeholder="请输入联系电话"></el-input>
        </el-form-item>
         <el-alert :title="errMsg" type="error" show-icon v-show="showErr" :closable="false" @click.native="showErr=false"></el-alert>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="switchDialog('joinUs')">取 消</el-button>
        <el-button type="primary" @click="toSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      bannerList: [],
      winWidth: "",
      weChat: false,
      joinUs: false,
      submitData: {
        nickname: "", //姓名
        telephone: "" //电话
      },
      errMsg: "",
      showErr: false,
      telephone: "15103488866",
      weChatImg: require('@public/image/qr-code.jpg')
    };
  },
  mounted() {
    this.winWidth = window.innerWidth;
    this.initPage();
  },
  methods: {
    initPage() {
      let data = { is_phone: 0 };
      if (this.winWidth < 768) {
        data.is_phone = 1;
      }
      let _this = this;
      this.send("index", data, function(res) {
        if (res.status == 200) {
          let data = res.data;
          _this.telephone = data.telephone;
          _this.bannerList = data.images;
        }
      });
    },
    switchDialog(val) {
      this[val] = !this[val];
    },
    send(method, data, callBack) {
      let url = httpConfig.http;
      this.$axios.get(url + method, { params: data }).then(res => {
        callBack(res);
      });
    },
    openWechat() {
      let _this = this;
      this.send("wechat", "", function(res) {
        if (res.status == 200) {
          _this.weChatImg = res.data.wechat_img;
          _this.weChat = true;
        }
      });
    },
    toSubmit() {
      let reg = /[0-9]{11}/;
      let data = this.submitData;
      let _this=this;
      if (reg.test(data.telephone)) {
        this.send("join", this.submitData, function(res) {
          if (res.status == 200) {
            if (res.data.state === 0) {
              _this.joinUs=false;
              _this.$message({
                message: "提交成功！",
                type: "success"
              });
            }
          }
        });
      } else {
        this.errMsg = "请输入11位手机号码";
        this.showErr = true;
      }
    }
  }
};
</script>
<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  .phone {
    color: #30b7ff;
    font-weight: bold;
  }
  .phone-icon {
    vertical-align: middle;
  }
  .phone-num {
    vertical-align: middle;
  }
}
.content {
  /deep/.el-carousel__container {
    height: 100%;
    // z-index:1;
  }
  /deep/.el-carousel__indicator {
    background-color: rgba(0, 0, 0, 0);
  }
  .banner {
    height: 100%;
  }
  .set-img {
    width: 100%;
    display: block;
  }
  .teacher-training {
    background-color: #845cd9;
  }
}
.footer {
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
  .button {
    background-size: 100% 100%;
    &:hover {
      cursor: pointer;
    }
  }
}
.we-chat-dialog {
  /deep/.el-dialog__body {
    text-align: center;
  }
}
.join-us-dialog {
  /deep/.el-dialog__body {
    padding-top: 0;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
@media only screen and (max-width: 767px) {
  //1vw  7.5px
  .header {
    height: 12vw;
    padding: 0 4vw;
    .logo {
      width: 24.67vw;
    }
    .phone {
      line-height: 12vw;
      .phone-icon {
        width: 5.3vw;
        height: 5.3vw;
      }
      .phone-num {
        margin-left: 0.5vw;
        font-size: 4.5vw;
      }
    }
  }
  .content {
    .carousel {
      height: 53.33vw !important;
    }
    .teacher-training {
      padding: 10.67vw 5.33vw;
    }
  }
  .footer {
    height: 14.67vw;
    .button {
      width: 32vw;
      height: 9.6vw;
    }
    .we-chat {
      background-image: url("../../public/image/we-chat-m.png");
      &:active {
        background-image: url("../../public/image/we-chat-m-active.png");
      }
      &:hover {
        background-image: url("../../public/image/we-chat-m-active.png");
      }
    }
    .join {
      margin-left: 12.8vw;
      background-image: url("../../public/image/join-m.png");
      &:active {
        background-image: url("../../public/image/join-m-active.png");
      }
      &:hover {
        background-image: url("../../public/image/join-m-active.png");
      }
    }
  }
  &/deep/.el-dialog {
    width: 80vw;
    .el-dialog__header {
      padding: 1.3vw 1.3vw 0.65vw;
      .el-dialog__headerbtn {
        top: 3.5vw;
        right: 3.5vw;
        font-size: 4.27vw;
      }
    }
    .el-dialog__body {
      padding: 1.62vw 1.62vw 1.95vw;
    }
  }
  .title {
    font-size: 4vw;
  }
  .we-chat-dialog {
    .qr-code {
      width: 70vw;
      height: 70vw;
    }
  }
  .join-us-dialog {
    /deep/.el-dialog__body {
      padding-top: 0;
      padding-bottom: 0.8vw;
      .el-form-item {
        margin-bottom: 0;
      }
      .el-form-item__content {
        line-height: 13vw;
      }
      .el-form-item__label {
        font-size: 3.9vw;
        line-height: 13vw;
      }
      .el-input {
        font-size: 3.9vw;
        .el-input__inner {
          height: 13vw;
          line-height: 13vw;
          padding: 0.97vw;
        }
      }
      .el-alert {
        margin-top: 2vw;
      }
    }
    /deep/.el-dialog__footer {
      .el-button {
        padding: 3vw 8vw;
        font-size: 3.9vw;
        border-radius: 2vw;
        & + .el-button {
          margin-left: 8vw;
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) {
  //1vw   19.2px
  .header {
    height: 6.25vw;
    width: 62.5vw;
    margin: 0 auto;
    .logo {
      width: 14vw;
    }
    .phone {
      line-height: 6.25vw;
      .phone-icon {
        width: 2.6vw;
        height: 2.6vw;
      }
      .phone-num {
        margin-left: 0.2vw;
        font-size: 1.875vw;
      }
    }
  }
  .content {
    .carousel {
      height: 36.46vw !important;
    }
    .teacher-training {
      padding-top: 4.7vw;
      padding-bottom: 7.2vw;
      /* .img-title{
        height:
      } */
    }
  }
  .footer {
    height: 6.77vw;
    .button {
      width: 11.77vw;
      height: 3.23vw;
    }
    .we-chat {
      background-image: url("../../public/image/we-chat.png");
      &:active {
        background-image: url("../../public/image/we-chat-active.png");
      }
      &:hover {
        background-image: url("../../public/image/we-chat-active.png");
      }
    }
    .join {
      margin-left: 15.83vw;
      background-image: url("../../public/image/join.png");
      &:active {
        background-image: url("../../public/image/join-active.png");
      }
      &:hover {
        background-image: url("../../public/image/join-active.png");
      }
    }
  }
  &/deep/.el-dialog {
    width: 30vw;
    .el-dialog__header {
      padding: 1.3vw 1.3vw 0.65vw;
    }
    .el-dialog__body {
      padding: 1.62vw 1.62vw 1.95vw;
    }
  }
  .title {
    font-size: 1.3vw;
  }
  .we-chat-dialog {
    .qr-code {
      width: 18vw;
      height: 18vw;
    }
  }
  .join-us-dialog {
    /deep/.el-dialog__body {
      padding-top: 0;
      padding-bottom: 0.8vw;
      .el-form-item {
        margin-bottom: 0;
      }
      .el-form-item__content {
        line-height: 2.6vw;
      }
      .el-form-item__label {
        font-size: 0.9vw;
        line-height: 2.6vw;
      }
      .el-input {
        font-size: 0.9vw;
        .el-input__inner {
          height: 2.6vw;
          line-height: 2.6vw;
          padding: 0.97vw;
        }
      }
      .el-alert {
        margin-top: 0.5vw;
      }
    }
    /deep/.el-dialog__footer {
      .el-button {
        padding: 0.625vw 1.04vw;
        font-size: 0.9vw;
        border-radius: 0.21vw;
        & + .el-button {
          margin-left: 3.5vw;
        }
      }
    }
  }
}
</style>

