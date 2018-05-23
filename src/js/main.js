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
				group: 0, id: "countries", title: "Countries",
				wmsUrl: "https://wecafc-firms.d4science.org/geoserver/wecafc/wms", layer: "wecafc:countries",
				visible: true, showLegend: true, opacity: 0.8, tiled: true, cql_filter: "iso_3 IN('ABW','AIA','ATG','BES','BHS','BLM','BLZ','BMU','BRA','BRB','COL','CRI','CUB','CUW','CYM','DMA','DOM','GLP','GRD','GTM','GUF','GUY','HND','HTI','JAM','KNA','LCA','MAF','MEX','MSR','MTQ','NIC','PAN','PRI','SUR','SXM','TCA','TTO','USA','VCT','VEN','VGB','VIR')"
			},
			{
				group: 0, id: "intersect_fsa_eez", title: "FAO Areas* - EEZ Intersects <br><small style='margin-left: 22px'>(*including breakdown in draft stage, not endorsed by CWP)</small>",
				wmsUrl: "http://www.fao.org/figis/geoserver/fifao/wms", layer: "fifao:FAO_AREAS_x_EEZ_HIGHSEAS",
				visible: false, showLegend: true, opacity: 0.9, tiled: true, cql_filter: "F_AREA = 31"
			},
			{
				group: 0, id: "fsa_41", title: "FAO Subarea 41.1 and breakdown",
				wmsUrl: "http://www.fao.org/figis/geoserver/area/wms", layer: "area:FAO_AREAS",
				visible: false, showLegend: true, opacity: 0.9, tiled: true, cql_filter: "F_SUBAREA = '41.1'"
			},
			{
				group: 0, id: "fsa_31_division", title: "FAO Major Area 31 - Divisions* <br><small style='margin-left: 22px'>(*draft stage, not endorsed by CWP)</small>",
				wmsUrl: "http://www.fao.org/figis/geoserver/fifao/wms", layer: "fifao:FAO_AREAS",
				visible: false, showLegend: true, opacity: 0.9, tiled: true, cql_filter: "F_AREA = 31 AND F_LEVEL = 'DIVISION'",
				style: 'all_fao_areas_orange'
			},
			{
				group: 0, id: "fsa_31_subarea", title: "FAO Major Area 31 - Subareas* <br><small style='margin-left: 22px'>(*draft stage, not endorsed by CWP)</small>",
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
			},
			{
				group: 2, id: "firms-resources", title: "Marine resources",
				wmsUrl: "http://www.fao.org/figis/geoserver/firms/wms", layer: "firms:resource_all_points",
				visible: false, showLegend: true, opacity: 0.9, tiled: false, cql_filter: "AGENCY = 'WECAFC'",
				style: 'point_resource_cluster'
			},{
				group: 2, id: "firms-fisheries", title: "Fisheries",
				wmsUrl: "http://www.fao.org/figis/geoserver/firms/wms", layer: "firms:fishery_all_points",
				visible: false, showLegend: true, opacity: 0.9, tiled: false, cql_filter: "AGENCY = 'WECAFC'",
				style: 'point_fishery_cluster'
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
			mainlayergroup: 1
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
