const { resolve } = require("path");

let app = new Vue ({
    el: '#info',
    data: {
        count: 0,
        way: []
    },
    methods:{
        start: function(event){
            this.count++;
            let cur = 1;
            do{
                cur+=2;
                this.way.push(Math.ceil(0.5 + Math.random() * 3));
                this.way.forEach(item => {
                    console.log(item);
                    this.sleep(1000);
                });
            }while(cur < this.count)
            //event.target.disabled = true;
            

        },
        sleep: function(ms){
            return new Promise(resolve => setTimeout((resolve, ms)))
        }

    }
})