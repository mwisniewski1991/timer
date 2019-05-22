timeController = (function(){

    

    return {
        test: function(){

            startTime = moment();
            endTime = moment().add(5, 'min');

            return [startTime, endTime];
        }
    }
})();


UIcontroller = (function(){

    const DOMstrings = {
        mins: '.time-box__num--mins',
        secs: '.time-box__num--secs',
        msec: '.time-box__num--msec'


    }


    return{

        updateDOM: function(arr){

            //destructuring array
            [mins, secs, msec] = arr;

            //SELECT AND UPDATE DOM
            document.querySelector(DOMstrings.mins).textContent = mins;
            document.querySelector(DOMstrings.secs).textContent = secs;
            document.querySelector(DOMstrings.msec).textContent = msec;

        }
    }
})();


controller = (function(){


    return {
        test: function(){


        }
    }
})();


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

}();




