var sDict = {
	"Jan": "01",
	"Feb": "02",
	"Mar": "03",
	"Apr": "04",
	"May": "05",
	"Jun": "06",
	"Jul": "07",
	"Aug": "08",
	"Sep": "09",
	"Oct": "10",
	"Nov": "11",
	"Dec": "12"
};

var oDict={
	"1": "Jan",
	"2": "Feb",
	"3": "Mar",
	"4": "Apr",
	"5": "May",
	"6": "Jun",
	"7": "Jul",
	"8": "Aug",
	"9": "Sep",
	"10": "Oct",
	"11": "Nov",
	"12": "Dec"
}


export function MonToNum(myDate) {
    var month = myDate.slice(0,3)
    var numMonth = sDict[month]
    var numDate = numMonth + myDate.slice(3,)
    return numDate
}

export function MonToStr(myDate) {
	var myDateS = myDate.toString()
	var length = myDateS.length
	if (length == 7) {
		var month = myDateS.slice(0,1)
		var strMonth = oDict[month]
		var strDate = strMonth +" " + myDateS.slice(1,3) + ", " + myDateS.slice(3,7)
	}
	else if(length ==8){
		var month = myDateS.slice(0,2)
		var strMonth = oDict[month]
		var strDate = strMonth + " " + myDateS.slice(2,4) + ", " + myDateS.slice(4,8)
	}
	else {
		var strDate = "No Date Set"
	}

	return strDate
}