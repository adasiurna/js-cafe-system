"use strict";
$(document).ready(function () {


  $('#tables').on('click', '.table', function () {
    console.log('clicked a table');
    let tableIndex = $(this).index();
    let tableName = this.id;
    $("#showNumberOfGuestsHere").hide();
    console.log(tableName + ' tableIndex: ' + tableIndex);

    // set the active table name to the DOM element with the ID #activeTableName
    $('#activeTableName').html(tableName);

    // check if table is free
    if (!tables_data[tableIndex].numberOfGuests) {

      // if table is free, render form to insert the number of guests
      renderGetNumberOfGuestsForm(tableIndex);

    } else {
      // if table is taken?
      // todo
      $('#getNumberOfGuestsForm').show();
      $('#getNumberOfGuestsForm').html('table ' + tables_data[tableIndex].tableName + ' is taken, has ' + tables_data[tableIndex].numberOfGuests + ' guests');
    }

  });

  $('#getNumberOfGuestsForm').on('click', '#submit', function () {
    var tableIndex = $('#tableIndexIngetNumberOfGuestsForm').val();
    const howManyGuests = $("#howMany").val();

    // set numberOfGuests value in tables_data
    tables_data[tableIndex].numberOfGuests = howManyGuests;

    // fix info for user
    $("#getNumberOfGuestsForm").html(' ');
    $("#showNumberOfGuestsHere> p > .valueHere").text(howManyGuests);
    $("#showNumberOfGuestsHere").show();

    // renderGuestOrderForm
    renderGuestOrderForm(tableIndex);


  })




  // doc ready function ends
});

/////////////////////////////////////////////////////
/////            FUNCTIONS                     //////
/////////////////////////////////////////////////////

function renderGetNumberOfGuestsForm(tableIndex) {
  console.log('----rendering GetNumberOfGuestsForm with tableIndex-----');

  if ($('#getNumberOfGuestsForm').val() == '' &&
    !tables_data[tableIndex].numberOfGuests) {

    // if table is free render getNumberOfGuestsForm
    const HTML = '<label for="howMany">How many guests?</label>\
      <input type="number" name="howMany" id="howMany" min="1" max="6" required>\
      <input type="hidden" id="tableIndexIngetNumberOfGuestsForm" value="'+ tableIndex + '">\
      <input type="button" id="submit" value="Submit"> ';
    $('#getNumberOfGuestsForm').html(HTML);
  } else {
    console.log('table is taken');
  }
}

function renderGuestOrderForm(tableIndex) {
  console.log('tables_data[tableIndex].numberOfGuests renderGuestOrderForm funkcijoje: ' + tables_data[tableIndex].numberOfGuests);

  var numberOfGuests = tables_data[tableIndex].numberOfGuests;
  var HTML = '';
  for (var i = 0; i < numberOfGuests; i++) {
    HTML += '<div class="guest">\
        <form class="meal">\
            Meal:\
            <select name="meal">\
                        <option value="fish">Fish</option>\
                        <option value="meat">Meat</option>\
                        <option value="soup">Soup</option>\
                        <option value="sallad">Sallad</option>\
                    </select>\
                    <input type="button" value="Submit">\
                </form>\
        <form class="drink">\
            Drink:\
            <select name="drink">\
                        <option value="water">Water</option>\
                        <option value="sparkling_water">Sparkling water</option>\
                        <option value="tea">Tea</option>\
                        <option value="fresh_juice">Frech juice</option>\
                    </select>\
                    <input type="button" value="Submit">\
                </form>\
        <form class="dessert">\
            Dessert:\
            <select name="dessert">\
                        <option value="carrot_cake">Carrot cake</option>\
                        <option value="ice_cream">Ice cream</option>\
                        <option value="creme_brulle">Creme brulle</option>\
                        <option value="blueberry_pie">Blueberry pie</option>\
                    </select>\
                    <input type="button" value="Submit">\
                </form>\
    </div ><hr>'

  }
  $("#guests_box").html(HTML);
}