var myStorage = window.localStorage, pageCount;
window.addEventListener('load', function(){
   $.ajax({
   url:"https://api.countapi.xyz/set/zage.cl/index?amount=1",
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
   url:"https://api.countapi.xyz/set/zage.cl/index",
   success: function(data) {
       alert(data['value']);
   }
   });
});

