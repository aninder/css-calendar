var YEAR = 2015;
var MONTH = new Date().getMonth();
var DAY = 1;
function setBodyHeader(dateObj) {
    var header = document.getElementsByTagName('header')[0];
    header.innerHTML = dateObj.getCurrentMonth+" "+dateObj.getCurrentYear;
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
            new_day.firstElementChild.textContent=sheet.shift();
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
        sheet.push(i);
    }
//add dates from last month if first day of current month not on sunday
    var counter = dateObj.getLastDateOfLastMonth;
    for( var j=0 ; j < dateObj.getFirstDayOfCurrentMonth ; j++) {
        sheet.unshift(counter)
        counter-=1;
    }
//add dates from next month till sheet length not equal to 42
    counter = 1;
    while(sheet.length != 42) {
        sheet.push(counter);
        counter+=1;
    }
    return sheet;
    //alert(sheet);
}
window.addEventListener('load', function(){
    dateObj = DateObj(new Date(YEAR, MONTH, DAY));
    sheet = createSheet(dateObj);
    setBodyHeader(dateObj);
    createDom(sheet);
    //display for current month , then take month from user
}, false);

