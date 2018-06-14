$(document).ready(function() {
  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  var apiKey = "ab7ee0c722594502ae5aeae450b283c8";


  var searchTermElem = $('#searchTerm');
  var numOfRecordsElem = $('#numOfRecords option:selected');
  var startDateElem = $('#start_date');
  var endDateElem = $('#end_date');


  function setParams(query,startDate,endDate)
  {
    queryURL += "?" + $.param({
        'api-key': apiKey,
    });

    if(query){
      queryURL += `&q=${query}`;
    }
    if(startDate){
      queryURL += `&begin_date=${startDate}`
    }
    if(endDate){
      queryURL += `&end_date=${endDate}`
    }   
  }

  function runSearch(numOfRecords)
  {
    $.ajax({
    url: queryURL,
    method: 'GET',
    }).then(function(data) {
      console.log(data);
      var results = data.response.docs
      /*results.foreach(function(docs) {
          // Create Div
          // Set Title to docs.headline.main for each element
          // append to CardBody
      })*/
      results.forEach(function(doc, idx) {
          console.log(doc);
          let articleDiv = $("<h3 class='articleHeadline'>");
          let indexSpan = $("<span class='label label-primary'>");
          let titleDiv = $("<strong>");
          let authorHeader = $('<h5>');
          
          var title = doc.headline.main;
          var author = undefined;
          if(doc.byline !== undefined)
            author = doc.byline.original;
          else
            author = doc.source;
          
          indexSpan.text((idx+1));
          titleDiv.text(title);
          authorHeader.text(author);

          articleDiv.append(title);
          articleDiv.append(indexSpan);
        
          $("#article-well-1").append(articleDiv);
      })

                      
    
          
      
    
    });
  }

  console.log('HELLO DUDE!');
  //Search By General Query, Start Date, and/or EndDate
  $("#startSearch").on('click', function(){
    let query = searchTermElem.val();
    let numOfRecords = numOfRecordsElem.text();
    let startDate = startDateElem.val();
    let endDate = endDateElem.val();

    console.log("query: " + query);    
    console.log("numOfRecords: " + numOfRecords);    
    console.log("startDate: " + startDate);    
    console.log("endDate: " + endDate);      

    setParams(query,startDate,endDate);
    runSearch(numOfRecords); 
  })
});

