// Define table data structures
var resultFormat = [{
    field: 'ns', 
    title: 'NS',
    sortable: true
}, {
    field: 'title',
    title: "Title",
    sortable: true
}, {
    field: 'timestamp',
    title: 'Data/Time',
    sortable: true
}, {
    field: 'size',
    title: "Size",
    sortable: true
}, {
    field: 'wordcount',
    title: 'Words',
    sortable: true
}, {
    field: 'snippet',
    title: 'Snippet',
    sortable: true
}]


// Load Bootstrap table and data
function loadTable(searchTerm) {	
	 
	$.ajax({
		type: "get",
		url:  "https://en.wikipedia.org/w/api.php?action=query&list=search&utf8=&format=json&srlimit=500",
		dataType: 'jsonp',
		data: "&srsearch=" + searchTerm,
		success: function(data){	
			if (data.query.search[0].title == 0) { data = ""; }
		
			$('#searchResults').bootstrapTable ({
				locale:  'en-US',
                striped: true,
                pagination: true,
                pageSize: 10,
                pageList: [10, 25, 50, 100],
                showColumns: true,
				showToggle:  true,		
				showHeader:  true,
		        showFooter:  true,
		        showPaginationSwitch: true,			
				search:      true,
				minimumCountColumns: 2,
				columns: resultFormat,
				data: data.query.search
			});
		
		}
	});

}
	

// Setup Search to load new table
function setupSearch(searchTerm) {
	
	$("#searchTerm").val(searchTerm);
	 
	$('#searchTerm').on('keyup', function (e) {
		  if (e.keyCode == 13) {
			  $('#searchResults').bootstrapTable('destroy');
			  loadTable( $("#searchTerm").val() );
			  return false;
		  }
	});
	
}
