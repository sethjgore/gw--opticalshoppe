/*
 Copyright (c) 2014, Pixel & Tonic, Inc.
 @license   http://buildwithcraft.com/license Craft License Agreement
 @link      http://buildwithcraft.com
*/
(function(a){a(".bucket-select select").change(function(){a(".url-prefix").val(a(".bucket-select select option:selected").attr("data-url-prefix"));a(".bucket-location").val(a(".bucket-select select option:selected").attr("data-location"))});a(".refresh-buckets").click(function(){if(!a(this).hasClass("disabled")){a(this).addClass("disabled");var d={keyId:a(".s3-key-id").val(),secret:a(".s3-secret-key").val()};a.post(Craft.actionUrl+"/assetSources/getS3Buckets",d,a.proxy(function(b){a(this).removeClass("disabled");
if(b.error)alert(b.error);else if(0<b.length){var e=a(".bucket-select select").prop("disabled",!1),d=e.val();e.empty();for(var c=0;c<b.length;c++)e.append('<option value="'+b[c].bucket+'" data-url-prefix="'+b[c].url_prefix+'" data-location="'+b[c].location+'">'+b[c].bucket+"</option>");a(".url-prefix").val(a(".bucket-select select option:selected").attr("data-url-prefix"));a(".bucket-location").val(a(".bucket-select select option:selected").attr("data-location"));e.val(d)}},this))}});a(".container-select select").change(function(){a(".rackspace-urlPrefix").val(a(".container-select select option:selected").attr("data-urlPrefix"))});
a(".rackspace-refresh-containers").click(function(){if(!a(this).hasClass("disabled")){a(this).addClass("disabled");var d={username:a(".rackspace-username").val(),apiKey:a(".racskspace-api-key").val(),location:a(".rackspace-location-select select").val()};a.post(Craft.actionUrl+"/assetSources/getRackspaceContainers",d,a.proxy(function(b){a(this).removeClass("disabled");if(b.error)alert(b.error);else if(0<b.length){var e=a(".container-select select").prop("disabled",!1),d=e.val();e.empty();for(var c=
0;c<b.length;c++)e.append('<option value="'+b[c].container+'" data-urlPrefix="'+b[c].urlPrefix+'">'+b[c].container+"</option>");a(".rackspace-urlPrefix").val(a(".container-select select option:selected").attr("data-urlPrefix"));e.val(d)}},this))}});a(".google-bucket-select select").change(function(){var d=a(".google-bucket-select select option:selected");a(".google-url-prefix").val(d.attr("data-url-prefix"));a(".google-bucket-location").val(d.attr("data-location"))});a(".google-refresh-buckets").click(function(){if(!a(this).hasClass("disabled")){a(this).addClass("disabled");
var d={keyId:a(".google-key-id").val(),secret:a(".google-secret-key").val()};a.post(Craft.actionUrl+"/assetSources/getGoogleCloudBuckets",d,a.proxy(function(b){a(this).removeClass("disabled");if(b.error)alert(b.error);else if(0<b.length){var e=a(".google-bucket-select select").prop("disabled",!1),d=e.val();e.empty();for(var c=0;c<b.length;c++)e.append('<option value="'+b[c].bucket+'" data-url-prefix="'+b[c].url_prefix+'" data-location="'+b[c].location+'">'+b[c].bucket+"</option>");a(".google-url-prefix").val(a(".google-bucket-select select option:selected").attr("data-url-prefix"));
e.val(d)}},this))}})})(jQuery);

//# sourceMappingURL=asseteditsourcesettings.min.map
