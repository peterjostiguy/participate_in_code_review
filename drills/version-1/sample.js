// Reviewed by Brooks on 9/27/17

$(document).ready(function () {
   pM()
   $('.addItemtoOrder').hover(
    function () {
    $(this).addClass('blue lighten-1')
    }, function () {
    $(this).removeClass('lighten-1')
    })
    $('.deliverIt').hover(
    function () {
    $(this).addClass('green lighten-1')
    }, function () {
    $(this).removeClass('lighten-1')
    })
   $('.img-btn').hover(
     function () {
       $(this).addClass('black')
     }, function () {
     $(this).removeClass('black')
   })
 })

 function pM () {
   var url = 'https://galvanize-eats-api.herokuapp.com/menu'
   $.get(url)
    .then(function (data) {
    var typeList = []
           for (var i = 0; data.menu.length; i++) {
        var currentType = data.menu[i].type
             var currentName = data.menu[i].name
             var currentPrice = data.menu[i].price
             if (!typeList.includes(currentType)) {
               typeList.push(currentType)
               $('.menuItems').append('<div class="' + currentType + '"></div>')
               $('.' + currentType).append('<h3>' + currentType + 's' + '</h3>')
               $('.' + currentType).append('<li class="details">' + currentName + ' $' + currentPrice + '</li>')
             } else {
               $('.' + currentType).append('<li class="details">' + currentName + ' $' + currentPrice + '</li>')
             }
           }
           $('li').first().addClass('white')
         })
 }

 var selectedItem = ''
 var subTotal = 0
 var tax = 8.3 / 100
 var grandTotal = 0

 var postObject = {
   i: [],
   a: '',
   t: '',
   n: ''
 }
