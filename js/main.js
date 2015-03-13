var YEAR = 2015;
var MONTH = new Date().getMonth();
var DAY = 1;
function setBodyHeader(dateObj) {
    var header = document.getElementsByTagName('header')[0];
    header.innerHTML = "<h1>"+dateObj.getCurrentMonth+" "+dateObj.getCurrentYear+"</h1>";
}
function createDom(sheet) {
    var ul = document.getElementsByClassName('days')[0];
    var li_proto = ul.firstElementChild;
    var ul_parent = ul.parentElement;
//   create 6 unordered list  and 6 li items in each
    for(var i=0 ; i < 6 ; i++) {
        newNode = ul.cloneNode(false);
        //newNode.id='row'+i;
        for(var j = 0 ; j < 7 ; j++) {
            new_day = li_proto.cloneNode(true);
            //add date from sheet array
            obj = sheet.shift();
            new_day.firstElementChild.textContent=obj.date;
//            add other-month class for dates not in current month
            if(!obj.currentMonth) {
                new_day.className = new_day.className + " other-month";
            }
            newNode.appendChild(new_day);
        }
        ul_parent.appendChild(newNode);
    }
    ul_parent.removeChild(ul);
}
function DateObj(date) {
    if( this.constructor !== DateObj) {
        return new DateObj(date);
    }
    else {
        var dateArr = date.toString().split(" ");
        var curr_month = dateArr[1];
        var curr_year = dateArr[3];
        var last_day_of_last_month = new Date(date.getFullYear(),date.getMonth(),0).getDate();
        var last_day_of_current_month = 1;
        while(true) {
            tempdate=new Date(date.getFullYear(),date.getMonth(),last_day_of_current_month+1);
            if(tempdate.getDate() === 1) {
                break;
            }
            else {
                last_day_of_current_month+=1;
            }
        }
    }
    return {
      getFirstDayOfCurrentMonth:date.getDay(),
      getCurrentMonth:curr_month,
      getCurrentYear:curr_year,
      getLastDateOfCurrentMonth:last_day_of_current_month,
      getLastDateOfLastMonth:last_day_of_last_month
    }
};
function createSheet(dateObj) {
    var sheet = [];
//    add all dates for current month
    for(var i=1; i<=dateObj.getLastDateOfCurrentMonth; i++) {
        sheet.push({date:i,currentMonth:true});
    }
//add dates from last month if first day of current month not on sunday
    var counter = dateObj.getLastDateOfLastMonth;
    for( var j=0 ; j < dateObj.getFirstDayOfCurrentMonth ; j++) {
        sheet.unshift({date:counter,currentMonth:false})
        counter-=1;
    }
//add dates from next month till sheet length not equal to 42
    counter = 1;
    while(sheet.length != 42) {
        sheet.push({date:counter,currentMonth:false});
        counter+=1;
    }
    return sheet;
}

window.addEventListener('load', function(){
    var dateObj = DateObj(new Date(YEAR, MONTH, DAY));
    var sheet = createSheet(dateObj);
    setBodyHeader(dateObj);
    createDom(sheet);
    document.querySelector('input[type=month]').addEventListener('change', function(event){
        yearmonth = event.srcElement.value.split("-");
        year = yearmonth[0];
        //input type date returns 1 index month and date object
        //uses 0 index 
        month = yearmonth[1] - 1;
});
    //display for current month , then take month from user
}, false);

