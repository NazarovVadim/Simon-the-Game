const { resolve } = require("path");

let app = new Vue ({
    el: '.app',
    data: {
        count: 0,
        way: [],
        cur: 1,
        roundStarted: false,
        roundWay: [],
        index: 0,
        isOver: false,
        mode: 1500,
        startBtn: document.querySelector('#start')
    },
    methods:{
        start(){
            if(!this.roundStarted){
                if(document.querySelector('.lose-info')) document.querySelector('.lose-info').remove();
                this.isOver = false;
                this.count++;
                if(document.querySelector('.easy').checked) this.mode = 1500;
                if(document.querySelector('.medium').checked) this.mode = 1000;
                if(document.querySelector('.hard').checked) this.mode = 400;
                do{
                        event.target.disabled = true;
                        this.way.push(Math.ceil(0.5 + Math.random() * 3));
                        this.way.forEach((element, i) => {
                            setTimeout(function(){
                                document.querySelector(`.btn${element}`).style.opacity = 1;
                                let soundFile = `./sounds/${element}.mp3`;
                                let audio = new Audio();
                                audio.src = soundFile;
                                audio.autoplay = true;
                                setTimeout(() => {document.querySelector(`.btn${element}`).style.opacity = .6;}, this.mode);
                                if(i == this.way.length){
                                    this.roundStarted = true;
                                } 
                            }.bind(this), (this.mode + 500) * ++i)
                            
                        });
                        this.cur = this.count+1;
                }while(this.cur < this.count);
            }
            
        },
        round(event){
            const target = event.target;
            if(this.roundStarted){
                if(target.classList.contains(`btn${this.way[this.index]}`)){
                    target.style.opacity = 1;
                    let soundFile = `./sounds/${this.way[this.index]}.mp3`;
                    let audio = new Audio();
                    audio.src = soundFile;
                    audio.autoplay = true;
                    setTimeout(() => {target.style.opacity = .6}, 100);
                    this.index++;
                } else{
                    document.querySelector('#start').removeAttribute("disabled");
                    this.isOver = true;
                    this.roundStarted = false;
                    this.index = 0;
                    this.cur = 1;
                    this.way = [];
                    document.querySelector(`#start`).insertAdjacentHTML('afterend', `
                        <p class="lose-info">Sorry, yuo lost after ${this.count} rounds!</p>
                    `);
                    this.count = 0;
                }
                if((this.index === this.way.length) && !this.isOver){
                    this.roundStarted = false;
                    this.start();
                    this.index = 0;
                }
            }
        },
        changeMode(event){
            if(!this.roundStarted){
                const target = event.target;
                switch(target.value){
                    case 'easy':
                        this.mode = 1500;
                        break;
                    case 'medium':
                        this.mode = 1000;
                        break;
                    case 'hard':
                        this.mode = 400;
                    break;
                }
            }
        }
        
    }
})