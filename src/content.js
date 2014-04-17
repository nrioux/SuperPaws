$(function() {
    // Timeout page: http://myneu.neu.edu/jsp/misc/timedout2.jsp
    

	$("a:link").filter(function() {
		return $(this).attr("href").match(/BannerCourseRedirectServlet/);
	}).qtip({
		hide: {
			fixed: true,
			delay: 500
		},
		style: {
			classes: "qtip-bootstrap"
		},
		content: function(event, api) {
			var $this = $(this),
				url   = $this.attr("href");
			console.log('clicked ' + url);
			$.get(url)
				.done(function(html) {
					var $data   = $("<div>").html(html),
						$tables = $data.find("table.datadisplaytable");
					if($tables.length < 2) {
						api.set("content.title", "Error");
						api.set("content.text", "This course could not be found.");
						return;
					}
					
					var $cells  = $tables.first().find("td"),
						title   = $cells.first().text(),
						text    = $cells.eq(1).contents().first().text();
					api.set("content.title", title);
					api.set("content.text", text);
				})
				.fail(function(xhr, status, error) {
					api.set("content.title", "Error");
					api.set("content.text", status + ": " + error);
				});
			
			return "Loading...";
		}
	});
});
