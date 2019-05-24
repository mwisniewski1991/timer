
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

        test: function(){
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
        buttonsChange: '.btn--change' 


    }

    return{
        
        //UPDATE TIMERS DOM
        updateDOM: function(obj){

            //destructuring array
            // [mins, secs, msec] = arr;
            {mins, secs, msec = obj};

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

    const DOM = UICtrl.getDOM();


    const update = function(event){
        //GET TARGET ID AND SPLIT TO GET INFO WHAT CALCULATION WITH DATA IS NEEDES
        const calc = event.target.id.split('-')[0];
        const type = event.target.id.split('-')[1];

        //FUNCTION TO UPDATE DATA
        timeCtrl.updateTime(calc, type);
        console.log(timeCtrl.test());

        //FUNCTION TO UDPATE DOM


    }

    const addEvents = function(){

        const buttons = document.querySelectorAll(DOM.buttonsChange);

        //ADD UPDATE BUTTON
        for(let i = 0; i < buttons.length; i++){
            buttons[i].addEventListener('click', update);
        }

    }


    return {
        init: function(){
            addEvents();
        }
    }
})(timeController, UIcontroller);


controller.init();

// const test = function(){

//     let startTime = moment();
//     let endTime = moment()
//                 .add(5, 'minutes')
//                 .add(5, 'seconds')
    
//     let mins = endTime.diff(startTime, 'minutes');
//     let secs = endTime.diff(startTime, 'seconds') - mins * 60;  //CALCULATED HOW MUCH SECONDS LEFT
//     let msec = endTime.diff(startTime) - (mins * 60 * 1000) - (secs * 1000); //CALCULATED HOW MUCH MILISECONDS LEFT

    
//     mins < 10 ? mins = `0${mins}` : mins = `${mins}`;
//     secs < 10 ? secs = `0${secs}` : secs = `${secs}`;
//     msec < 10 ? msec = `0${msec}` : msec = `${msec}`;

//     let result = `${mins}:${secs}:${msec}`

//     // console.log(startTime);
//     // console.log(endTime);
//     console.log(result);

// }();


const test = function(){

    //SET UP WHEN ENDS
    const endTime = moment()
                .add(0, 'minutes')
                .add(5, 'seconds')

    const check = function(){

        //SET UP START TIME - CHANGE ON EVERY LOOP
        let startTime = moment();

        if(endTime>startTime){

            setTimeout(loop = function(endtime){

                //CALCULATE DIFFRENCES
                let mins = endTime.diff(startTime, 'minutes');
                let secs = endTime.diff(startTime, 'seconds') - mins * 60;  //CALCULATED HOW MUCH SECONDS LEFT
                let msec = endTime.diff(startTime) - (mins * 60 * 1000) - (secs * 1000); //CALCULATED HOW MUCH MILISECONDS LEFT
        
                //add 0 to number less than 10 - it is necessery for UI
                mins < 10 ? mins = `0${mins}` : mins = `${mins}`; 
                secs < 10 ? secs = `0${secs}` : secs = `${secs}`;
                msec < 10 ? msec = `0${msec}`.substring(0,2) : msec = `${msec}`.substring(0,2);

                // let result = `${mins}:${secs}:${msec}`
                let result = [mins, secs, msec];
                
                //UPDATE DOM
                console.log(result);
                UIcontroller.updateDOM(result) 


                //REPEAT LOOP
                check();
            }, 100);
        }
        else{
            let result = ['00', '00', '00'];
            UIcontroller.updateDOM(result) 
        }
    }

    check();

};




