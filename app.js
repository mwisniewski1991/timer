timeController = (function(){

    const timeData = {
        mins: 0,
        secs: 0,
        msec: 0
    }

    return {
        updateTime: function(calc, type){
            //add time
            
            if(calc === "plus"){
                timeData[type] = timeData[type] + 1;
            }
            //minus time
            else{
                if(timeData[type] - 1 < 0){ //time can not be less than 0, so if it is zero no calculation
                    timeData[type] = 0;
                }
                else{
                    timeData[type] = timeData[type] - 1;
                }
            }

            //60 secs turns into one minute
            if(timeData.secs === 60){
                // console.log(checktime)
                timeData.mins = timeData.mins + 1
                timeData.secs = 0;
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
        startButton: '#start',
        resetButton: '#restart'
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

    //VARIABLE TO START AND STOP COUNTDOWN
    let countdownCheck = false;

    //REMOVE CLASS ACTIVE/DISACTIVE
    const changeClass = function(){
        let buttons = document.querySelectorAll(DOM.buttonsChange);
        Array.from(buttons).forEach((cur)=>{
            cur.classList.toggle('btn__active');
            cur.classList.toggle('btn__disactive');
        })
    } 

    //UPDATE DATA TIME AND UI TIME 
    const update = function(event){

        //CHECK STATUS OF COUNTDOWN. DO NOT ADD DURING COUNTDONW
        if(countdownCheck == false){

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
    }

    //COUNTDOWN
    const countdown = function(){
        
        //GET DATA FROM OBJECT
        const {mins, secs, msec} = timeCtrl.getData();

        //CHECK IF COUNTDOWN IS ACTIVE. AVOID SITUATION WHERE START COUTNING TWICE
        if(countdownCheck === false){
            
            //AFTER STOPPED FUNCTION NEED TO CHANGE VAIRABLE AND TEXT CONTENT IN BUTTON
            countdownCheck = true;
            document.querySelector(DOM.resetButton).textContent = "Stop";

            //DISACTIVE/ACTIVE BUTTONS - ONLY CSS 
            changeClass();
            
            // SET UP END TIME
            const endTime = moment()
            .add(mins, 'minutes')
            .add(secs, 'seconds')
            .add(msec);
            
            const check = function(){
                
                if(countdownCheck){
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
                            countdownCheck = false
                            //UPDATE DATA TIME
                            timeCtrl.updateTimeCount(0, 0, 0);
                            //UPDATE DOM
                            const data = timeCtrl.getData();
                            UICtrl.updateDOM(data);
                            //DISACTIVE/ACTIVE BUTTONS - ONLY CSS 
                            changeClass();
                        }
                    }
                };
                //START CHECKING FUNCTION
                check();
            };
    };

    //STOP COUNTDOWN
    const stop = function(){
        //CHECK IF COUNTDOWN IS STOP
        if (countdownCheck){
            //IF NO STOP IT
            //CHANGE VARIABLE AND STOP COUNTDOWN
            countdownCheck = false;
            //CHANGE DOM NAME FROM STOP TO RESET
            document.querySelector(DOM.resetButton).textContent = "Reset";
            //DISACTIVE/ACTIVE BUTTONS - ONLY CSS 
            changeClass();
        }
        else{
            //UPDATE DATA TIME
            timeCtrl.updateTimeCount(0, 0, 0);
            //UPDATE DOM
            const data = timeCtrl.getData();
            UICtrl.updateDOM(data);

             //CHANGE DOM NAME FROM RESET TO STOP
             document.querySelector(DOM.resetButton).textContent = "Stop";
        }
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

        //STOP COUNT DOWN
        const resetButton = document.querySelector(DOM.resetButton);
        resetButton.addEventListener("click", stop)
    }


    return {
        init: function(){
            addEvents();
        }
    }
})(timeController, UIcontroller);

//ONLOAD FUNCTION
controller.init();
