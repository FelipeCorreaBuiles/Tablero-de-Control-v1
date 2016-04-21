var json="";
      function drawLineChart(){
        var margin={top:30, right:10, bottom:50, left:60},
        chart = d3LineWithLegend().xAxis.label('tiempo').width(width(margin))
          .height(height(margin)).yAxis.label("Cantidad");

        //I have to read the data to call the function at the moment Im going to use the 
        //same function
        var svg = d3.select("#line-chart svg").datum(generateData());

        svg.transition().duration(500).attr('width', width(margin)).attr('height', height(margin)).call(chart);


		
        chart.dispatch.on('showTooltip', function(e){
          var offset = $("#line-chart").offset(),
          left = e.pos[0] + offset.left,
          top = e.pos[1] + offset.top,
          formatter = d3.format(".04f");
		  
		  

          var point = parsePoint (e.point[0], e.point[1]);

          var content = '<h4>' + e.series.label + '</h4>' + '<p>' + '<span class="value">[ '+ point +' ]</span>'+'</p>';

          nvtooltip.show([left, top], content);


          function parsePoint(arg1, arg2){
            var date  = new Date(arg1);
            var day = date.getDate();
            var month = date.getMonth()+1;
            var year = date.getFullYear();
            var strDate = ""+year+"/"+ month+ "/"+day;

            var value = parseInt(arg2);
            return strDate+", "+ value;
          }
        });

        chart.dispatch.on('hideTooltip', function(e){
          nvtooltip.cleanup();
        });

        //responsive chart d3
        $(window).resize(function(){
          var margin= chart.margin();
          chart.width(width(margin)).height(height(margin));

          d3.select("#line-chart svg").attr('width',width(margin)).attr('height',height(margin)).call(chart);
        });

        function width(margin){
          var w = parseInt(d3.select('#line-chart').style('width'))-20;
          return ( (w-margin.left - margin.right -20) < 0  ) ? margin.left + margin.right + 2 : w ;
        }

        function height(margin){
          var h = 400 - 20;
          return ( h - margin.top - margin.bottom - 20 < 0) ? margin.top + margin.bottom + 2 : h; 
        }


        /*
         This is the main function to retrieve the data once finished the graph modify this funtion to get the data from the spreadsheet
         */
         
        function generateData(){
          //modifiying this function its going to recieve one parameter wich is the time span but its goig to query the data from a google spreadsheet
          //
          dataJ = json.responseJSON["Line chart"], dataLength = dataJ.length,
          arrComents=[], arrLikes= [], arrPost=[], arrShares=[];

          for (var i = 0; i < dataLength; i++){
            arrComents.push([new Date(dataJ[i]["day"]), dataJ[i]["comments"]]);
            arrLikes.push([new Date(dataJ[i]["day"]), dataJ[i]["likes"]]);
            arrPost.push([new Date(dataJ[i]["day"]), dataJ[i]["posts"]]);
            arrShares.push([new Date(dataJ[i]["day"]), dataJ[i]["shares"]]);
          }


          return [
            {data:arrComents, label:'Comentarios'},
            {data:arrLikes, label:'Likes'},
            {data:arrPost, label:'Publicaciones'},
            {data:arrShares, label:'Shares'}
          ];
        }

        }

      $(document).ready(function(){
        
        var spreadsheetID = "10kOJq-7KQ5UrRKLeLJ_0zx5_HuZqu1SSFBA8_yJk_Fw";
        var url ="https://script.google.com/macros/s/AKfycbxOLElujQcy1-ZUer1KgEvK16gkTLUqYftApjNCM_IRTL3HSuDk/exec?id="+spreadsheetID+"&sheet=Line%20chart";

        json = $.getJSON(url,function(data){
          return data;
        });
        
        json.complete(drawLineChart);
      });