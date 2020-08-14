const { resolve } = require("path");

let app = new Vue ({
    el: '#info',
    data: {
        count: 0,
        way: [],
        cur: 1,
        roundStarted:false,
        roundWay: []
    },
    methods:{
        start(){
            this.roundStarted = true;
            this.count++;
            do{
                this.way.push(Math.ceil(0.5 + Math.random() * 3));
                this.way.forEach((element, i) => {
                    setTimeout(function(){
                        document.querySelector(`.btn${element}`).style.opacity = 1;
                        setTimeout(() => {document.querySelector(`.btn${element}`).style.opacity = .6;}, 500)
                    }, 1000 * ++i)
                    
                });
                
                this.cur = this.count+1;
            }while(this.cur < this.count)
            event.target.disabled = true;
            this.roundWay = this.way;
        },
        round(event){
            console.log(1);
            const target = event.target;
            console.log(target);
            if(this.roundStarted){
                console.log(target);
            }
        }
        
    }
})