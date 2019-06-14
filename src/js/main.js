/**
 * WECAFC Fisheries data viewer 
 *
 * @author Emmanuel Blondel GIS & Marine web-information systems Expert
 *		   Contact: https://eblondel.github.io / emmanuel.blondel1@gmail.com 
 */

var app = app || {};
var app = "1.0-beta"
 
$(document).ready(function(){

	//Google charts
	google.charts.load('current', {'packages':['corechart']});

	//OpenFairViewer
	app = new OpenFairViewer({
		OGC_CSW_BASEURL: "https://wecafc-firms.d4science.org/geonetwork/srv/eng/csw",
		OGC_CSW_SCHEMA : "http://www.isotc211.org/2005/gmd",
		OGC_WMS_LAYERS : [
			{
				group: 0, id: "shelf", title: "Continental Shelf",
				wmsUrl: "http://www.fao.org/figis/geoserver/wms", layer: "fifao:SHELF_ERASE",
				visible: true, showLegend: true, opacity: 0.8, tiled: true, cql_filter: undefined
			},
			{
				group: 0, id: "eez", title: "EEZ boundaries",
				wmsUrl: "https://wecafc-firms.d4science.org/geoserver/wecafc/wms", layer: "wecafc:eez_overlap_strict",
				visible: false, showLegend: true, opacity: 0.6, tiled: true, cql_filter: undefined
			},
			{
				group: 0, id: "200nm", title: "200 nautical miles arcs",
				wmsUrl: "http://www.fao.org/figis/geoserver/fifao/wms", layer: "fifao:limit_200nm",
				visible: true, showLegend: true, opacity: 0.6, tiled: true, cql_filter: undefined
			},
			{
				group: 0, id: "countries", title: "Countries",
				wmsUrl: "http://www.fao.org/figis/geoserver/wms", layer: "UN_intbnd_layergroup",
				visible: true, showLegend: true, opacity: 0.8, tiled: true, cql_filter: "ISO3_CNT1 IN('ABW','AIA','ATG','BES','BHS','BLM','BLZ','BMU','BRA','BRB','COL','CRI','CUB','CUW','CYM','DMA','DOM','GLP','GRD','GTM','GUF','GUY','HND','HTI','JAM','KNA','LCA','MAF','MEX','MSR','MTQ','NIC','PAN','PRI','SUR','SXM','TCA','TTO','USA','VCT','VEN','VGB','VIR') OR ISO3_CNT2 IN('ABW','AIA','ATG','BES','BHS','BLM','BLZ','BMU','BRA','BRB','COL','CRI','CUB','CUW','CYM','DMA','DOM','GLP','GRD','GTM','GUF','GUY','HND','HTI','JAM','KNA','LCA','MAF','MEX','MSR','MTQ','NIC','PAN','PRI','SUR','SXM','TCA','TTO','USA','VCT','VEN','VGB','VIR')"
			},
			{
				group: 0, id: "intersect_fsa_eez", title: "FAO Areas* - EEZ Intersects <br><small style='margin-left: 22px;display:table;'>(*including breakdown in draft stage, not endorsed by CWP)</small>",
				wmsUrl: "http://www.fao.org/figis/geoserver/fifao/wms", layer: "fifao:FAO_AREAS_x_EEZ_HIGHSEAS",
				visible: false, showLegend: true, opacity: 0.9, tiled: true, cql_filter: "F_AREA = 31"
			},
			{
				group: 0, id: "fsa_41", title: "FAO Subarea 41.1 and breakdown",
				wmsUrl: "http://www.fao.org/figis/geoserver/area/wms", layer: "area:FAO_AREAS",
				visible: false, showLegend: true, opacity: 0.9, tiled: true, cql_filter: "F_SUBAREA = '41.1'"
			},
			{
				group: 0, id: "fsa_31_division", title: "FAO Major Area 31 - Divisions* <br><small style='margin-left: 22px;display:table;'>(*draft stage, not endorsed by CWP)</small>",
				wmsUrl: "http://www.fao.org/figis/geoserver/fifao/wms", layer: "fifao:FAO_AREAS",
				visible: false, showLegend: true, opacity: 0.9, tiled: true, cql_filter: "F_AREA = 31 AND F_LEVEL = 'DIVISION'",
				style: 'all_fao_areas_orange'
			},
			{
				group: 0, id: "fsa_31_subarea", title: "FAO Major Area 31 - Subareas* <br><small style='margin-left: 22px;display:table;'>(*draft stage, not endorsed by CWP)</small>",
				wmsUrl: "http://www.fao.org/figis/geoserver/fifao/wms", layer: "fifao:FAO_AREAS",
				visible: false, showLegend: true, opacity: 0.9, tiled: true, cql_filter: "F_AREA = 31 AND F_LEVEL = 'SUBAREA'",
				style: 'all_fao_areas_blue'
			},
			{
				group: 0, id: "fsa_31_major", title: "FAO Major Area 31",
				wmsUrl: "http://www.fao.org/figis/geoserver/fifao/wms", layer: "fifao:FAO_AREAS",
				visible: true, showLegend: true, opacity: 0.9, tiled: true, cql_filter: "F_AREA = 31 AND F_LEVEL = 'MAJOR'"
			},	
			{
				group: 0, id: "wecafc", title: "WECAFC Competence area",
				wmsUrl: "https://wecafc-firms.d4science.org/geoserver/wecafc/wms", layer: "wecafc:RFB_WECAFC",
				visible: true, showLegend: true, opacity: 0.9, tiled: true, cql_filter: undefined, style: undefined
			},
			{
				group: 0, id: "marineareas", title: "Marine areas",
				wmsUrl: "https://wecafc-firms.d4science.org/geoserver/wecafc/wms", layer: "wecafc:MarineAreas",
				visible: true, showLegend: false, opacity: 0.9, tiled: false, cql_filter: undefined
			},{
				group: 2, id: "firms-resources", title: "Marine resources",
				wmsUrl: "http://www.fao.org/figis/geoserver/firms/wms", layer: "firms:resource_all_points",
				visible: true, showLegend: true, opacity: 0.9, tiled: false, cql_filter: "AGENCY = 'WECAFC'",
				style: 'point_resource_cluster'
			},{
				group: 2, id: "firms-fisheries", title: "Fisheries",
				wmsUrl: "http://www.fao.org/figis/geoserver/firms/wms", layer: "firms:fishery_all_points",
				visible: true, showLegend: true, opacity: 0.9, tiled: false, cql_filter: "AGENCY = 'WECAFC'",
				style: 'point_fishery_cluster'
			}
		],
		OGC_WFS_LAYERS : [
			{
				group: 2, id: "firms-resources", title: "Marine resources",
				wfsUrl: "http://www.fao.org/figis/geoserver/firms/wfs", layer: "firms: resource_all_points",
				visible: true, cql_filter: "AGENCY = 'WECAFC'"

			}
		]
	},{
		catalog : {
			maxitems: 25,
			filters: [
				{name: 'dc:subject', value: '%Fisheries%'}
			]
		},
		map : {
			extent: [-140.37817293406107, -18.569372534752684, -5.378172934061055, 45.94234621524731],
			zoom: 4,
			layergroups : [{name: "Base overlays"},{name: "Fisheries maps"},{name: "FIRMS Inventories"}],
			mainlayergroup: 1,
			tooltip: {
				enabled: true,
				handler: function(layer, feature){
					var html = '<div id="'+feature.getId()+'">';
					html += '<p style="margin:0px;"><b>Country:</b> '+feature.getProperties().geographic_identifier+'</p>';
					html += '<p id="features-loader" class="loader" style="display:block;"><img alt="loading" src="js/OpenFairViewer/img/loading.gif" /><br/><br/>Fetching data...</p>';

					html += '<div class="panel-heading">';
					html += '<ul id="features-tabs" class="nav nav-tabs">';
					html += '<li class="active"><a href="#featurechart-time" data-toggle="tab" style="padding:5px;">Time</a></li>';
					html += '<li><a href="#featurechart-species" data-toggle="tab" style="padding:5px;">Species</a></li>';
					html += '<li><a href="#featuredata" data-toggle="tab" style="padding:5px;">Data</a></li>';
					html += '</ul>';
					html += '</div>';
					
					html += '<div class="panel-body" style="height:85%;padding:0px;padding-left:15px;">';
					html += '<div class="tab-content">';
					html += '<div class="tab-pane fade in active" id="featurechart-time"><div id="features-linechart-time" style="width:100%;height:50%;"></div></div>';
					html += '<div class="tab-pane fade" id="featurechart-species"><div id="features-linechart-species" style="width:100%;height:50%;"></div></div>';
					html += '<div class="tab-pane fade" id="featuredata"><table id="features-table" class="display" width="100%"></table></div>';
					html += '</div>';

					html += '</div>';

					var cql_filter = "country = '"+feature.getProperties().geographic_identifier+"'";
					app.getDatasetFeatures(layer.baseDataUrl, layer.id.split("_aggregated")[0], layer.getSource().getParams().VIEWPARAMS, cql_filter, ["year","species","catches"]).then(function(features){
						var values = app.getDatasetValues(features);
						console.log(values);
						

						$('#features-tabs a[href="#featurechart-time"]').click(function(e){
							e.preventDefault();
							$(this).tab('show');
						});
						$('#features-tabs a[href="#featurechart-species"]').click(function(e){
							e.preventDefault();
							$(this).tab('show');
						});

						$('#features-tabs a[href="#featuredata"]').click(function(e){
							e.preventDefault();
							$(this).tab('show');
						});

						//Google Charts
						google.charts.setOnLoadCallback(drawTimeChart);
      						function drawTimeChart() {
							var timeseries = Enumerable.from(values)
        						.groupBy("$.year", null, function (key, g) {
                     						return [key, g.sum("$.catches")];
        						}).toArray();
							var arrayTimeData = new Array();
							arrayTimeData.push(["Year","Value"]);
							for(var i=0;i<timeseries.length;i++) arrayTimeData.push(timeseries[i]);
        						var time_data = google.visualization.arrayToDataTable(arrayTimeData);
        						var options = {
          							title: 'Catches (MT)',
          							legend: { position: 'bottom' }
        						};
        						var chart = new google.visualization.LineChart(document.getElementById('features-linechart-time'));
        						chart.draw(time_data, options);
     						}
						google.charts.setOnLoadCallback(drawSpeciesChart);
						function drawSpeciesChart() {
							var spseries = Enumerable.from(values)
        						.groupBy("$.species", null, function (key, g) {
                     						return [key, g.sum("$.catches")];
        						}).toArray();
							var arraySpData = new Array();
							arraySpData.push(["Species","Value"]);
							for(var i=0;i<spseries.length;i++) arraySpData.push(spseries[i]);
        						var sp_data = google.visualization.arrayToDataTable(arraySpData);
        						var options = {
          							title: 'Catches (MT)'
        						};
        						var chart = new google.visualization.PieChart(document.getElementById('features-linechart-species'));
        						chart.draw(sp_data, options);
     						}


						//DataTables
						var series = new Array();
						for(var i=0;i<values.length;i++){
							var value = values[i];
							series.push([value.year, value.species, value.catches]);
						}
						$('#features-table').DataTable( {
        						data: series, order: [[0, 'asc']],
        						columns: [{ title:"Year"},{title: "Species"},{ title:"Value"}],
							searching: false, destroy: true, pageLength: 5, lengthMenu: [ 5, 10, 25, 50]
						});

						$("#features-loader").hide();
												
					});
					return html;
				}
			}
		},
		ui 	: {
			browse: {
				datasetInfoHandler : function(metadata){
					var datasetInfoUrl = "https://wecafc-firms.d4science.org/geonetwork/srv/eng/catalog.search#/metadata/" + metadata.fileIdentifier;
					$('#datasetInfo').empty().html('<iframe src="'+datasetInfoUrl+'" style="overflow: hidden; height: 100%; width: 100%; position: absolute;"> frameborder="0" marginheight="0"></iframe>');
					app.openInfoDialog();
				}
			},
			query: { time: 'slider'}
		}
	});
	app.init();
});
