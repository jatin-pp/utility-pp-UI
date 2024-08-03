

$(document).ready(function() {

    var citiesDataList = document.getElementById('cities-datalist');
    var propertyTypeDataList = document.getElementById('propertyType-datalist');
    
    
        $.ajax({
            url: "http://localhost:8080/fetchMaster"
        }).then(function(data, status, jqxhr) {
          if(data){
            var jsonOptions = JSON.parse(data);
            // console.log("jsonOptions",jsonOptions)
    
    var citiesList = jsonOptions.cities;
    var projectTypeList = jsonOptions.projectType;
    // Loop over the JSON array.
    citiesList.forEach(function(item) {
      // console.log("item",citiesDataList);
            // Create a new <option> element.
            var option = document.createElement('option');
            // Set the value using the item in the JSON array.
            option.value = item;
            // Add the <option> element to the <datalist>.
              citiesDataList.appendChild(option);
          });
    
          projectTypeList.forEach(function(item) {
            // Create a new <option> element.
            var option = document.createElement('option');
            // Set the value using the item in the JSON array.
            option.value = item;
            // Add the <option> element to the <datalist>.
              propertyTypeDataList.appendChild(option);
          });
    
          }
          });
    });
    
    $("#city").change(function(){
      var areaDataList = document.getElementById('area-dataList');
      var areaInput = document.getElementById('area');
      $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "http://localhost:8080/fetchArea",
            data: JSON.stringify({"city":$(this).val()}),
            dataType: 'json',
            cache: false,
            timeout: 600000,
        }).then(function(data, status, jqxhr) {
          if(data){
    var areaList = data.areas;
    // console.log("area List",areaList);
    // Loop over the JSON array.
    areaList.forEach(function(item) {
      // console.log("item",areaDataList);
            // Create a new <option> element.
            var option = document.createElement('option');
            // Set the value using the item in the JSON array.
            option.value = item;
            // Add the <option> element to the <datalist>.
              areaDataList.appendChild(option);
          });
          $("#area").attr('disabled', false);
          }
        });

      });
    
    
    function getFilteredData() {
    
      
      let data = {"city":$("#city").val(),
        "propertyType":$("#propertyType").val(),
        "area":$("#area").val()
      }
      // console.log("Get Filtered",data);
      $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "http://localhost:8080/filterData",
            data: JSON.stringify(data),
            dataType: 'json',
            cache: false,
            timeout: 600000,
        }).then(function(data, status, jqxhr) {
          if(data){
    let properties = data.properties;
    var productDivData = '';
    properties.forEach(element => {
        var jsonOptions = JSON.parse(element);
        var propertyName = jsonOptions.name;
        var propertyImage = jsonOptions.projectImage;
      var sq_yd = jsonOptions.sq_yd;
      var price = jsonOptions.priceRemark;
      var highlight = jsonOptions.highlights;
      var propertyType = jsonOptions.propertyType;
      var area = jsonOptions.area;
      var city = jsonOptions.city;

      var possession = jsonOptions.possession;

     
      var website = jsonOptions.website;
     var brochureLink = jsonOptions.brochureLink;
     var youtubeVideo = jsonOptions.youtubeVideo;
        productDivData = productDivData + '<div class="showcase"> <div class="showcase-banner"> <img src="'+propertyImage+'" alt="'+propertyName+'" class="product-img default" width="300"> <img src="'+propertyImage+'"  alt="'+propertyName+'" class="product-img hover" width="300">  </div> <div class="showcase-content"> <h2> <div> '+propertyName+'<br>'+propertyType+' - '+sq_yd+' Sq. Yd.</div>   </h2> <div> '+area+' , '+city+'  </div><div>Possession : '+possession+'</div> <h5><div>Youtube Link : '+youtubeVideo+'</div></h5> <h1> <div class="price-box"> <p class="price">'+price+'</p> </div> </h1> <div> <b>Highlights</b> '+highlight.replace(/-/g, "<br>- ")+'</div> </div> </div>';

     
    

    });

    $("#result").html(productDivData);
    
          }
        });
      
    }

    function append_to_div(div_name, data){ 
        document.getElementById(div_name).innerText += data; 
    } 