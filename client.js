$(function () {
  CalculateFootprints();
    
  $('body').on('change', '.numberInput', CalculateFootprints);
    
  function CalculateFootprints()
    {
        
      var broodjesVlees = Math.abs($("#broodjesVlees").val());
      var broodjesKaas = Math.abs($("#broodjesKaas").val());
      var banaans = Math.abs($("#banaan").val());
      var koffies = Math.abs($("#koffie").val());
    
      var co2 = (broodjesVlees * 0.46) +
                (broodjesKaas * 0.37) +
                (banaans * 0.05) +
                (koffies * 0.07);
      var km=co2 / 0.16;
      
      document.getElementById('co2Result').innerHTML = co2.toFixed(2) + ' kg of CO<sub>2</sub><br>' + 
                                                       km.toFixed(2) + ' km in an average car';
    }
});
