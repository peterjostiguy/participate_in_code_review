$(document).ready(function() {
     var menuGet = "https://galvanize-eats-api.herokuapp.com/menu";
     $.get(menuGet)
         .then(function(data) {
             // run all data functions here
             // var type = data.menu[i].type;
             console.log(data);
             for (var i = 0; i < data.menu.length; i++) {
                 var type = data.menu[i].type;
                 var name = data.menu[i].name;
                 var price = data.menu[i].price;
                 var id = data.menu[i].id;
                 if (type === "burger") {
                     $(".burger.menu-type").append("<div class= 'food-item'>" + "<h5 class='choice'>" + name + "</h5>" + "<h5 class='choice'>" + "$" + price + "</h5>" + "</div>");
                 } else if (type === "pizza") {
                     $(".pizza.menu-type").append("<div class= 'food-item'>" + "<h5 class= 'choice'>" + name + "</h5>" + "<h5 class='choice'>" + "$" + price + "</h5>" + "</div>");
                 }
             }
             $(".food-item").first().addClass("select");

             $(".food-item").click(function() {
                 $(".food-item").removeClass("select");
                 $(this).toggleClass("select");
             });

             var check = 0;
             var tax = 0;
             var total = 0;
             $(".menu-select").click(function(event) {
                 event.preventDefault();
                 var chosen = $(".select").text();

                 var name = chosen.split("$")[0];
                 var price = chosen.split("$")[1];

                 var quantity = $(".quantity").val();

                 if (chosen && quantity >= 1 && quantity <= 99) {
                     for (var i = 0; i < quantity; i++) {
                         $('.order-items').append("<div class= 'food-item'>" + "<h6 class= 'choice'>" + name + "</h6>" + "" + "<h6 class='choice'>" + "$" + price + "</h6>" + "</div>");
                     }
                 }
                 check += Number(price) * Number(quantity);
                 $(".check-amount").empty();
                 $(".check-amount").append("<h5>$" + check.toFixed(2) + "<h5>");

                 tax = (check * 0.083).toFixed(2);
                 $(".tax-amount").empty();
                 $(".tax-amount").append("<h5>$" + tax + "<h5>");

                 total = Number(check) + Number(tax);
                 $(".total-amount").empty();
                 $(".total-amount").append("<h5>$" + total.toFixed(2) + "<h5>");
             });

         })
         .catch(function(data) {
             console.log(data);
         });

         var menuPost = "https://galvanize-eats-api.herokuapp.com/orders";
         $.post(menuPost)
         .then(function(data) {
           console.log(data);
           $(".order-submit").click(function(){

           });
         });
 });




 // function useData(dataReceived) {
 //   console.log(dataReceived);
 // }

 // posts how to add data to backend

 // $.post("https://jsonplaceholder.typicode.com/posts")
 // .then(function(data) {
 //   console.log(data);
 // });

 // added object
 // $.post("https://jsonplaceholder.typicode.com/posts", {"my data": "new"})
 // .then(function(data) {
 //   console.log(data);
 // })
 // .catch(function(data) {
 //   console.log(data);
 // });
