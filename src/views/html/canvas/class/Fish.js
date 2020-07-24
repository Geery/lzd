class Fish {
    constructor(canvasCxt, canWidth, canHeight) {
        this.canvasCxt = canvasCxt;
        this.canWidth = canWidth;
        this.canHeight = canHeight;
        this.x;
        this.y;
        this.angle;
        this.eyesTimer = 0;
        this.eyesCount = 0;
        this.eyesInterval = 1000;
        this.eyesImages = [];
        this.tailTimer = 0;
        this.tailCount = 0;
        this.tailImages = [];
        this.bodyTimer = 0;
        this.bodyCount = 0;
        this.bodyOrgImages = [];
        this.bodyBlueImages = [];
        
    }

    init() {
        this.x = this.canWidth * 0.5;
        this.y = this.canHeight * 0.5;
        this.angle = 0;
        for (let i = 0; i < 8; i++) {
            this.tailImages[i] = new Image()
            this.tailImages[i].src = require(`../images/bigTail${i}.png`)
            if (i < 2) {
                this.eyesImages[i] = new Image()
                this.eyesImages[i].src = require(`../images/bigEye${i}.png`)
            }
            this.bodyOrgImages[i] = new Image()
            this.bodyOrgImages[i].src = require(`../images/bigSwim${i}.png`)
            this.bodyBlueImages[i] = new Image()
            this.bodyBlueImages[i].src = require(`../images/bigSwimBlue${i}.png`)
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
        this.tailTimer += deltaTime
        if (this.tailTimer > 50) {
            this.tailCount = (this.tailCount + 1) % 8
            this.tailTimer %= 50
        }
        // 眼睛眨动
        this.eyesTimer += deltaTime
        if (this.eyesTimer > this.eyesInterval) {
            this.eyesCount = (this.eyesCount + 1) % 2
            this.eyesTimer %= this.eyesInterval
            if (this.eyesCount == 0) {
                this.eyesInterval = Math.random() * 1500 + 2000 //[,)
            } else {
                this.eyesInterval = 200;
            }
        }
        this.canvasCxt.save()
        this.canvasCxt.translate(this.x, this.y)
        this.canvasCxt.rotate(this.angle)
        let tailImage = this.tailImages[this.tailCount]
        let eyeImage = this.eyesImages[this.eyesCount]
        let bodyImage =  scoreData.double==1?this.bodyOrgImages[this.bodyCount]:this.bodyBlueImages[this.bodyCount]
        this.canvasCxt.drawImage(tailImage, -tailImage.width * 0.5 + 30, -tailImage.height * 0.5)
        this.canvasCxt.drawImage(bodyImage, -bodyImage.width * 0.5, -bodyImage.height * 0.5)
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

export default Fish