    google.load("feeds", "1");

    function initialize() {
      var feed = new google.feeds.Feed("http://clowntube.tv/feed");
      feed.setNumEntries(10);
      var count = 1;
      feed.load(function(result) {
        if (!result.error) {
          var container = document.getElementById("feed");
          var html = "";
          for (var i = 0; i < result.feed.entries.length; i++) {
            var entry = result.feed.entries[i];
            html = "<div class='entrada'><h5><a href='" + entry.link + "'>"+ (i+1) +") " + entry.title + "</a></h5></div>";
            var div = document.createElement("div");
            div.innerHTML = html;
            container.appendChild(div);            
          }
          document.write(html);

        }
      });
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    
   var direccion = tabs[0].url
   resultado = direccion.match("(?:https?(?:a|vh?)?://)?(?:www.)?youtube(?:-nocookie)?.com/watch?.*v=([A-Za-z0-9-_]+)");
   if (resultado != null){
	var hostTit = 10;
	videoHost = "yt";
   } else {
	resultado = direccion.match("(?:https?(?:a|vh?)?://)?(?:www.)?vimeo.com/([A-Za-z0-9-_]+)");
	if (resultado != null){
            var hostTit = 9;
	    videoHost = "vm";
	} else {
	resultado = direccion.match("(?:https?://)?(?:www.)?dailymotion.com/video/([A-Za-z0-9]+)");
	if (resultado != null){
            var hostTit = 20;
	    videoHost = "dy";
	}
    }
   } 
   if (resultado !=null) {
	titulo = tabs[0].title;
	titulo = titulo.slice(0,titulo.length-hostTit);
	document.getElementById("currentLink").style.display = "block";
   }

   
});
     document.getElementById("currentLink").onclick = function()
   {
       chrome.tabs.create({url : "http://clowntube.tv/publish?h=" + videoHost + "&i=" + resultado[1] + "&t=" + titulo});
   }

    };

    google.setOnLoadCallback(initialize);

