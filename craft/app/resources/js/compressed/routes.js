/*
 Copyright (c) 2014, Pixel & Tonic, Inc.
 @license   http://buildwithcraft.com/license Craft License Agreement
 @link      http://buildwithcraft.com
*/
(function(d){var h=Garnish.Base.extend({tokens:null,routes:null,$container:null,$addRouteBtn:null,sorter:null,init:function(){this.tokens={};this.routes=[];this.$container=d("#routes");for(var b=this.getRoutes(),a=0;a<b.length;a++){var c=new f(b[a]);this.routes.push(c)}this.sorter=new Garnish.DragSort(b,{axis:Garnish.Y_AXIS,onSortChange:d.proxy(this,"updateRouteOrder")});this.$addRouteBtn=d("#add-route-btn");this.addListener(this.$addRouteBtn,"click","addRoute")},getRoutes:function(){return this.$container.children()},
updateRouteOrder:function(){for(var b=this.getRoutes(),a={},c=0;c<b.length;c++)a["routeIds["+c+"]"]=d(b[c]).attr("data-id");Craft.postActionRequest("routes/updateRouteOrder",a,d.proxy(function(a,b){"success"==b&&(a.success?Craft.cp.displayNotice(Craft.t("New route order saved.")):Craft.cp.displayError(Craft.t("Couldn\u2019t save new route order.")))},this))},addRoute:function(){new g}}),f=Garnish.Base.extend({$container:null,id:null,$url:null,$template:null,modal:null,init:function(b){this.$container=
d(b);this.id=this.$container.attr("data-id");this.$url=this.$container.find(".url:first");this.$template=this.$container.find(".template:first");this.addListener(this.$container,"click","edit")},edit:function(){this.modal?this.modal.show():this.modal=new g(this)},updateHtmlFromModal:function(){for(var b="",a=0;a<this.modal.urlInput.elements.length;a++)var c=this.modal.urlInput.elements[a],b=this.modal.urlInput.isText(c)?b+c.val():b+c.prop("outerHTML");this.$url.html(b);this.$template.html(this.modal.$templateInput.val())}}),
g=Garnish.Modal.extend({route:null,$heading:null,$urlInput:null,urlElements:null,$templateInput:null,$saveBtn:null,$cancelBtn:null,$spinner:null,$deleteBtn:null,loading:!1,init:function(b){this.route=b;b="<h4>"+Craft.t("Add a token")+"</h4>";for(var a in Craft.routes.tokens)b+='<div class="token" data-name="'+a+'" data-value="'+Craft.routes.tokens[a]+'">'+a+"</div>";a=d('<form class="modal route-settings" accept-charset="UTF-8"><div class="header"><h1></h1></div><div class="body"><div class="field"><div class="heading"><label for="url">'+
Craft.t("If the URI looks like this")+':</label></div><div id="url" class="text url"></div><div class="url-tokens">'+b+'</div></div><div class="field"><div class="heading"><label for="template">'+Craft.t("Load this template")+':</label></div><input id="template" type="text" class="text fullwidth template"></div></div><div class="footer"><div class="buttons"><input type="submit" class="btn submit" value="'+Craft.t("Save")+'"> <input type="button" class="btn cancel" value="'+Craft.t("Cancel")+'"><div class="spinner" style="display: none;"></div><a class="delete">'+
Craft.t("Delete")+"</a></div></div></form>");a.appendTo(Garnish.$bod);this.$heading=a.find("h1:first");this.$urlInput=a.find(".url:first");this.$templateInput=a.find(".template:first");this.$saveBtn=a.find(".submit:first");this.$cancelBtn=a.find(".cancel:first");this.$spinner=a.find(".spinner:first");this.$deleteBtn=a.find(".delete:first");this.route||this.$deleteBtn.hide();this.urlInput=new Garnish.MixedInput(this.$urlInput);this.route?this.$heading.html(Craft.t("Edit Route")):this.$heading.html(Craft.t("Create a new route"));
if(this.route){b=this.route.$url.prop("childNodes");for(var c=0;c<b.length;c++){var e=b[c];Garnish.isTextNode(e)?this.urlInput.addTextElement().setVal(e.nodeValue):this.addUrlVar(e)}setTimeout(d.proxy(function(){var a=this.urlInput.elements[0];this.urlInput.setFocus(a);this.urlInput.setCarotPos(a,0)},this),1);b=this.route.$template.text();this.$templateInput.val(b)}else setTimeout(d.proxy(function(){this.$urlInput.focus()},this),100);this.base(a);a=this.$container.find(".url-tokens").children("div");
this.addListener(a,"mousedown",function(a){this.addUrlVar(a.currentTarget)});this.addListener(this.$container,"submit","saveRoute");this.addListener(this.$cancelBtn,"click","cancel");this.addListener(this.$deleteBtn,"click","deleteRoute")},addUrlVar:function(b){var a=d(b).clone().attr("tabindex","0");this.urlInput.addElement(a);this.addListener(a,"keydown",function(b){switch(b.keyCode){case Garnish.LEFT_KEY:setTimeout(d.proxy(function(){this.urlInput.focusPreviousElement(a)},this),1);break;case Garnish.RIGHT_KEY:setTimeout(d.proxy(function(){this.urlInput.focusNextElement(a)},
this),1);break;case Garnish.DELETE_KEY:setTimeout(d.proxy(function(){this.urlInput.removeElement(a)},this),1),b.preventDefault()}})},show:function(){this.route&&(this.$heading.html(Craft.t("Edit Route")),this.$deleteBtn.show());this.base()},saveRoute:function(b){b.preventDefault();if(!this.loading){b={};this.route&&(b.routeId=this.route.id);for(var a=0;a<this.urlInput.elements.length;a++){var c=this.urlInput.elements[a];this.urlInput.isText(c)?b["url["+a+"]"]=c.val():(b["url["+a+"][0]"]=c.attr("data-name"),
b["url["+a+"][1]"]=c.attr("data-value"))}b.template=this.$templateInput.val();this.loading=!0;this.$saveBtn.addClass("active");this.$spinner.show();Craft.postActionRequest("routes/saveRoute",b,d.proxy(function(a,b){this.$saveBtn.removeClass("active");this.$spinner.hide();this.loading=!1;if("success"==b)if(a.success){if(!this.route){var c=d('<div class="pane route" data-id="'+a.routeId+'"><div class="url"></div><div class="template"></div></div>');c.appendTo("#routes");this.route=new f(c);this.route.modal=
this;Craft.routes.sorter.addItems(c);1==Craft.routes.sorter.$items.length&&d("#noroutes").addClass("hidden")}this.route.updateHtmlFromModal();this.hide();Craft.cp.displayNotice(Craft.t("Route saved."))}else Craft.cp.displayError(Craft.t("Couldn\u2019t save route."))},this))}},cancel:function(){this.hide();this.route&&(this.route.modal=null)},deleteRoute:function(){confirm(Craft.t("Are you sure you want to delete this route?"))&&(Craft.postActionRequest("routes/deleteRoute",{routeId:this.route.id},
function(b,a){"success"==a&&Craft.cp.displayNotice(Craft.t("Route deleted."))}),Craft.routes.sorter.removeItems(this.route.$container),this.route.$container.remove(),this.hide(),0==Craft.routes.sorter.$items.length&&d("#noroutes").removeClass("hidden"))}});Craft.routes=new h})(jQuery);

//# sourceMappingURL=routes.min.map
