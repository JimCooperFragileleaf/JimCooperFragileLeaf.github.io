$(function () {
  CalculateFootprints();
    
  $('body').on('change', '.numberInput', CalculateFootprints);
    
  function CalculateFootprints() {
    var rowNumbers = [1, 2, 3, 4, 5, 7, 8, 9, 11, 12, 13, 14, 15];
    var inputIds = ['pork', 'beef', 'chicken', 'salmon', 'cheese', 'orangeJuice', 'milk', 'coffee', 'apple', 'pear', 'clementine', 'orange', 'banana'];
    var co2Multipliers = [0.1905, 0.45575, 0.13325, 0.1785, 0.3696, 0.668, 1.062, 0.273, 0.0325, 0.0423, 0.0144, 0.048, 0.046];
    var waterMultipliers = [149.7, 385.375, 108.125, 0, 151.8, 1018, 1020, 0, 102.75, 130.002, 33.66, 0, 0];
    const co2DPs = 2;
    const waterDPs = 0;
    const co2Column = 2;
    const co2PercColumn = 3;
    const waterColumn = 4;
    const waterPercColumn = 5;
    
    var totalCO2 = GetTotal(inputIds, co2Multipliers, co2DPs).toFixed(co2DPs);
    var km = (totalCO2 / 0.16).toFixed(co2DPs);
    var totalWater = GetTotal(inputIds, waterMultipliers, waterDPs).toFixed(waterDPs);
    var bathTubs = (totalWater / 80).toFixed(waterDPs);
      
    SetTableValues(co2Column, co2PercColumn, totalCO2, rowNumbers, inputIds, co2Multipliers, co2DPs);
    SetTableValues(waterColumn, waterPercColumn, totalWater, rowNumbers, inputIds, waterMultipliers, waterDPs);
    
    document.getElementById('co2Result').innerHTML = totalCO2 + ' kg of CO<sub>2</sub><br>' + 
                                                     km + ' km in an average car<br><br>' +
                                                     totalWater + ' litres of water<br>' +
                                                     bathTubs + ' bathtubs';
    }
  
  function SetTableValues(column, percColumn, total, rowNumbers, inputIds, multipliers, decimalPoints) {
     for (i = 0; i < rowNumbers.length; i++) {
         var value = CalculateValueFor(inputIds[i], multipliers[i]).toFixed(decimalPoints);
         var percentage = total == 0 ? '' : (100 * value / total).toFixed(decimalPoints);
         SetCellValue(rowNumbers[i], column, value);
         SetCellValue(rowNumbers[i], percColumn, percentage);
     } 
  }

  function CalculateValueFor(inputId, multiplier) {
      return Math.abs($('#' + inputId).val()) * multiplier;
  }    
      
  function SetCellValue(row, column, value){
      var cell = document.getElementById("footprintsTable").rows[row].cells[column];
      
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
