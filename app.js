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


    return{
        


    }
})();


controller = (function(){


    return {
        test: function(){


        }
    }
})();


// const test = function(){

//     let = startTime = moment();
//     let = endTime = moment()
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

    let = endTime = moment()
                .add(0, 'minutes')
                .add(5, 'seconds')

    let = startTime = moment();


    setTimeout(loop = function(endtime){



        let mins = endTime.diff(startTime, 'minutes');
        let secs = endTime.diff(startTime, 'seconds') - mins * 60;  //CALCULATED HOW MUCH SECONDS LEFT
        // let msec = endTime.diff(startTime) - (mins * 60 * 1000) - (secs * 1000); //CALCULATED HOW MUCH MILISECONDS LEFT

        msec = 0;
        
        mins < 10 ? mins = `0${mins}` : mins = `${mins}`;
        secs < 10 ? secs = `0${secs}` : secs = `${secs}`;
        msec < 10 ? msec = `0${msec}` : msec = `${msec}`;


        let result = `${mins}:${secs}:${msec}`

        // console.log(startTime);
        // console.log(endTime);
        console.log(result);

        // if(endTime>startTime){
        //     loop()
        // };

    }, 1000);
    

}();




