"use strict";
$(document).ready(function () {

    $('#tables > .table').click(function () {
        var tableName = $(this).attr("id");
        var tableIndex = getTableIndex(tableName);

        console.log("Indeksas yra: " + tableIndex + " o staliukas: " + tables_data[tableIndex].tableName);

        //JEI STALIUKAS LAISVAS
        if (tables_data[tableIndex].numberOfGuests == '') {
            showGuestsSubmitForm(tableName);

            $('#numberOfGuests').on('click', '#submit', function () {
                console.log('tableIndex kai staliukas laisvas: ' + tableIndex);
                getNumberOfGuests(tableIndex);
            })
        } else {
            $("#guests_box").html('staliukas numeris ' + (tableIndex + 1) + ' yra užimtas');
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
    console.log(howManyGuests);
    console.log(tableIndex);
    //pridedam sveciu skaiciu i duomenu masyva
    tables_data[tableIndex].numberOfGuests = howManyGuests;
    $("#numberOfGuests").hide();
    $("#tableHaveGuests> p > .valueHere").text(howManyGuests);
    $("#tableHaveGuests").show();
    renderGuestOrderForm(howManyGuests);
}

function renderGuestOrderForm(numberOfGuests) {
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