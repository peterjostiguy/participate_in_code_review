$('document').ready(function(){

   $.get('https://galvanize-eats-api.herokuapp.com/menu').then(function(data){
      menu = data
      console.log(menu)
      makeMenu(data)
    }).then(selectItem)

    $('.addItem').click(function(){
      orderIdArray =[]
      subtotal = 0
      tax = 0
      grandTotal = 0
      gTotal = 0
      taxTotal = 0

      addItem()
      subTotal()
      addTax()
      total()
    })


 })

 function makeMenu(data){
   console.log(menu)
   var type1 = menu.menu[0].type
   for (var i = 0; i < menu.menu.length; i++) {
     if (type1 != menu.menu[i].type){
       var type2 = menu.menu[i].type
     }
   }
   console.log(type1)
   console.log(type2)
   $(".catagoryOne").append(type1+"s")
   $(".catagoryTwo").append(type2+"s")
   for (var i = 0; i < menu.menu.length; i++) {
     var print = '<p id="'+menu.menu[i].id+'">'+menu.menu[i].name+'                      '+menu.menu[i].price+'</p>'
     if (menu.menu[i].type === type1){
       $(".catagoryOne").append(print)
     }
     else
     if(menu.menu[i].type === type2){
       $(".catagoryTwo").append(print)
     }
   }
 }
 
