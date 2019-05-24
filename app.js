timeController = (function(){

    const timeData = {
        mins: 0,
        secs: 0,
        msec: 0
    }
    

    return {
        test: function(){

            startTime = moment();
            endTime = moment().add(5, 'min');

            return [startTime, endTime];
        },

        updateTime: function(calc, type){
            if(calc === "plus"){
                timeData[type] = timeData[type] + 1;
            }
            else{
                if(timeData[type] - 1 < 0){
                    timeData[type] = 0;
                }
                else{
                    timeData[type] = timeData[type] - 1;
                }
            }
        },

        updateTimeCount: function(mins, secs, msec){
            timeData.mins = mins;
            timeData.secs = secs;
            timeData.msec = msec;
        },

        getData: function(){
            return timeData;
        }
    }
})();


UIcontroller = (function(){

    //PUT DOM ELEMENTS INTO OBJECT
    const DOMstrings = {
        mins: '.time-box__num--mins',
        secs: '.time-box__num--secs',
        msec: '.time-box__num--msec',
        buttonsChange: '.btn--change',
        startButton: '#start'
    }

    return{
        
        //UPDATE TIMERS DOM
        updateDOM: function(obj){

            //destructuring array
            // [mins, secs, msec] = arr;
            let {mins, secs, msec} = obj;

            mins < 10 ? mins = `0${mins}` : mins = `${mins}`; 
            secs < 10 ? secs = `0${secs}` : secs = `${secs}`;
            msec < 10 ? msec = `0${msec}`.substring(0,2) : msec = `${msec}`.substring(0,2);

            //SELECT AND UPDATE DOM
            document.querySelector(DOMstrings.mins).textContent = mins;
            document.querySelector(DOMstrings.secs).textContent = secs;
            document.querySelector(DOMstrings.msec).textContent = msec;

        },

        //RETURN DOM ELEMENTS
        getDOM: function(){
            return DOMstrings;
        }
    }
})();


controller = (function(timeCtrl, UICtrl){

    //GET DOM FROM UI CTRL
    const DOM = UICtrl.getDOM();

    //UPDATE DATA TIME AND UI TIME 
    const update = function(event){
        //GET TARGET ID AND SPLIT TO GET INFO WHAT CALCULATION WITH DATA IS NEEDES
        const calc = event.target.id.split('-')[0];
        const type = event.target.id.split('-')[1];

        //FUNCTION TO UPDATE DATA
        timeCtrl.updateTime(calc, type);

        // console.log(timeCtrl.getData()); TEST

        //FUNCTION TO UDPATE DOM
        const data = timeCtrl.getData();
        UICtrl.updateDOM(data);
    }

    //COUNTDOWN
    const countdown = function(){

        
        //GET DATA FROM OBJECT
        const {mins, secs, msec} = timeCtrl.getData();

        // SET UP END TIME
        const endTime = moment()
                .add(mins, 'minutes')
                .add(secs, 'seconds')
                .add(msec);

                const check = function(){

                    //SET UP START TIME - CHANGE ON EVERY LOOP
                    let startTime = moment();
                    
                    //check if end time is still higher than end
                    if(endTime>startTime){
            
                        //wait moment until next counting
                        setTimeout(loop = function(endtime){
            
                            //CALCULATE DIFFRENCES
                            let mins = endTime.diff(startTime, 'minutes');
                            let secs = endTime.diff(startTime, 'seconds') - mins * 60;  //CALCULATED HOW MUCH SECONDS LEFT
                            let msec = endTime.diff(startTime) - (mins * 60 * 1000) - (secs * 1000); //CALCULATED HOW MUCH MILISECONDS LEFT
                    
                            //UPDATE DATA TIME
                            timeCtrl.updateTimeCount(mins, secs, msec);
                            
                            //UPDATE DOM
                            const data = timeCtrl.getData();
                            UICtrl.updateDOM(data);
            
            
                            //REPEAT LOOP
                            check();
                        }, 100);
                    }
                    else{
                        //FINISH FUNCTION
                        //UPDATE DATA TIME
                        timeCtrl.updateTimeCount(0, 0, 0);
                        //UPDATE DOM
                        const data = timeCtrl.getData();
                        UICtrl.updateDOM(data);
                    }
                };
        //START CHECKING FUNCTION
        check();
        
    }

    //ADD EVENT LISTENERS TO BUTTONS
    const addEvents = function(){

        //BUTTON -> CHANGE TIME
        const buttons = document.querySelectorAll(DOM.buttonsChange);

        for(let i = 0; i < buttons.length; i++){
            buttons[i].addEventListener('click', update);
        }

        //START COUNTDOWN
        const startButton = document.querySelector(DOM.startButton);
        startButton.addEventListener('click', countdown);
    }


    return {
        init: function(){
            addEvents();
        }
    }
})(timeController, UIcontroller);


controller.init();
