
var houseColumn = document.querySelector('.house-column'),
	senateColumn = document.querySelector('.senate-column')
	inputNode = document.querySelector('input'),
	baseUrl = "http://congress.api.sunlightfoundation.com/bills?apikey=149a2a8730aa4936bab76017c47d8dab"

var billsToHTML = function(billsArray){
	var htmlString = ''
	for(var i = 0; i < billsArray.length; i++){
		console.log(billsArray[i])
		var billDetails = billsArray[i]
		// if (billDetails.short_title) {
		// 	var title = billDetails.short_title
		// }
		// else {
		// 	var title = billDetails.bill_id
		// } ternary syntax below replaces all this logic
		htmlString += '<div class="bill">'
		htmlString += '<h2>' + (billDetails.short_title ? billDetails.short_title : billDetails.bill_id) + '</h2>'
		htmlString += '<h3>' + billDetails.official_title + '</h3>'
		htmlString += '<h5>' + billDetails.sponsor.first_name + " " + billDetails.sponsor.last_name + '</h5>'
		htmlString += '</div>'
		//we should build the full htmlString and then write to innerHTML
		//only once
	}
	return htmlString
}

var houseResponseHandler = function(apiResponse){
	console.log(apiResponse.results)
	var billsArray = apiResponse.results,
		htmlString = '<h1>House Bills</h1>' + billsToHTML(billsArray)
	houseColumn.innerHTML = htmlString
}

var senateResponseHandler = function(apiResponse){
	console.log(apiResponse.results)
	var billsArray = apiResponse.results,
		htmlString = '<h1>Senate Bills</h1>' + billsToHTML(billsArray)
	senateColumn.innerHTML = htmlString
}

var fetchSenateBills = function() {
	var url = baseUrl + '&chamber=senate'
	var promise = $.getJSON(url)
	promise.then(senateResponseHandler)
}

var fetchHouseBills = function() {
	var url = baseUrl + '&chamber=house'
	var promise = $.getJSON(url)
	promise.then(houseResponseHandler)
}

fetchHouseBills()
fetchSenateBills()
