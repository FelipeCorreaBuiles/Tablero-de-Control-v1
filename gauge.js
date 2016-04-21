var col = 1;
var mode = 1;
google.charts.load('current', {'packages':['gauge','bar', 'table', 'controls']});
google.charts.setOnLoadCallback(drawGaugeCharts);

function drawGaugeCharts(column){
  if (column==null){
    column = col;
  }
  //se prepara el dataTable
  var data = google.visualization.arrayToDataTable([
    ['Label', '7 dias', 'mes','trimestre','semestre'],
    ['Aceptacion', 88.96, 62.86,46.12,48.16],
    ['Popularidad', 71.85, 92.41,50.47,60.66]
  ]);

  var view = new google.visualization.DataView(data);
  view.setColumns([0,column]);

  var options = {
    min:0, max: 140,
	width: 600, height: 155,
    greenFrom: 90, greenTo: 140,
    yellowFrom:70, yellowTo: 90,
    redFrom:0, redTo:30,
    minorTicks: 8
  };

  var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

  chart.draw(view, options);

  if(column==1){
    $("#gaugeHeading").html("Ultimos 7 d&iacute;as");
    col=1;
  }
   else if(column==2){
    $("#gaugeHeading").html("Ultimo mes");
    col=2;
  }
  
  else if(column==3){
    $("#gaugeHeading").html("Ultimos trimestre");
    col=3;
  }
  else{
    $("#gaugeHeading").html("Ultimo semestre");
    col=4;
  }
  
}
