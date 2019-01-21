"use strict";
$(document).ready(function () {


  $('#tables').on('click', '.table', function () {
    let tableIndex = $(this).index();
    let tableName = this.id;

    // set the active table name to the DOM element with the ID #activeTableName
    $('#activeTableName').html(tableName);

    // if table has guests and ordered meals
    if (tables_data[tableIndex].numberOfGuests && tables_data[tableIndex].meals) {
      $('#getNumberOfGuestsForm').show();
      $('#getNumberOfGuestsForm').html('table ' + tables_data[tableIndex].tableName + ' is taken, has ' + tables_data[tableIndex].numberOfGuests + ' guests');
      renderGuestOrderForm(tableIndex);
      renderOrderedMealsList(tableIndex);
      $('#guests_box').show();
      $('#orderedMealsList').show();

    } else {
      $('#tableIndexInGuestsBox').hide();
      $("#showNumberOfGuestsHere").hide();
      $('#guests_box').hide();
      $('#orderedMealsList').hide();
      $('#generateBillBtn').hide();

      // if table is free, render form to insert the number of guests
      renderGetNumberOfGuestsForm(tableIndex);
    }
  });

  $('#getNumberOfGuestsForm').on('click', '#submit', function () {
    const tableIndex = $('#tableIndexIngetNumberOfGuestsForm').val();
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

    // set meals values in tables_data
    tables_data[tableIndex].meals.push($('#guests_box > .meal').val());
    tables_data[tableIndex].meals.push($('#guests_box > .drink').val());
    tables_data[tableIndex].meals.push($('#guests_box > .dessert').val());
    renderOrderedMealsList(tableIndex);
    $('#orderedMealsList').show();
    renderOrderedMealsList(tableIndex);
  })

  $('#tables_board').on('click', '#generateBillBtn', function () {
    console.log('clicked on the generate bill button');
    const tableIndex = $('#guests_box > #tableIndexInGuestsBox').val();
    console.log('table indeksas: ' + tableIndex);
    const allMeals = tables_data[tableIndex].meals;

    for (var i = 0; i < allMeals.length; i++) {

      // if we have en element in meals array
      if (allMeals[i]) {

        // iterate through every word/number of array 
        var oneOrderArray = allMeals[i].split(" ");
        console.log(oneOrderArray);
        for (var j = 0; j < oneOrderArray.length; j++) {
          console.log(oneOrderArray[j]);
          var lookingForFloat = parseFloat(oneOrderArray[j]);
          if (lookingForFloat > 0) {
            if ((oneOrderArray[j + 1]) && (oneOrderArray[j + 1] == 'x2')) {
              // if there is x2
              tables_data[tableIndex].prices.push(lookingForFloat * 2);
            } else {
              if ((oneOrderArray[j + 1]) && (oneOrderArray[j + 1] == 'x3')) {
                tables_data[tableIndex].prices.push(lookingForFloat * 3);
              } else {
                if ((oneOrderArray[j + 1]) && (oneOrderArray[j + 1] == 'x4')) {
                  tables_data[tableIndex].prices.push(lookingForFloat * 4);
                } else {
                  if ((oneOrderArray[j + 1]) && (oneOrderArray[j + 1] == 'x5')) {
                    tables_data[tableIndex].prices.push(lookingForFloat * 5);
                  } else {
                    if ((oneOrderArray[j + 1]) && (oneOrderArray[j + 1] == 'x6')) {
                      tables_data[tableIndex].prices.push(lookingForFloat * 6);
                    } else {
                      if ((oneOrderArray[j + 1]) && (oneOrderArray[j + 1] == 'x7')) {
                        tables_data[tableIndex].prices.push(lookingForFloat * 7);
                      } else {
                        tables_data[tableIndex].prices.push(lookingForFloat);
                        console.log(tables_data[tableIndex].prices);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    let HTML = '<h1>' + tables_data[tableIndex].tableName + ' bill</h1><ol>';
    for (var i = 0; i < tables_data[tableIndex].meals.length; i++) {

      if (tables_data[tableIndex].meals[i]) {
        HTML += '<li>' + tables_data[tableIndex].meals[i] + '</li>';
      }
    }

    // let's count the sum of the table prices
    let SumOfAllPricesForBill = 0;
    for (var k = 0; k < tables_data[tableIndex].prices.length; k++) {
      SumOfAllPricesForBill += tables_data[tableIndex].prices[k];
    }
    HTML += '</ol><h3>Total price: ' + SumOfAllPricesForBill + '</h3>';
    $('#generate_bill_here').html(HTML);
    $('#light_box').show();

  });

  $('#light_box').on('click', '.close', function () {
    $('#light_box').hide();
    const tableIndex = $('#guests_box > #tableIndexInGuestsBox').val();

    // empty tables_data data
    tables_data[tableIndex].ifTaken = '';
    tables_data[tableIndex].numberOfGuests = '';
    tables_data[tableIndex].meals = [''];
    tables_data[tableIndex].prices = [''];

    $('#tableIndexInGuestsBox').hide();
    $("#showNumberOfGuestsHere").hide();
    $('#guests_box').hide();
    $('#orderedMealsList').hide();
    $('#generateBillBtn').hide();

    // if table is free, render form to insert the number of guests
    renderGetNumberOfGuestsForm(tableIndex);

  });



  // doc ready function ends
});


/////////////////////////////////////////////////////
/////            FUNCTIONS                     //////
/////////////////////////////////////////////////////

function renderGetNumberOfGuestsForm(tableIndex) {

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

  let HTML = '<input hidden id="tableIndexInGuestsBox" value="' + tableIndex + '"><hr>\
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
        let allMeals_i = allMeals[i].substring(1, 6);
        let allMeals_j = allMeals[j].substring(1, 6);

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