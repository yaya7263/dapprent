var sDict = {
	"Jan": "01",
	"Feb": "02",
	"Mar": "03",
	"April": "04",
	"May": "05",
	"June": "06",
	"July": "07",
	"August": "08",
	"September": "09",
	"October": "10",
	"November": "11",
	"December": "12"
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