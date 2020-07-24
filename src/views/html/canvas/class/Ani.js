class Ani {
    constructor(canvasCxt,canWidth,canHeight,count, x, len) {
        this.canvasCxt = canvasCxt;
        this.canWidth = canWidth;
        this.canHeight = canHeight;
        this.count = count || 50
        this.x = x || [];
        this.len = len || [];
    }
    init() {
        for (let i = 0; i < this.count; i++) {
            this.x[i] = i * 16 + Math.random() * 20
            this.len[i] = 200 + Math.random() * 50
        }
    }
    draw() {
        this.canvasCxt.save()
        this.canvasCxt.globalAlpha=0.6
        this.canvasCxt.lineWidth = 20
        this.canvasCxt.lineCap="round"
        this.canvasCxt.strokeStyle="#3b154e"
        for (let i = 0; i < this.count; i++) {
            this.canvasCxt.beginPath()
            this.canvasCxt.moveTo(this.x[i],this.canHeight)
            this.canvasCxt.lineTo(this.x[i],this.canHeight-this.len[i])
            this.canvasCxt.stroke()
        }
        this.canvasCxt.restore()
    }
}

export default Ani