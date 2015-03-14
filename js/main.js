var YEAR = 2015;
var MONTH = new Date().getMonth();
var DAY = 1;
function setBodyHeader(dateObj) {
    var header = document.getElementsByTagName('header')[0];
    header.innerHTML = "<h1>"+dateObj.getCurrentMonthName+" "+dateObj.getCurrentYear+"</h1>";
}
function createDom() {
    var ul = document.getElementsByClassName('days')[0];
    var li_proto = ul.firstElementChild;
    var ul_parent = ul.parentElement;
    //create 6 unordered list  and 6 li items in each
    for(var i=0 ; i < 6 ; i++) {
        newNode = ul.cloneNode(false);
        //newNode.id='row'+i;
        for(var j = 0 ; j < 7 ; j++) {
            new_day = li_proto.cloneNode(true);
            newNode.appendChild(new_day);
        }
        ul_parent.appendChild(newNode);
    }
    ul_parent.removeChild(ul);
}
function clearClassNames() {
    var nodeList = document.querySelectorAll(".other-month");
    for(var i = 0 ; i < nodeList.length ; i++) {
        nodeList[i].className = "day";   
    }
}
function clearHiddenDivs() {
    var hiddenDivs = document.querySelectorAll(".hidden");
    for(var i=0 ; i < hiddenDivs.length ; i++) {
        var parent = hiddenDivs[i].parentNode;
        parent.removeChild(hiddenDivs[i]);
    }
}
function addDates(sheet) {
    clearClassNames();
    clearHiddenDivs();
    var nodeList = document.querySelectorAll(".date");
    for(var i = 0 ; i < nodeList.length ; i++) {
        //add date from sheet array
        var obj = sheet.shift();
        nodeList[i].textContent = obj.date;
        //add other-month class for dates not in current month
        if(!obj.currentMonth) {
            nodeList[i].parentNode.className = nodeList[i].parentNode.className + " other-month";
        }
        //create hidden element to store month name and day name to display in mobile mode
        //only for first time
            var li = nodeList[i].parentNode
            create_hidden_div(obj.monthName,li,"month");
            create_hidden_div(obj.day,li,"dayname");
    }
};
function create_hidden_div(value,li,klass) {
        div = document.createElement('div',li);
        div.className="hidden "+klass;
        div.textContent=value;
        li.appendChild(div);
}
function DateObj(date) {
    if( this.constructor !== DateObj) {
        return new DateObj(date);
    }
    else {
        var dateArr = date.toString().split(" ");
        var curr_month_name = dateArr[1];
        var curr_year = dateArr[3];
        var last_day_of_last_month = new Date(date.getFullYear(),date.getMonth(),0).getDate();
        var last_day_of_current_month = 1;
        //calculate last date of current_month
        while(true) {
            var tempdate=new Date(date.getFullYear(),date.getMonth(),last_day_of_current_month+1);
            if(tempdate.getDate() === 1) {
                break;
            }
            else {
                last_day_of_current_month+=1;
            }
        }
        //get last month name
        var last_month_name = new Date(date.getFullYear(),date.getMonth(),0).toString().split(" ")[1];
        //get next month name
        var next_month_name = new Date(date.getFullYear(), date.getMonth(), last_day_of_current_month+1).toString().split(" ")[1];
    }
    return {
      getFirstDayOfCurrentMonth:date.getDay(),
      getCurrentMonthName:curr_month_name,
      getCurrentYear:curr_year,
      getCurrentMonth:date.getMonth(),
      getLastDateOfCurrentMonth:last_day_of_current_month,
      getLastDateOfLastMonth:last_day_of_last_month,
      getLastMonthame:last_month_name,
      getNextMonthName:next_month_name
    }
};
function createSheet(dateObj) {
    var sheet = [];
    //add all dates for current month
    for(var i=1; i<=dateObj.getLastDateOfCurrentMonth; i++) {
    //save the day
    var day = new Date(dateObj.getCurrentYear,dateObj.getCurrentMonth,i).toString().split(" ")[0];   
        
    sheet.push({date:i,currentMonth:true,monthName:dateObj.getCurrentMonthName,day:day});
    }
    //add dates from last month if first day of current month not on sunday
    var counter = dateObj.getLastDateOfLastMonth;
    for( var j=0 ; j < dateObj.getFirstDayOfCurrentMonth ; j++) {
    var day = new Date(dateObj.getCurrentYear,dateObj.getCurrentMonth - 1,counter).toString().split(" ")[0];            
    sheet.unshift({date:counter,currentMonth:false,monthName:dateObj.getLastMonthame,day:day})
        counter-=1;
    }
    //add dates from next month till sheet length not equal to 42
    counter = 1;
    while(sheet.length != 42) {
    var day = new Date(dateObj.getCurrentYear,dateObj.getCurrentMonth + 1,counter).toString().split(" ")[0];            
    sheet.push({date:counter,currentMonth:false,monthName:dateObj.getNextMonthName,day:day});
        counter+=1;
    }
    return sheet;
}
function addDatesinDom(dateObj) {
    var sheet = createSheet(dateObj);
//    alert(JSON.stringify(sheet));
    setBodyHeader(dateObj);
    addDates(sheet);
}


window.addEventListener('load', function(){
    createDom();
    var dateObj = DateObj(new Date(YEAR, MONTH, DAY));
    addDatesinDom(dateObj);
    
    document.querySelector('input[type=month]').addEventListener('change', function(event){
        yearmonth = event.srcElement.value.split("-");
        year = yearmonth[0];
        //input type date returns 1 index month and date object
        //uses 0 index 
        month = yearmonth[1] - 1;
        var newDateObj = DateObj(new Date(year, month, 1));
        addDatesinDom(newDateObj);
    });
    //display for current month , then take month from user
}, false);

