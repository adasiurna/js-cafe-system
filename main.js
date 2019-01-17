"use strict";
$(document).ready(function () {

  $('#tables > .table').click(function () {
    var tableName = $(this).attr("id");
    var tableIndex = getTableIndex(tableName);

    console.log("Paspaudus ant staliuko: " + tables_data[tableIndex].tableName +
      " sveciu skaicius: " + tables_data[tableIndex].numberOfGuests);
    console.log("Sekantis staliukas: " + tables_data[tableIndex + 1].tableName +
      " sveciu skaicius: " + tables_data[tableIndex + 1].numberOfGuests);

    //JEI STALIUKAS LAISVAS
    if (!tables_data[tableIndex].ifTaken) {
      $("#guests_box").html('');
      $('#tableHaveGuests').hide();
      $("#numberOfGuests").hide();
      showGuestsSubmitForm(tableName);

      console.log("Prieš pasirenkant sveciu skaiciu formoje staliukas: " + tables_data[tableIndex].tableName +
        " sveciu skaicius: " + tables_data[tableIndex].numberOfGuests);

      $('#numberOfGuests').on('click', '#submit', function () {
        console.log('tableIndex kai staliukas laisvas: ' + tableIndex);
        //renderina kiekvieno svecio lentele kai passirenkam skaiciu!
        getNumberOfGuests(tableIndex);
        console.log('sveciu skaicius sekmingai pasirinktas, renderinsim uzsakymu forma');
        renderGuestOrderForm(tableIndex);

        console.log("Pasirinkus sveciu skaiciu formoje staliukas: " + tables_data[tableIndex].tableName +
          " sveciu skaicius: " + tables_data[tableIndex].numberOfGuests);
        console.log("Sekantis staliukas: " + tables_data[tableIndex + 1].tableName +
          " sveciu skaicius: " + tables_data[tableIndex + 1].numberOfGuests);
        console.log('-----------------');

      })

    } else {
      $('#tableHaveGuests').hide();
      $("#guests_box").html('staliukas numeris ' + (tableIndex + 1) + ' yra užimtas, turi ' + tables_data[tableIndex].numberOfGuests + ' svecius');
    }

  });






});

function getTableIndex(tableName) {
  var tableIndex;
  switch (tableName) {
    case "table1":
      tableIndex = 0;
      break;
    case "table2":
      tableIndex = 1;
      break;
    case "table3":
      tableIndex = 2;
      break;
    case "table4":
      tableIndex = 3;
      break;
    default: tableIndex = null
  }
  return tableIndex;
}

function getNumberOfGuests(tableIndex) {
  var howManyGuests = $("#howMany").val();

  //pridedam sveciu skaiciu i duomenu masyva
  tables_data[tableIndex].numberOfGuests = howManyGuests;

  // slepiam sveciu skaiciaus pasirinkimo forma ir uzrasom kiek sveciu
  $("#numberOfGuests").hide();
  $("#tableHaveGuests> p > .valueHere").text(howManyGuests);
  $("#tableHaveGuests").show();
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

function showGuestsSubmitForm(tableName) {
  $('#numberOfGuests').show();
  //var tableName = $(this).attr("id");

  for (var i = 0; i < tables_data.length; i++) {
    if (tables_data[i].ifTaken) {
      console.log(tables_data[i].tableName + ' staliukas užimtas');
    } else {
      if (tables_data[i].tableName == tableName) {
        tables_data[i].ifTaken = true;
        console.log(tables_data[i].tableName + " tables_data[i].ifTaken reikšmė yra: " + tables_data[i].ifTaken);
      }
    }
  }
}