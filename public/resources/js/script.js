$(document).ready(function() {

  $("#slider").owlCarousel({
    navigation : false, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true
  });

  var $container = $('#j-product-container');

  $container.isotope({
    getSortData :{
      price: function($elem){
        return parseFloat($elem.find(".merchitem__price").attr('data-price'));
      }
    }
  });

  $('#merch-filters a').click(function(){

    $optionSet = $(this).parent();
    $optionSet.find('.selected').removeClass('selected');
    $(this).addClass('selected');

    var selector = $(this).attr('data-filter');
    $container.isotope({filter: selector});
  });

  $('#merch-sorters a').click(function(){

    $optionSet = $(this).parent();
    $optionSet.find('.selected').removeClass('selected');
    $(this).addClass('selected');

    var sortName = $(this).attr('data-sort');
    $container.isotope({sortBy: sortName, sortAscending: true});
  });

   $('#merch-priceHigh').click(function(){
    $container.isotope({sortBy: 'price', sortAscending: false});
  });

});