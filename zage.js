var myStorage = window.localStorage, pageCount;
window.addEventListener('load', function(){
   $.ajax({
   url:"//count.io/vb/ZAGEcountIndexVisits/users+",
   type: "POST"
   });


   if(!myStorage.getItem("pageCount")){
      myStorage.setItem('pageCount', 1);
   } else {
      pageCount = myStorage.getItem("pageCount");
      pageCount = parseInt(pageCount) + 1;
      myStorage.setItem('pageCount', pageCount );
   }
   console.log('page view count', myStorage.getItem("pageCount"));
   $.ajax({
   url:"//count.io/vb/ZAGEcountIndexVisits/",
   success: function(data) {
       alert(data.counts[0].count);
   }
   });
});

