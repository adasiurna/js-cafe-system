"use strict";
$(document).ready(function () {


  $('#tables').on('click', '.table', function () {
    console.log('clicked a table');
    let tableIndex = $(this).index();
    let tableName = this.id;

    // set the active table name to the DOM element with the ID #activeTableName
    $('#activeTableName').html(tableName);

    // if table has guests and ordered meals
    if (tables_data[tableIndex].numberOfGuests && tables_data[tableIndex].meals) {
      console.log('turim sveciu skaiciu ir turim uzsakytus patiekalus');
      $('#getNumberOfGuestsForm').show();
      $('#getNumberOfGuestsForm').html('table ' + tables_data[tableIndex].tableName + ' is taken, has ' + tables_data[tableIndex].numberOfGuests + ' guests');
      renderGuestOrderForm(tableIndex);
      renderOrderedMealsList(tableIndex);

    } else {
      $('#tableIndexInGuestsBox').hide();
      $("#showNumberOfGuestsHere").hide();
      $('#guests_box').hide();
      $('#orderedMealsList').hide();

      // if table is free, render form to insert the number of guests
      renderGetNumberOfGuestsForm(tableIndex);

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
    $('#guests_box').show();



  })

  $('#guests_box').on('click', '#guestsBoxSubmit', function () {
    console.log('clicked on the guests box submit button');
    const tableIndex = $('#guests_box > #tableIndexInGuestsBox').val();

    tables_data[tableIndex].meals.push($('#guests_box > .meal').val());
    tables_data[tableIndex].meals.push($('#guests_box > .drink').val());
    tables_data[tableIndex].meals.push($('#guests_box > .dessert').val());
    const allMeals = tables_data[tableIndex].meals;
    console.log(allMeals);
    renderOrderedMealsList(tableIndex);
    $('#orderedMealsList').show();
    renderOrderedMealsList(tableIndex);


  })

  $('#tables_board').on('click', '#generateBillBtn', function () {
    console.log('clicked on the generate bill button');
    const tableIndex = $('#guests_box > #tableIndexInGuestsBox').val();
    console.log('table indeksas: ' + tableIndex);
    var allMeals = tables_data[tableIndex].meals;

    for (var i = 0; i < allMeals.length; i++) {
      // if we have en element 
      if (allMeals[i]) {

        // iterate through every word/number of array 
        var oneOrderArray = allMeals[i].split(" ");
        console.log(oneOrderArray);
        for (var j = 0; j < oneOrderArray.length; j++) {
          console.log(oneOrderArray[j]);
          var lookingForFloat = parseFloat(oneOrderArray[j]);
          if (lookingForFloat > 0) {
            console.log('radom kaina! ji yra: ' + lookingForFloat);
            tables_data[tableIndex].prices.push(lookingForFloat);
            console.log(tables_data[tableIndex].prices);
          }
        }
      }
    }

  });


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
      <input type="number" name="howMany" id="howMany" min="1" max="6" value="2" required>\
      <input type="hidden" id="tableIndexIngetNumberOfGuestsForm" value="'+ tableIndex + '">\
      <input type="button" id="submit" value="Submit"> ';
    $('#getNumberOfGuestsForm').html(HTML);
  } else {
    console.log('table is taken');
  }
}

function renderGuestOrderForm(tableIndex) {
  console.log('tables_data[tableIndex].numberOfGuests renderGuestOrderForm funkcijoje: ' + tables_data[tableIndex].numberOfGuests);

  var HTML = '<input hidden id="tableIndexInGuestsBox" value="' + tableIndex + '"><hr>\
        Meal: \
          <select class="meal" name="meal">\
                        <option></option>\
                        <option>Fish 8.49</option>\
                        <option>Meat 7.89</option>\
                        <option>Soup 2.20</option>\
                        <option>Sallad 5.50</option>\
                    </select><br>\
        Drink:\
            <select class="drink" name="drink">\
                        <option></option>\
                        <option>Water 1.50</option>\
                        <option>Sparkling water 1.50</option>\
                        <option>Tea 2.50</option>\
                        <option>Frech juice 2.80</option>\
                    </select><br>\
        Dessert:\
            <select class="dessert" name="dessert">\
                        <option></option>\
                        <option>Carrot cake 5.50</option>\
                        <option>Ice cream 4.20</option>\
                        <option>Creme brulle 4.50</option>\
                        <option>Blueberry pie 5.90</option>\
                    </select>\
    <hr>\
  <input type="button" id="guestsBoxSubmit" value="Submit">'
  $("#guests_box").html(HTML);
}

function renderOrderedMealsList(tableIndex) {
  const allMeals = tables_data[tableIndex].meals;
  let HTML = '<ol>';
  for (var i = 0; i < allMeals.length; i++) {
    if (allMeals[i]) {

      // check if there's is same order
      for (var j = 0; j < i; j++) {
        var allMeals_i = allMeals[i].substring(1, 6);
        var allMeals_j = allMeals[j].substring(1, 6);

        // if we have 2 same meals
        if ((allMeals_i) && (allMeals_j) && (allMeals_i == allMeals_j)) {

          // write x2 or x3 etc to the end of the string of allMeals[j]
          if (allMeals[j].endsWith('x2')) {
            allMeals[j] = allMeals[j].replace('x2', 'x3');
          } else {
            if (allMeals[j].endsWith('x3')) {
              allMeals[j] = allMeals[j].replace('x3', 'x4');
            } else {
              if (allMeals[j].endsWith('x4')) {
                allMeals[j] = allMeals[j].replace('x4', 'x5');
              } else {
                if (allMeals[j].endsWith('x5')) {
                  allMeals[j] = allMeals[j].replace('x5', 'x6');
                } else {
                  if (allMeals[j].endsWith('x6')) {
                    allMeals[j] = allMeals[j].replace('x6', 'x7');
                  } else {
                    allMeals[j] = allMeals[j] + ' x2';
                  }
                }
              }
            }
          }

          // after we adjusted allMeals[j], we can leave allMeals[i] blank...
          allMeals[i] = '';

          // end of j loop
        }
      }
      HTML += '<li>' + allMeals[i] + '</li>';
    }
  }
  HTML += '</ol>';
  $('#orderedMealsList').html(HTML);
  $('#generateBillBtn').show();
}