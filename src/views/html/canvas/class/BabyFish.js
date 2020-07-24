
class BabyFish {
    constructor(canvasCxt, canWidth, canHeight) {
        this.canvasCxt = canvasCxt;
        this.canWidth = canWidth;
        this.canHeight = canHeight;
        this.x;
        this.y;
        this.angle;
        this.babyTailTimer = 0;
        this.babyTailCount = 0;
        this.babyTailImages = [];
        this.babyEyesImages = [];
        this.babyEyeCount = 0;
        this.babyEyeTimer = 0;
        this.babyEyeInterval = 1000;
        this.babyBodyImages = [];
        this.babyBodyTimer=0;
        this.babyBodyCount=0;
    }

    init() {
        this.x = this.canWidth * 0.5 - 50;
        this.y = this.canHeight * 0.5 + 50;
        this.angle = 0;
        for (let i = 0; i < 20; i++) {
            if (i < 8) {
                this.babyTailImages[i] = new Image()
                this.babyTailImages[i].src = require(`../images/babyTail${i}.png`)
            }
            if (i < 2) {
                this.babyEyesImages[i] = new Image()
                this.babyEyesImages[i].src = require(`../images/babyEye${i}.png`)
            }
            this.babyBodyImages[i] = new Image()
            this.babyBodyImages[i].src = require(`../images/babyFade${i}.png`)
        }
    }
    draw(mouseX, mouseY, deltaTime,scoreData) {
        this.x = this.lerpDistance(mouseX, this.x, 0.98)
        this.y = this.lerpDistance(mouseY, this.y, 0.98)
        //计算角度差 Math.atan2(y,x)
        let deltaX = mouseX - this.x
        let deltaY = mouseY - this.y
        let betal = Math.atan2(deltaY, deltaX) + Math.PI
        this.angle = this.lerpAngle(betal, this.angle, 0.6)

        //尾巴摇动
        this.babyTailTimer += deltaTime
        if (this.babyTailTimer > 50) {
            this.babyTailCount = (this.babyTailCount + 1) % 8
            this.babyTailTimer %= 50
        }
        // 眼睛眨动
        this.babyEyeTimer += deltaTime
        if (this.babyEyeTimer > this.babyEyeInterval) {
            this.babyEyeCount = (this.babyEyeCount + 1) % 2
            this.babyEyeTimer %= this.babyEyeInterval
            if (this.babyEyeCount == 0) {
                this.babyEyeInterval = Math.random() * 1500 + 2000 //[,)
            } else {
                this.babyEyeInterval = 200;
            }
        }
        // body
        this.babyBodyTimer += deltaTime
        if(this.babyBodyTimer>300){
            this.babyBodyCount =this.babyBodyCount+1
            this.babyBodyTimer %=300
            if(this.babyBodyCount>19){
                this.babyBodyCount =19
                //gameOver
                scoreData.gameOver =true
            }
        }

        this.canvasCxt.save()
        this.canvasCxt.translate(this.x, this.y)
        this.canvasCxt.rotate(this.angle)
        let tailImage = this.babyTailImages[this.babyTailCount]
        let eyeImage = this.babyEyesImages[this.babyEyeCount]
        let babyImage =this.babyBodyImages[this.babyBodyCount]
        this.canvasCxt.drawImage(tailImage, -tailImage.width * 0.5 + 23, -tailImage.height * 0.5)
        this.canvasCxt.drawImage(babyImage, -babyImage.width * 0.5, -babyImage.height * 0.5)
        this.canvasCxt.drawImage(eyeImage, -eyeImage.width * 0.5, -eyeImage.height * 0.5)
        this.canvasCxt.restore()
    }
    // 目标值 当前值 比率
    lerpDistance(aim, cur, ratio) {
        let detal = cur - aim
        return aim + detal * ratio
    }
    lerpAngle(a, b, t) {
        let d = b - a
        if (d > Math.PI) d = d - 2 * Math.PI
        if (d < -Math.PI) d = d + 2 * Math.PI
        return a + d * t
    }
}

export default BabyFish