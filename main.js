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
	titulo = tabs[0].title;
	titulo = titulo.slice(0,titulo.length-10);
	videoHost = encodeURIComponent("http://www.youtube.com/watch?v=");
	document.getElementById("currentLink").style.display = "block";
   } else {
	resultado = direccion.match("(?:https?(?:a|vh?)?://)?(?:www.)?vimeo.com/([A-Za-z0-9-_]+)");
	if (resultado != null){
        titulo = tabs[0].title;
	titulo = titulo.slice(0,titulo.length-9);
	videoHost = encodeURIComponent("http://vimeo.com/");
	document.getElementById("currentLink").style.display = "block";
	}
   }

   
});
     document.getElementById("currentLink").onclick = function()
   {
       alert('[URL]\n'+ videoHost + resultado[1] + '\n\n[TITULO]\n' + titulo);
       chrome.tabs.create({url : "http://clowntube.tv/publish?url=" + videoHost + resultado[1] + "&title=" + titulo});
   }

    };

    google.setOnLoadCallback(initialize);

