$(function () {
  CalculateFootprints();
    
  $('body').on('change', '.numberInput', CalculateFootprints);
    
  function CalculateFootprints() {
    var rowNumbers = [2, 3, 4, 5, 6, 8, 9, 10, 12, 13, 14, 15, 16];
    var inputIds = ['pork', 'beef', 'chicken', 'salmon', 'cheese', 'orangeJuice', 'milk', 'coffee', 'apple', 'pear', 'clementine', 'orange', 'banana'];
    var co2Multipliers = [0.1905, 0.45575, 0.13325, 0.1785, 0.3696, 0.167, 0.2655, 0.06825, 0.0325, 0.0423, 0.0144, 0.048, 0.046];
    var waterMultipliers = [149.7, 385.375, 108.125, 0, 151.8, 254.5, 255, 231.75, 102.75, 130.002, 33.66, 84, 79];
    const co2DPs = 2;
    const waterDPs = 0;
    const percDPs = 1;
    const co2Column = 2;
    const co2PercColumn = 3;
    const waterColumn = 4;
    const waterPercColumn = 5;
    
    var totalCO2 = GetTotal(inputIds, co2Multipliers, co2DPs).toFixed(co2DPs);
    var km = (totalCO2 / 0.1196).toFixed(co2DPs);
    var totalWater = GetTotal(inputIds, waterMultipliers, waterDPs).toFixed(waterDPs);
    var bathTubs = (totalWater / 80).toFixed(1);
      
    SetTableValues(co2Column, co2PercColumn, totalCO2, rowNumbers, inputIds, co2Multipliers, co2DPs, percDPs);
    SetTableValues(waterColumn, waterPercColumn, totalWater, rowNumbers, inputIds, waterMultipliers, waterDPs, percDPs);
    
    SetFootprints(totalCO2, km, totalWater, bathTubs);
  }
  
  function SetFootprints(totalCO2, km, totalWater, bathTubs) {
      var co2Cell = document.getElementById("footprintsTable").rows[0].cells[0];
      var waterCell = document.getElementById("footprintsTable").rows[0].cells[1];      

      co2Cell.innerHTML = totalCO2 + ' kg of CO<sub>2</sub><br>' + 
                          km + ' km in an average car';
      waterCell.innerHTML = totalWater + ' litres of water<br>' +
                            bathTubs + ' bathtubs';
 }
    
  function SetTableValues(column, percColumn, total, rowNumbers, inputIds, multipliers, decimalPoints, percDecimalPoints) {
     for (i = 0; i < rowNumbers.length; i++) {
         var value = CalculateValueFor(inputIds[i], multipliers[i]).toFixed(decimalPoints);
         var percentage = total == 0 ? '' : (100 * value / total).toFixed(percDecimalPoints);
         SetCellValue(rowNumbers[i], column, value);
         SetCellValue(rowNumbers[i], percColumn, percentage);
     } 
  }

  function CalculateValueFor(inputId, multiplier) {
      return Math.abs($('#' + inputId).val()) * multiplier;
  }    
      
  function SetCellValue(row, column, value){
      var cell = document.getElementById("dataTable").rows[row].cells[column];
      
      cell.innerHTML = value;
  }
    
  function GetTotal(inputIds, multipliers, decimalPoints) {
      var total = 0;
      
      for (i = 0; i < inputIds.length; i++) {
         var value = +(CalculateValueFor(inputIds[i], multipliers[i]).toFixed(decimalPoints));
         total = total + value;
      } 
     
      return total;
  }
});
