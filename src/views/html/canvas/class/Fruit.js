import blueImg from '../images/blue.png'
import fruitImg from '../images/fruit.png'
class Fruit {
    constructor(canvasCxt, ani, canWidth, canHeight, count, alives) {
        this.canvasCxt = canvasCxt;
        this.canWidth = canWidth;
        this.canHeight = canHeight;
        this.ani = ani;
        this.x = [];
        this.y = [];
        this.picL = [];
        this.speed = [];
        this.count = count || 30;
        this.alives = alives || [];
        this.fruitType=[];
        this.blue = new Image()
        this.orange = new Image()
        this.init()
    }
    init() {
        for (let i = 0; i < this.count; i++) {
            this.alives[i] = false
            this.x[i] = 0
            this.y[i] = 0

            this.speed[i] = Math.random() * 0.017 + 0.002
        }
        this.blue.src = blueImg
        this.orange.src = fruitImg
    }
    draw(detalTime) {
        for (let i = 0; i < this.count; i++) {
            if (this.alives[i]) {
                if (this.picL[i] <= 14) {
                    this.picL[i] += this.speed[i] * detalTime
                } else {
                    this.y[i] -= this.speed[i] * 7 * detalTime
                }
                let picSource = this.fruitType[i]=='origin'?this.orange:this.blue
                this.canvasCxt.drawImage(picSource, this.x[i] - this.picL[i] * 0.5, this.y[i] - this.picL[i] * 0.5, this.picL[i], this.picL[i])
                if (this.y[i] < 10) {
                    this.alives[i] = false
                }
            }
        }
    }
    born(i) {
        let aniId = Math.floor(Math.random() * this.ani.count)
        this.x[i] = this.ani.x[aniId]
        this.y[i] = this.canHeight - this.ani.len[aniId]
        this.picL[i] = 0
        this.alives[i] =true
        this.fruitType[i] =Math.random()<0.5?"origin":'blue'
    }
    fruitWatch() {
        let  num =0
        for (let i = 0; i < this.count; i++) {
           if(this.alives[i]) num++  
        }
        if(num<15){
            this.sendFruit()
            return
        }
    }
    sendFruit(){
        for (let i = 0; i < this.count; i++) {
            if(!this.alives[i]){
                this.born(i)
                return
            }  
         }
    }
}

export default Fruit