$( document ).ready(function() {

	$("#searchForm").submit(function(event){
			event.preventDefault();

			lookupWord($("#searchBox").val());
	})	

});

var fromLang;
var toLang = "fa";
var results = $("#results");

function lookupWord(searchText) {


	results.html("...");

	if(searchText.length == 0) {
		results.html("Search text must not be blank.")
			.removeClass("persian");

		return;
	}
	var persian = /[\u0600-\u06FF]/;

	if(persian.test(searchText)) {
		searchText = encodeURI(searchText);
		fromLang = "fa";
		toLang = "en";
	}	else {
		fromLang = "en";
		toLang = "fa";
	}

	var url = "//" + fromLang +".wikipedia.org/w/api.php"
		+ "?action=query"
	 	+ "&prop=langlinks"
	 	+ "&format=json"
	 	+ "&lllimit=100"
	 	+ "&llprop=url"
	 	+ "&lllang=" + toLang
	 	//+ "&llinlanguagecode=" + "fa"
	 	+ "&titles=" + searchText
	 	+ "&redirects=";

	 console.log(url);

	$.ajax({
		url: url,
		dataType: "jsonp",
		cache: true,
		success: sucessHandler,
		error: function(data) {
			results.html("Lookup failed!").removeClass("persian");;
		}
	});
}

function sucessHandler(data) {

	//console.log(data);
	data = data.query.pages;

	if(data.hasOwnProperty("-1")) {
		results.html("Term not found!").removeClass("persian");;
		return;
	}

	data = data[Object.keys(data)[0]];
	//console.log(data);

	$("#searchBox").val(data.title);


	if(data.langlinks === undefined) {
		results.html("Term not found!").removeClass("persian");
		return;
	}

	data = data.langlinks[0];

	if(toLang === 'fa') {
		results.addClass("persian");
	} else {
		results.removeClass("persian");
	}

	results.html('<a href="' + data["url"] + '" target="_blank">' + data["*"] + '</a>');

}