const { resolve } = require("path");

let app = new Vue ({
    el: '.app',
    data: {
        count: 0,
        way: [],
        cur: 1,
        roundStarted:false,
        roundWay: [],
        index: 0,
        isOver: false,
        startBtn: document.querySelector('#start')

    },
    methods:{
        start(){
            if(this.isOver) {
                this.startBtn.removeAttribute("disabled");
                this.roundStarted = false;
                return;
            }
            this.count++;
            do{
                this.way.push(Math.ceil(0.5 + Math.random() * 3));
                this.way.forEach((element, i) => {
                    setTimeout(function(){
                        document.querySelector(`.btn${element}`).style.opacity = 1;
                        setTimeout(() => {document.querySelector(`.btn${element}`).style.opacity = .6;}, 500);
                        if(i == this.way.length){
                            this.roundStarted = true;
                            console.log(this.roundStarted);
                        } 
                    }.bind(this), 1000 * ++i)
                    
                });
                
                this.cur = this.count+1;
            }while(this.cur < this.count)
            event.target.disabled = true;
            this.startBtn = event.target;
            this.roundWay = this.way;
        },
        round(event){
            const target = event.target;
            this.isOver = false;
            if(this.roundStarted){
                    if(target.classList.contains(`btn${this.way[this.index]}`)){
                        console.log(this.index);
                        this.index++;
                        if(this.index < this.way.length){
                            return
                        }
                    } else{
                        this.startBtn.removeAttribute("disabled");
                        this.isOver = true;
                        this.index = 0;
                        this.cur = 1;
                        this.way = [];
                        this.count = 0;
                        this.roundWay = [];
                        alert('GAMEOVER');
                    }
                if(this.index === this.way.length && !this.isOver){
                    this.roundStarted = false;
                    this.start();
                    this.index = 0;
                } 
            }
        }
        
    }
})