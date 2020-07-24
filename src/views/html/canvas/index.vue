<template>
  <div class="login-container">
    <div class="canvas-bg">
      <div class="canvas-list">
        <canvas class="canvasBg" id="canvasBg" width="800" height="600"></canvas>
        <canvas class="canvasFont" id="canvasFont" width="800" height="600"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import imgSrc from "./images/background.jpg";
import Ani from "./class/Ani.js";
import Fruit from "./class/Fruit.js";
import Fish from "./class/Fish.js";
import BabyFish from "./class/BabyFish.js";
export default {
  name: "Canvas",
  data() {
    return {
      lastTime: null,
      deltaTime: null, // 两帧之间的间隔差
      canvasBg: null,
      canvasFont: null,
      canvasBgCxt: null,
      canvasFontCxt: null,
      aniObj: null,
      fruitObj: null,
      fishObj: null,
      babyFishObj: null,
      mouseX: "",
      mouseY: "",
      scoreData: {
        fruitNum: 0,
        double: 1,
        score:0,
        gameOver:false,
        alpha: 0
      }
    };
  },
  mounted() {
    this.lastTime = new Date();
    this.init();
    this.gameLoop();
  },
  methods: {
    init() {
      this.canvasBg = document.getElementById("canvasBg");
      this.canvasBgCxt = this.canvasBg.getContext("2d");
      this.canvasFont = document.getElementById("canvasFont");
      this.canvasFontCxt = this.canvasFont.getContext("2d");
      this.canvasFontCxt.font="30px Verdana"
      this.canvasFontCxt.textAlign ="center"
      this.initClass();
      this.initMouse();
    },
    gameLoop() {
      this.requestAnimFrame()(this.gameLoop);
      let now = new Date();
      this.deltaTime = now - this.lastTime;
      this.lastTime = now;
      if (this.deltaTime > 40) this.deltaTime = 40;
      this.drawBackground();
      this.drawAni();
      this.drawFruit();
      this.drawFish();
      this.drawBabyFish();
      this.fruitWithFishDisance();
      this.fishWithBabyDisance();
      this.drawScore();
    },
    requestAnimFrame() {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(
          /* function FrameRequestCallback */ callback,
          /* DOMElement Element */ element
        ) {
          return window.setTimeout(callback, 1000 / 60);
        }
      );
    },
    // 绘制背景
    drawBackground() {
      let canvasWidth = this.canvasBg.width;
      let canvasHeight = this.canvasBg.height;
      let bgImg = new Image();
      bgImg.src = imgSrc;
      this.canvasBgCxt.drawImage(bgImg, 0, 0, canvasWidth, canvasHeight);
    },
    // 初始化类
    initClass() {
      let canvasWidth = this.canvasFont.width;
      let canvasHeight = this.canvasFont.height;
      this.aniObj = new Ani(this.canvasBgCxt, canvasWidth, canvasHeight);
      this.aniObj.init();
      this.fruitObj = new Fruit(
        this.canvasBgCxt,
        this.aniObj,
        canvasWidth,
        canvasHeight
      );
      this.fruitObj.init();
      this.fishObj = new Fish(this.canvasFontCxt, canvasWidth, canvasHeight);
      this.fishObj.init();
      this.babyFishObj = new BabyFish(
        this.canvasFontCxt,
        canvasWidth,
        canvasHeight
      );
      this.babyFishObj.init();
    },
    //初始化鼠标
    initMouse() {
      let canvasWidth = this.canvasFont.width;
      let canvasHeight = this.canvasFont.height;
      this.mouseX = canvasWidth * 0.5;
      this.mouseY = canvasHeight * 0.5;
      this.canvasFont.addEventListener("mousemove", this.onMouseMove, false);
    },
    onMouseMove(e) {
      if(this.scoreData.gameOver) return
      if (e.offsetX || e.layerX) {
        this.mouseX = e.offsetX || e.layerX;
        this.mouseY = e.offsetY || e.layerY;
      }
    },
    // 绘制海葵
    drawAni() {
      this.aniObj.draw();
    },

    // 绘制果实
    drawFruit() {
      this.fruitObj.fruitWatch();
      this.fruitObj.draw(this.deltaTime);
    },
    // 绘制鱼
    drawFish() {
      this.canvasFontCxt.clearRect(0,0,this.canvasFont.width,this.canvasFont.height);
      this.fishObj.draw(this.mouseX, this.mouseY, this.deltaTime,this.scoreData);
    },
    // 绘制Baby鱼
    drawBabyFish() {
      this.babyFishObj.draw(this.fishObj.x, this.fishObj.y, this.deltaTime,this.scoreData);
    },
    // 判断和果实的距离，距离过近 则吃掉
    fruitWithFishDisance() {
      if(this.scoreData.gameOver) return
      for (let i = 0; i < this.fruitObj.count; i++) {
        if (this.fruitObj.alives[i]) {
          let dis = this.calLength2(this.fruitObj.x[i], this.fruitObj.y[i],this.fishObj.x,this.fishObj.y);
          if (dis < 900) {
            this.fruitObj.alives[i] = false;
            if (this.fruitObj.fruitType[i] == "blue") {
              this.scoreData.double = 2;
            }
            this.fishObj.bodyCount += 1;
            if (this.fishObj.bodyCount > 7){
              this.fishObj.bodyCount = 7;
            } 
            this.scoreData.fruitNum++;
            // 计算分数
            this.scoreData.score = this.scoreData.fruitNum*100*this.scoreData.double
          }
        }
      }
    },
    // 判断鱼之间的距离，距离过近 则喂食
    fishWithBabyDisance() {
      if(this.scoreData.fruitNum<=0 || this.scoreData.gameOver) return;
      let dis = this.calLength2(this.fishObj.x,this.fishObj.y,this.babyFishObj.x,this.babyFishObj.y);
      if (dis < 900) {
        this.babyFishObj.babyBodyCount = 0;
        // 计算分数
        this.scoreData.score = this.scoreData.fruitNum*200*this.scoreData.double
        this.scoreData.fruitNum = 0;
        this.scoreData.double = 1;

        this.fishObj.bodyCount=0;
      }
    },

    calLength2(x1, y1, x2, y2) {
      return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
    },
    drawScore() {
      let canvasWidth = this.canvasFont.width;
      let canvasHeight = this.canvasFont.height;
      this.canvasFontCxt.save()
      this.canvasFontCxt.shadowBlur =10;
      this.canvasFontCxt.shadowColor ="white"
      this.canvasFontCxt.fillStyle = "white";
      this.canvasFontCxt.fillText(`score ${this.scoreData.score}`, canvasWidth * 0.5, canvasHeight  - 50);
      if(this.scoreData.gameOver){
       this.scoreData.alpha += (this.deltaTime * 0.0005)
       if(this.scoreData.alpha>1){
        this.scoreData.alpha =1
       }
         this.canvasFontCxt.fillStyle=`rgba(255,255,255,${this.scoreData.alpha})`
         this.canvasFontCxt.fillText(`Game Over`, canvasWidth * 0.5, canvasHeight*0.5);
      }
      this.canvasFontCxt.restore()
      // this.canvasFontCxt.fillText(`num ${this.scoreData.fruitNum}`, canvasWidth * 0.5, canvasHeight  - 50);
      // this.canvasFontCxt.fillText( `double ${this.scoreData.double}`, canvasWidth * 0.5,canvasHeight - 70);
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .canvas-bg {
    width: 800px;
    height: 600px;
    margin: 50px auto;
    .canvas-list {
      width: 800px;
      height: 600px;
      position: relative;
      margin: 0;
      .canvasBg {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 0;
      }
      .canvasFont {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1;
      }
    }
  }
}
</style>
