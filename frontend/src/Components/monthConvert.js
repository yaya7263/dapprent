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

export function MonToNum(myDate) {
    var month = myDate.slice(0,3)
    var numMonth = sDict[month]
    var numDate = numMonth + myDate.slice(3,)
    return numDate
}

export function MonToStr(myDate) {
	return null 
}