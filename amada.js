let currentData;
let filtering;

axios.get("/amada_data").then((response) => {
  $("#results").empty();
  $("#loading").hide();
  
  createTable(response.data);
  $("table").toggleClass("hidden");
  currentData = response.data;
})


$("#nest-sort").on("click", () => {
    $("#results").empty()
    createTable(currentData.sort(dynamicSort("nest")))
});
$("#nest-rev-sort").on("click", () => {
    $("#results").empty();
    createTable(currentData.sort(dynamicSortReverse("nest")));
});


$("#gage-sort").on("click", () => {
    $("#results").empty();
    createTable(currentData.sort(dynamicSort("gage")));
  })
$("#gage-rev-sort").on("click", () => {
    $("#results").empty();
    createTable(currentData.sort(dynamicSortReverse("gage")));
  })
  

$("#material-sort").on("click", () => {
    $("#results").empty();
    createTable(currentData.sort(dynamicSort("material")));
  })
$("#material-rev-sort").on("click", () => {
    $("#results").empty();
    createTable(currentData.sort(dynamicSortReverse("material")));
  })
  

$("#size_x-sort").on("click", () => {
    $("#results").empty();
    createTable(currentData.sort(dynamicSort("size_x")));
  })
$("#size_x-rev-sort").on("click", () => {
    $("#results").empty();
    createTable(currentData.sort(dynamicSortReverse("size_x")));
  })


$("#size_y-sort").on("click", () => {
    $("#results").empty();
    createTable(currentData.sort(dynamicSort("size_y")));
  })
$("#size_y-rev-sort").on("click", () => {
    $("#results").empty();
    createTable(currentData.sort(dynamicSortReverse("size_y")));
  })


$("#scrap-sort").on("click", () => {
    $("#results").empty();
    createTable(currentData.sort(dynamicSort("scrap")));
  })
$("#scrap-rev-sort").on("click", () => {
    $("#results").empty();
    createTable(currentData.sort(dynamicSortReverse("scrap")));
  })


$("#rough_scrap-sort").on("click", () => {
    $("#results").empty();
    createTable(currentData.sort(dynamicSort("rough_scrap")));
  })
$("#rough_scrap-rev-sort").on("click", () => {
    $("#results").empty();
    createTable(currentData.sort(dynamicSortReverse("rough_scrap")));
  })
  

const createTable = (data) => {
  let stripe = true;

  for (let nest = 0; nest < 1000; nest++){
    if (stripe) {
      $("#results").append($(`
      <tr class='table-row'>
        <td class='nest' id="stripe">${data[nest]["nest"]}</td>
        <td class='gage text-center' id="stripe">${data[nest]["gage"]}</td>
        <td class='nested_with' id="stripe">${data[nest]["nested_with"]}</td>
        <td class='material text-center' id="stripe">${data[nest]["material"]}</td>
        <td class='size_x text-center' id="stripe">${data[nest]["size_x"]}</td>
        <td class='size_y text-center' id="stripe">${data[nest]["size_y"]}</td>
        <td class='scrap text-center' id="stripe">${data[nest]["scrap"]}</td>
        <td class='rough_scrap text-center' id="stripe">${data[nest]["rough_scrap"]}</td>
        <td class='date text-center' id="stripe">${data[nest]["date"]}</td>
      </tr>`))
    
      stripe = false;

    } else {
      $("#results").append($(`
      <tr class='table-row'>
        <td class='nest'>${data[nest]["nest"]}</td>
        <td class='gage text-center'>${data[nest]["gage"]}</td>
        <td class='nested_with'>${data[nest]["nested_with"]}</td>
        <td class='material text-center'>${data[nest]["material"]}</td>
        <td class='size_x text-center'>${data[nest]["size_x"]}</td>
        <td class='size_y text-center'>${data[nest]["size_y"]}</td>
        <td class='scrap text-center'>${data[nest]["scrap"]}</td>
        <td class='rough_scrap text-center'>${data[nest]["rough_scrap"]}</td>
        <td class='date text-center'>${data[nest]["date"]}</td>
      </tr>`)
      );

      stripe = true;
    }
  }
};


$(".filter").on("keyup", () => {

  clearTimeout(filtering);
  filtering = setTimeout(() => {
    console.time("for");
  
    let filteredData = currentData;

    filteredData = filteredData.filter((nest) => {
      return nest.nest.includes($("#nest-filter").val())
      && nest.gage.includes($("#gage-filter").val())
      && nest.nested_with.includes($("#nested_with-filter").val())
      && nest.material.includes($("#material-filter").val())
      && nest.size_x.includes($("#size_x-filter").val())
      && nest.size_y.includes($("#size_y-filter").val())
      && nest.scrap.includes($("#scrap-filter").val())
      && nest.rough_scrap.includes($("#rough_scrap-filter").val())
      && nest.date.includes($("#date-filter").val())
    })
        
    $("#results").empty();
    createTable(filteredData);
    console.timeEnd("for");
  }, 200)
})
