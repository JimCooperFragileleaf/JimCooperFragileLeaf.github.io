// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function () {
  $('form').submit(function(event) {
    event.preventDefault();
    CalculateFootprints();
  });
  
  $('#numberOfLeftovers').on('input', function() { 
    CalculateFootprints();
  });
    
  $('#foodstuff').on('change',function(){
    CalculateFootprints();
  });
    
  function CalculateFootprints()
    {
      var numberOfLeftovers = document.getElementById("numberOfLeftovers").value;
      var multiplier=document.getElementById("foodstuff").value;
      var co2=Math.abs(numberOfLeftovers) * multiplier;
      var km=co2 / 0.16;
      document.getElementById('co2Result').innerHTML = co2.toFixed(3) + ' kg of CO<sub>2</sub><br>' + 
                                                       km.toFixed(2) + ' km in an average car';
    }
});
