var arrValues = [500,  47,  144];
      var arrValues2 = [1814,  266, 466];
      var arrPopValues = [357,500,47];
      var arrPopValues2 = [2789,1886,266];

      $( document ).ready(function(){
      var svg= d3.select("#pieChart").append("svg").append("g");
      svg.append("g").attr("class", "slices");
      svg.append("g").attr("class", "labels");
      svg.append("g").attr("class", "lines");
	  

      var margin = {top: 30, right: 0, left: 0}
      , width = parseInt(d3.select('#pieChart').style('width'), 10)
      , width = width - margin.left - margin.right
      , height = 180, radius = Math.min(width, height) / 2;

      var pie = d3.layout.pie().sort(null).value(function(d) {return d.value;});

      var arc = d3.svg.arc().outerRadius(radius * 0.8).innerRadius(radius * 0.4);
      var outerArc = d3.svg.arc().innerRadius(radius * 0.9).outerRadius(radius * 0.9);

      svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      var key = function(d){ return d.data.label; }

      var color = d3.scale.ordinal().domain(["Positivos", "Negativos", "Neutros"])
      .range(["blue", "red", "#FF8C00"]);

      function randomData (){
        var labels = color.domain();
        if (mode ==1){
          labels=["Positivos", "Negativos", "Neutros"];
        }else{
          labels =["Likes", "Comments", "Shares"];
        }
        return labels.map(function(label, index){
          if(col==1){
            if(mode == 1){
              return { label: label, value: arrValues[index] };
            }else{
              return { label: label, value: arrPopValues[index] };
            }
          }else{
            if(mode == 1){
              return { label: label, value: arrValues2[index] };
            }else{
              return { label: label, value: arrPopValues2[index] };
            }
          }
        });
      }

      change(randomData());



      function change(data) {

      /* ------- PIE SLICES -------*/
      var slice = svg.select(".slices").selectAll("path.slice").data(pie(data), key);

      slice.enter().insert("path").style("fill", function(d) { return color(d.data.label); }).attr("class", "slice");

      slice.transition().duration(1000).attrTween("d", function(d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          return arc(interpolate(t));
        };
      });

      slice.exit().remove();

  /* ------- TEXT LABELS -------*/

  var text = svg.select(".labels").selectAll("text")
    .data(pie(data), key);

  text.enter()
    .append("text")
    .attr("dy", ".35em")
    .text(function(d) {
      return d.data.label;
    });
  
  function midAngle(d){
    return d.startAngle + (d.endAngle - d.startAngle)/2;
  }

  text.transition().duration(1000)
    .attrTween("transform", function(d) {
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function(t) {
        var d2 = interpolate(t);
        var pos = outerArc.centroid(d2);
        pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
        return "translate("+ pos +")";
      };
    })
    .styleTween("text-anchor", function(d){
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function(t) {
        var d2 = interpolate(t);
        return midAngle(d2) < Math.PI ? "start":"end";
      };
    });

  text.exit()
    .remove();

  /* ------- SLICE TO TEXT POLYLINES -------*/

  var polyline = svg.select(".lines").selectAll("polyline")
    .data(pie(data), key);
  
  polyline.enter()
    .append("polyline");

  polyline.transition().duration(1000)
    .attrTween("points", function(d){
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function(t) {
        var d2 = interpolate(t);
        var pos = outerArc.centroid(d2);
        pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
        return [arc.centroid(d2), outerArc.centroid(d2), pos];
      };      
    });
  
    polyline.exit()
    .remove();
  };

      $("#selInterval").change(function(){
        drawGaugeCharts(parseInt($(this).val()));
        change(randomData(parseInt($(this).val())));
      });

      $("#acceptance").click(function(){
        mode = 1;
        if(parseInt($("#selInterval").val()) == 1){
          $("#pieHeading").html("Pie-Chart Aceptacion (7 dias)");
        }else{
          $("#pieHeading").html("Pie-Chart Aceptacion (2 meses)");
        }
        change(randomData(parseInt($("#selInterval").val())));
      });
      $("#popularity").click(function(){
        mode = 2;
        if(parseInt($("#selInterval").val()) == 1){
          $("#pieHeading").html("Pie-Chart Popularidad (7 dias)");
        }else{
          $("#pieHeading").html("Pie-Chart Popularidad (2 meses)");
        }
        change(randomData(parseInt($("#selInterval").val())));
      });


});

