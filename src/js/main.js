/**
 * WECAFC Fisheries data viewer 
 * Application development funded by BlueBridge EC project
 * 
 * @author Emmanuel Blondel GIS & Marine web-information systems Expert
 *		   Contact: https://eblondel.github.io / emmanuel.blondel1@gmail.com 
 */

var app = app || {};
var app = "1.0-beta"
 
$(document).ready(function(){
	app = new OpenFisViewer({
		OGC_CSW_BASEURL: "https://wecafc-firms.d4science.org/geonetwork/srv/eng/csw",
		OGC_CSW_SCHEMA : "http://www.isotc211.org/2005/gmd",
		OGC_WMS_LAYERS : [
			{
				group: 0, id: "eez", title: "EEZ boundaries",
				wmsUrl: "https://wecafc-firms.d4science.org/geoserver/wecafc/wms", layer: "wecafc:eez_overlap_strict",
				visible: true, showLegend: true, opacity: 0.6, tiled: true, cql_filter: undefined
			},
			{
				group: 0, id: "fsa2", title: "FAO Subarea 41.1 and breakdown",
				wmsUrl: "http://www.fao.org/figis/geoserver/area/wms", layer: "area:FAO_AREAS",
				visible: false, showLegend: true, opacity: 0.9, tiled: true, cql_filter: "F_SUBAREA = '41.1'"
			},
			{
				group: 0, id: "fsa1", title: "FAO Major Area 31 and breakdown* <br><small style='margin-left: 22px'>(*draft stage, not endorsed by CWP)</small>",
				wmsUrl: "http://www.fao.org/figis/geoserver/fifao/wms", layer: "fifao:FAO_AREAS",
				visible: false, showLegend: true, opacity: 0.9, tiled: true, cql_filter: "F_AREA = 31"
			},	
			{
				group: 0, id: "wecafc", title: "WECAFC Competence area",
				wmsUrl: "https://wecafc-firms.d4science.org/geoserver/wecafc/wms", layer: "wecafc:RFB_WECAFC",
				visible: true, showLegend: true, opacity: 0.9, tiled: true, cql_filter: undefined, style: undefined
			},
			{
				group: 0, id: "marineareas", title: "Marine areas",
				wmsUrl: "https://wecafc-firms.d4science.org/geoserver/wecafc/wms", layer: "wecafc:MarineAreas",
				visible: true, showLegend: false, opacity: 0.9, tiled: true, cql_filter: undefined
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
			layergroups : [{name: "Base overlays"},{name: "Fisheries maps"}]
		},
		ui 	: {
			query: { time: 'slider'}
		}
	});
	app.init();
});
