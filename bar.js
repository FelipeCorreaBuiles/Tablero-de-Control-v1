google.charts.setOnLoadCallback(drawStacked);

function drawStacked() {
  var dias = google.visualization.arrayToDataTable([    
  ['Fecha', 'Postivos','Negativos'],
  ['4/01/2016', 33, -4],
  ['5/01/2016',   9,  -25],
  ['6/01/2016', 0,  -87],
  ['7/01/2016', 57, -23],
  ['8/01/2016', 67,-10],
  ['9/01/2016', 59, -91],
  ['10/01/2016',  67, -40],
  ['11/01/2016',  27, -72],
  ['12/01/2016',  12, -46]
  ]);

  var semanas = google.visualization.arrayToDataTable([   
  ['Fecha', 'Postivos','Negativos'],
  ['semana 6',  298,  -374],
  ['semana 5',  198,  -374],
  ['semana 4',  221,  -245],
  ['semana 3',  292,  -387],
  ['semana 2',  270,  -363],
  ['semana Actual', 167,-390]
  ]);

   var horas = google.visualization.arrayToDataTable([   
  ['Fecha', 'Postivos','Negativos'],
  ['27/01 8:00',  28,  -54],
  ['27/01 9:00',  28,  -54],
  ['27/01 10:00',  11,  -45],
  ['27/01 11:00',  22,  -37],
  ['27/01 12:00',  30,  -63],
  ['27/01 13:00', 17,-30]
  ]);
  
  
  
  var meses = google.visualization.arrayToDataTable([   
  ['Fecha', 'Postivos','Negativos'],
  ['Octubre-15', 1000, -999],
  ['Noviembre-15', 1369, -1366],
  ['Diciembre-15', 1231, -1104],
  ['Enero-16', 554,  -900]
  ]);

  var options = {
    
    chart: {
          title: 'Comportamiento de sentimientos - dias',
       //   subtitle: 'dias'
    },
	
    chartArea: {width: '60%', height:'70%',backgroundColor:'red'},
	height: 300,
    isStacked: true,
    orientation:"horizontal",
    backgroundColor:{fill:'red'},
    // #D3D3D3 #EBEBEB
    hAxis: {
      title: 'Sentimientos',
      minValue: 0,
    },
    vAxis: {
      title: 'Cantidad de Comentarios'
    }
  };

  var chart = new google.charts.Bar(document.getElementById('bar_div'));
  chart.draw(horas, options);
    
  /* var btns = document.getElementById('btn-group');
     btns.onclick = function (e) { 
    
   // function cambiarGrafico() {
   // var comparar = document.getElementById("btn-group").value;
    
   var comparar=e.target.id;
    if (comparar.localeCompare("meses")==0){
    chart.draw(meses, options);
    
    }
    else if(comparar.localeCompare("dias")==0){
    chart.draw(dias, options);
    }
    else if(comparar.localeCompare("semanas")==0){
    chart.draw(semanas, options);
    }
    }*/ 
    //////////////////////////////////////////
  var select=document.getElementById('mySelect');
  select.onchange=function(){
    var comparar = document.getElementById("mySelect").value;  
    if (comparar.localeCompare("meses")==0){
      
      options.chart.title='Comportamiento de sentimientos - meses';
      chart.draw(meses, options);
    }
    else if(comparar.localeCompare("dias")==0){
      
      options.chart.title='Comportamiento de sentimientos - dias';
      chart.draw(dias, options);
    }
    else if(comparar.localeCompare("semanas")==0){
      
      options.chart.title='Comportamiento de sentimientos - semanas';
      chart.draw(semanas, options);
    }
	   else if(comparar.localeCompare("horas")==0){
      
      options.chart.title='Comportamiento de sentimientos - horas';
      chart.draw(horas, options);
    }
	
	
  };
}