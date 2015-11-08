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
    }
    google.setOnLoadCallback(initialize);

