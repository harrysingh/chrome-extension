this["RQ"] = this["RQ"] || {};
this["RQ"]["Templates"] = this["RQ"]["Templates"] || {};

this["RQ"]["Templates"]["RedirectRuleEditor"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "selected";
},"3":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression, alias4=this.lambda;

  return "        <div class=\"pair-container\" data-index=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n          <div class=\"source-container\">\n            <span class=\"title\">Url</span>\n\n            <div class=\"dropdown-container\">\n              <select class=\"source-operator-select\" data-key=\"source.operator\">\n                <option value=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.RULE_OPERATORS : depth0)) != null ? stack1.EQUALS : stack1), depth0))
    + "\" "
    + ((stack1 = (helpers.equals || (depth0 && depth0.equals) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.source : depth0)) != null ? stack1.operator : stack1),((stack1 = (depth0 != null ? depth0.RULE_OPERATORS : depth0)) != null ? stack1.EQUALS : stack1),{"name":"equals","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Equals</option>\n                <option value=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.RULE_OPERATORS : depth0)) != null ? stack1.CONTAINS : stack1), depth0))
    + "\" "
    + ((stack1 = (helpers.equals || (depth0 && depth0.equals) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.source : depth0)) != null ? stack1.operator : stack1),((stack1 = (depth0 != null ? depth0.RULE_OPERATORS : depth0)) != null ? stack1.CONTAINS : stack1),{"name":"equals","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Contains</option>\n                <option value=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.RULE_OPERATORS : depth0)) != null ? stack1.MATCHES : stack1), depth0))
    + "\" "
    + ((stack1 = (helpers.equals || (depth0 && depth0.equals) || alias1).call(depth0,((stack1 = (depth0 != null ? depth0.source : depth0)) != null ? stack1.operator : stack1),((stack1 = (depth0 != null ? depth0.RULE_OPERATORS : depth0)) != null ? stack1.MATCHES : stack1),{"name":"equals","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Matches</option>\n              </select>\n            </div>\n\n            <input type=\"text\" class=\"form-control source-value-input\" data-key=\"source.value\"\n               value=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.source : depth0)) != null ? stack1.value : stack1), depth0))
    + "\" placeholder=\""
    + alias3(((helper = (helper = helpers.sourcePlaceholder || (depth0 != null ? depth0.sourcePlaceholder : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"sourcePlaceholder","hash":{},"data":data}) : helper)))
    + "\" />\n\n            <span class=\"glyphicon glyphicon-trash delete-pair action-icon\"></span>\n          </div>\n\n          <div class=\"input-group destination-container\">\n            <span class=\"input-group-addon\">Destination</span>\n            <input type=\"url\" class=\"form-control destination-url-input\" data-key=\"destination\"\n               placeholder=\""
    + alias3(((helper = (helper = helpers.destinationPlaceholder || (depth0 != null ? depth0.destinationPlaceholder : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"destinationPlaceholder","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias3(((helper = (helper = helpers.destination || (depth0 != null ? depth0.destination : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"destination","hash":{},"data":data}) : helper)))
    + "\">\n          </div>\n        </div>\n      </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression, alias4=this.lambda;

  return "<nav class=\"rule-header rq-green\">\n  <span>Redirect Request Rule</span>\n</nav>\n\n<section class=\"rule-body\">\n  <div class=\"input-group name-container\">\n    <span class=\"input-group-addon\">Rule Name</span>\n    <input type=\"text\" class=\"form-control rule-name-input\" placeholder=\"\" value=\""
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "\">\n  </div>\n\n  <div class=\"rule-status-container\">\n    <span class=\"title\">Status</span>\n      <span class=\"dropdown-container\">\n        <select class=\"rule-status-select\">\n          <option value=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.RULE_STATUS : depth0)) != null ? stack1.ACTIVE : stack1), depth0))
    + "\" "
    + ((stack1 = (helpers.equals || (depth0 && depth0.equals) || alias1).call(depth0,(depth0 != null ? depth0.status : depth0),((stack1 = (depth0 != null ? depth0.RULE_STATUS : depth0)) != null ? stack1.ACTIVE : stack1),{"name":"equals","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Active</option>\n          <option value=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.RULE_STATUS : depth0)) != null ? stack1.INACTIVE : stack1), depth0))
    + "\" "
    + ((stack1 = (helpers.equals || (depth0 && depth0.equals) || alias1).call(depth0,(depth0 != null ? depth0.status : depth0),((stack1 = (depth0 != null ? depth0.RULE_STATUS : depth0)) != null ? stack1.INACTIVE : stack1),{"name":"equals","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">Inactive</option>\n        </select>\n      </span>\n  </div>\n\n  <div class=\"description-container\">\n    <div class=\"title\">Rule Description (Optional)</div>\n    <textarea class=\"rule-description\"\n      placeholder=\"e.g. Redirecting app.js on qa environment to dev environment\">"
    + alias3(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper)))
    + "</textarea>\n  </div>\n\n  <div class=\"pairs-container\">\n    <div class=\"title\">\n      <span class=\"left\">Source Destination Pairs</span>\n      <button class=\"right btn add-pair\">\n        <span class=\"glyphicon glyphicon-plus-sign action-icon\"></span>\n        <span>New</span>\n      </button>\n    </div>\n\n    <div class=\"well well-sm\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.pairs : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n  </div>\n\n  <div class=\"buttons-container\">\n    <a class=\"btn btn-success save-rule\">Save</a>\n    <a href=\"#\" class=\"btn btn-default\">Cancel</a>\n  </div>\n</section>";
},"useData":true});