this["RQ"] = this["RQ"] || {};
this["RQ"]["Templates"] = this["RQ"]["Templates"] || {};

this["RQ"]["Templates"]["RedirectRuleEditor"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "selected";
},"3":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression, alias4=this.lambda;

  return "      <div class=\"well well-sm pair-container\" data-index=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\r\n        <div class=\"source-container\">\r\n          <div class=\"dropdown-container\">\r\n            <select class=\"source-operator-select\" data-key=\"source.operator\">\r\n              <option value=\""
    + alias3(alias4(((stack1 = (depths[1] != null ? depths[1].RULE_OPERATORS : depths[1])) != null ? stack1.EQUALS : stack1), depth0))
    + "\" "
    + ((stack1 = (helpers.equals || (depth0 && depth0.equals) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.source : depth0)) != null ? stack1.operator : stack1),((stack1 = (depths[1] != null ? depths[1].RULE_OPERATORS : depths[1])) != null ? stack1.EQUALS : stack1),{"name":"equals","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Url Equals</option>\r\n              <option value=\""
    + alias3(alias4(((stack1 = (depths[1] != null ? depths[1].RULE_OPERATORS : depths[1])) != null ? stack1.CONTAINS : stack1), depth0))
    + "\" "
    + ((stack1 = (helpers.equals || (depth0 && depth0.equals) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.source : depth0)) != null ? stack1.operator : stack1),((stack1 = (depths[1] != null ? depths[1].RULE_OPERATORS : depths[1])) != null ? stack1.CONTAINS : stack1),{"name":"equals","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Url Contains</option>\r\n              <option value=\""
    + alias3(alias4(((stack1 = (depths[1] != null ? depths[1].RULE_OPERATORS : depths[1])) != null ? stack1.MATCHES : stack1), depth0))
    + "\" "
    + ((stack1 = (helpers.equals || (depth0 && depth0.equals) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.source : depth0)) != null ? stack1.operator : stack1),((stack1 = (depths[1] != null ? depths[1].RULE_OPERATORS : depths[1])) != null ? stack1.MATCHES : stack1),{"name":"equals","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Url Matches</option>\r\n            </select>\r\n          </div>\r\n\r\n          <input type=\"text\" class=\"form-control source-value-input\" data-key=\"source.value\"\r\n             value=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.source : depth0)) != null ? stack1.value : stack1), depth0))
    + "\" placeholder=\""
    + alias3(((helper = (helper = helpers.sourcePlaceholder || (depth0 != null ? depth0.sourcePlaceholder : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"sourcePlaceholder","hash":{},"data":data}) : helper)))
    + "\" />\r\n\r\n          <span class=\"glyphicon glyphicon-trash delete-pair action-icon\"></span>\r\n        </div>\r\n\r\n        <div class=\"input-group destination-container\">\r\n          <span class=\"input-group-addon\">Destination</span>\r\n          <input type=\"url\" class=\"form-control destination-url-input\" data-key=\"destination\"\r\n             placeholder=\""
    + alias3(((helper = (helper = helpers.destinationPlaceholder || (depth0 != null ? depth0.destinationPlaceholder : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"destinationPlaceholder","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias3(((helper = (helper = helpers.destination || (depth0 != null ? depth0.destination : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"destination","hash":{},"data":data}) : helper)))
    + "\">\r\n        </div>\r\n      </div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression, alias4=this.lambda;

  return "<nav class=\"rule-header rq-green\">\r\n  <a href=\"#selectRule\" role=\"button\" class=\"back-button glyphicon glyphicon-share-alt\" aria-hidden=\"true\" title=\"Go Back\"></a>\r\n  <span>Redirect Request Rule</span>\r\n</nav>\r\n\r\n<section class=\"rule-body\">\r\n  <table><tr>\r\n    <td>\r\n      <div class=\"input-group name-container\">\r\n        <span class=\"input-group-addon\">Rule Name</span>\r\n        <input type=\"text\" class=\"form-control rule-name-input\" placeholder=\"\" value=\""
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "\">\r\n      </div>\r\n    </td>\r\n\r\n    <td>\r\n      <div class=\"rule-status-container\">\r\n        <span class=\"title\">Status</span>\r\n        <span class=\"dropdown-container\">\r\n          <select class=\"rule-status-select\">\r\n            <option value=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.RULE_STATUS : depth0)) != null ? stack1.ACTIVE : stack1), depth0))
    + "\" "
    + ((stack1 = (helpers.equals || (depth0 && depth0.equals) || alias1).call(depth0,(depth0 != null ? depth0.status : depth0),((stack1 = (depth0 != null ? depth0.RULE_STATUS : depth0)) != null ? stack1.ACTIVE : stack1),{"name":"equals","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Active</option>\r\n            <option value=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.RULE_STATUS : depth0)) != null ? stack1.INACTIVE : stack1), depth0))
    + "\" "
    + ((stack1 = (helpers.equals || (depth0 && depth0.equals) || alias1).call(depth0,(depth0 != null ? depth0.status : depth0),((stack1 = (depth0 != null ? depth0.RULE_STATUS : depth0)) != null ? stack1.INACTIVE : stack1),{"name":"equals","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Inactive</option>\r\n          </select>\r\n        </span>\r\n      </div>\r\n    </td>\r\n  </tr></table>\r\n\r\n  <div class=\"description-container\">\r\n    <div class=\"title\">Rule Description (Optional)</div>\r\n    <textarea class=\"rule-description\"\r\n      placeholder=\"e.g. Redirecting app.js on qa environment to dev environment\">"
    + alias3(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper)))
    + "</textarea>\r\n  </div>\r\n\r\n  <div class=\"title\">\r\n    <span class=\"left\">Source Destination Pairs</span>\r\n    <button class=\"right btn add-pair\">\r\n      <span class=\"glyphicon glyphicon-plus-sign action-icon\"></span>\r\n      <span>New</span>\r\n    </button>\r\n  </div>\r\n\r\n  <div class=\"pairs-container\">\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.pairs : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\r\n  </div>\r\n\r\n  <div class=\"buttons-container\">\r\n    <a class=\"btn btn-success save-rule\">Save</a>\r\n    <a href=\"#\" class=\"btn btn-default\">Cancel</a>\r\n  </div>\r\n</section>";
},"useData":true,"useDepths":true});