angular.module("tower").run(["$templateCache", function($templateCache) {
    $templateCache.put("_template/module/contact/options.html", "<div class=\"module-options\">\r\n	<md-tabs md-dynamic-height>\r\n		<!-- Form Title -->\r\n		<md-tab>\r\n			<md-tab-label>\r\n				<md-icon>title</md-icon>\r\n			</md-tab-label>\r\n			<md-tab-body>\r\n				<md-content layout-gt-sm=\"row\" layout-padding>\r\n					<div>\r\n					  <md-input-container>\r\n						<label>Title</label>\r\n						<input ng-model=\"Module.data.title\" type=\"text\">\r\n					  </md-input-container>\r\n					</div>\r\n				</md-content>\r\n			</md-tab-body>\r\n		</md-tab>\r\n		<!-- Location -->\r\n		<md-tab>\r\n			<md-tab-label>\r\n				<md-icon>location_on</md-icon>\r\n			</md-tab-label>\r\n			<md-tab-body>\r\n				<md-content layout=\"row\" layout-padding>\r\n					<md-input-container>\r\n						<label>Address</label>\r\n						<input ng-model=\"Module.data.address\" type=\"text\">\r\n					</md-input-container>\r\n					<md-input-container>\r\n						<label>City</label>\r\n						<input ng-model=\"Module.data.city\" type=\"text\">\r\n					</md-input-container>\r\n					<md-input-container>\r\n						<label>State</label>\r\n						<md-select ng-model=\"Module.data.state\">\r\n							<md-option ng-repeat=\"state in Template.states\" value=\"{{state.abbreviation}}\">{{state.name}}</md-option>\r\n						</md-select>\r\n					</md-input-container>\r\n				</md-content>\r\n			</md-tab-body>\r\n		</md-tab>\r\n	</md-tabs>\r\n</div>");
    $templateCache.put("_template/module/contact/template.html", "<section layout=\"column\" layout-gt-sm=\"row\" class=\"module-contact {{Module.style.background_color}}\">\r\n	<!-- Form Input -->\r\n	<div layout=\"column\" flex=\"40\" flex-offset=\"5\">\r\n		<div>\r\n			<h2>{{Module.data.title}}</h2>\r\n		</div>\r\n		<div layout=\"column\">\r\n			<div layout=\"column\">\r\n				<input type=\"text\" placeholder=\"Name\" required>\r\n			</div>\r\n		</div>\r\n		<div layout=\"column\">\r\n			<div layout=\"column\">\r\n				<input type=\"text\" placeholder=\"Email\" required>\r\n			</div>\r\n		</div>\r\n		<div layout=\"column\">\r\n			<div layout=\"column\">\r\n				<input type=\"text\" placeholder=\"Subject\" required>\r\n			</div>\r\n		</div>\r\n		<div layout=\"column\">\r\n			<div layout=\"column\">\r\n				<textarea placeholder=\"Message\"></textarea>\r\n			</div>\r\n		</div>\r\n		<div layout=\"row\">\r\n			<md-button class=\"md-primary md-raised\">Submit</md-button>\r\n		</div>\r\n	</div>\r\n	<!-- Google Map -->\r\n	<div layout=\"column\" flex=\"40\" flex-offset=\"5\">\r\n		<iframe class=\"map\" src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001.4689233371632!2d-81.4218453845797!3d41.21155057928078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883123fb31f463af%3A0xd64ac0ca4280579a!2s2180+Barlow+Rd%2C+Hudson%2C+OH+44236!5e0!3m2!1sen!2sus!4v1459529635347\"\r\n		frameborder=\"0\"></iframe>\r\n	</div>\r\n</section>");
    $templateCache.put("_template/module/footer/options.html", "<div class=\"module-options\">\r\n	<md-tabs md-dynamic-height>\r\n		<!-- Color -->\r\n		<md-tab>\r\n			<md-tab-label>\r\n				<md-icon>color_lens</md-icon>\r\n			</md-tab-label>\r\n			<md-tab-body>\r\n				<div layout=\"column\">\r\n					<span class=\"option-title\">Color</span>\r\n					<div layout=\"row\">\r\n						<div layout=\"column\" ng-repeat=\"color in Template.colors\" ng-cloak>\r\n							<md-button aria-label=\"color.primary\" ng-click=\"Module.style.background_color= color.primary\" class=\"md-fab md-raised md-mini\" ng-class=\"color.primary\">\r\n								<md-icon></md-icon>\r\n							</md-button>\r\n							<md-button aria-label=\"color.dark\" ng-click=\"Module.style.background_color= color.dark\" class=\"md-fab md-raised md-mini\" ng-class=\"color.dark\">\r\n								<md-icon></md-icon>\r\n							</md-button>\r\n							<md-button aria-label=\"color.accent\" ng-click=\"Module.style.background_color= color.accent\" class=\"md-fab md-raised md-mini\" ng-class=\"color.accent\">\r\n								<md-icon></md-icon>\r\n							</md-button>\r\n						</div>\r\n					</div>\r\n				</div>\r\n			</md-tab-body>\r\n		</md-tab>\r\n		<!-- Copyright -->\r\n		<md-tab>\r\n			<md-tab-label>\r\n				<md-icon>copyright</md-icon>\r\n			</md-tab-label>\r\n			<md-tab-body>\r\n				<md-content layout-gt-sm=\"row\" layout-padding>\r\n					<div>\r\n					  <md-input-container>\r\n						<label>Copyright</label>\r\n						<input ng-model=\"Module.data.copyright\" type=\"text\">\r\n					  </md-input-container>\r\n					</div>\r\n				</md-content>\r\n			</md-tab-body>\r\n		</md-tab>\r\n	</md-tabs>\r\n</div>");
    $templateCache.put("_template/module/footer/template.html", "<section layout=\"column\" class=\"module-footer {{Module.style.background_color}}\">\r\n\r\n	<div layout=\"column\" flex=\"85\" flex-offset=\"5\" class=\"module-footer-content\">\r\n		<!-- Social -->\r\n		<div layout=\"row\" layout-gt-xs=\"row\" class=\"module-footer-social\">\r\n			<a ng-repeat=\"social in Module.data.social\">\r\n				<img ng-src=\"http://storage.googleapis.com/controltower-files-release/assets/images/social/{{social.type}}/{{social.type}}_36.png\" alt=\"{{social.type}}\">\r\n			</a>\r\n		</div>\r\n		<!-- Links -->\r\n		<div layout=\"column\" layout-gt-xs=\"row\" class=\"module-footer-links\">\r\n			<div ng-repeat=\"page in Application.pages\">\r\n				<a href=\"\">{{page.meta.title}}</a>\r\n			</div>\r\n		</div>\r\n        <!-- Copyright -->\r\n        <div layout=\"row\" layout-gt-xs=\"row\" class=\"module-footer-copyright {{Module.style.background_color}}-dark\">\r\n            <div>{{Module.data.copyright}}</div>\r\n        </div>\r\n	</div>\r\n</section>");
    $templateCache.put("_template/module/header/options.html", "<div class=\"module-options\">\r\n    <md-tabs md-dynamic-height>\r\n        <!-- Color -->\r\n        <md-tab>\r\n            <md-tab-label>\r\n                <md-icon>color_lens</md-icon>\r\n            </md-tab-label>\r\n            <md-tab-body>\r\n                <div layout=\"column\">\r\n                    <span class=\"option-title\">Color</span>\r\n                    <div layout=\"row\">\r\n                        <div layout=\"column\" ng-repeat=\"color in Template.colors\" ng-cloak>\r\n                            <md-button aria-label=\"color.primary\" ng-click=\"Module.style.background_color= color.primary\" class=\"md-fab md-raised md-mini\" ng-class=\"color.primary\">\r\n                                <md-icon></md-icon>\r\n                            </md-button>\r\n                            <md-button aria-label=\"color.dark\" ng-click=\"Module.style.background_color= color.dark\" class=\"md-fab md-raised md-mini\" ng-class=\"color.dark\">\r\n                                <md-icon></md-icon>\r\n                            </md-button>\r\n                            <md-button aria-label=\"color.accent\" ng-click=\"Module.style.background_color= color.accent\" class=\"md-fab md-raised md-mini\" ng-class=\"color.accent\">\r\n                                <md-icon></md-icon>\r\n                            </md-button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </md-tab-body>\r\n        </md-tab>\r\n        <!-- Logo -->\r\n        <md-tab>\r\n            <md-tab-label>\r\n                <md-icon>insert_photo</md-icon>\r\n            </md-tab-label>\r\n            <md-tab-body>\r\n                <div layout=\"column\">\r\n                    <span class=\"option-title\">Logo</span>\r\n                    <div layout-wrap layout=\"row\">\r\n                        <div layout-margin ng-repeat=\"media in Media\" ng-click=\"Module.data.logo = media.publicUrl\" style=\"cursor:pointer;\">\r\n                            <img lazy-src ng-src=\"{{media.publicUrl}}\" style=\"max-height: 100px\" />\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </md-tab-body>\r\n        </md-tab>\r\n    </md-tabs>\r\n</div>");
    $templateCache.put("_template/module/header/template.html", "<section layout=\"row\" class=\"module-header {{Module.style.background_color}}\">\r\n    <div layout-wrap layout=\"row\" flex=\"90\" flex-offset=\"5\">\r\n        <div layout=\"row\">\r\n            <div layout=\"row\" layout-align=\"center center\">\r\n                <md-button hide-gt-xs class=\"md-primary md-icon-button\" aria-label=\"Menu\">\r\n                    <md-icon>menu</md-icon>\r\n                </md-button>\r\n            </div>\r\n            <div layout=\"row\" layout-align=\"center center\">\r\n                    <img class=\"logo\"\r\n                    ng-src=\"{{Module.data.logo}}\"\r\n                    alt=\"{{Application.title}}\">\r\n            </div>\r\n        </div>\r\n        <span flex></span>\r\n        <nav hide-xs layout=\"row\" layout-align=\"end end\">\r\n            <a ng-repeat=\"page in Application.pages\" ng-click=\"previewPage(page)\">\r\n                <md-button>{{page.meta.title}}</md-button>\r\n            </a>\r\n        </nav>\r\n    </div>\r\n</section>");
    $templateCache.put("_template/module/splash/options.html", "<div class=\"module-options\">\r\n	<md-tabs md-dynamic-height>\r\n		<!-- Background Image -->\r\n		<md-tab>\r\n			<md-tab-label>\r\n				<md-icon>insert_photo</md-icon>\r\n			</md-tab-label>\r\n			<md-tab-body>\r\n				<div layout=\"column\">\r\n					<div layout-wrap layout=\"row\">\r\n						<div layout-margin ng-repeat=\"media in Media\" ng-click=\"Module.style.background_image = media.publicUrl\">\r\n							<img lazy-src ng-src=\"{{media.publicUrl}}\" style=\"max-height: 100px\" />\r\n						</div>\r\n					</div>\r\n				</div>\r\n			</md-tab-body>\r\n		</md-tab>\r\n		<!-- Text Alignment -->\r\n		<md-tab>\r\n			<md-tab-label>\r\n				<md-icon>format_align_center</md-icon>\r\n			</md-tab-label>\r\n			<md-tab-body>\r\n				<div layout=\"row\">\r\n					<div ng-repeat=\"layout in Template.layout_align\">\r\n						<md-button ng-click=\"Module.style.layout_align = layout.alignment\" class=\"md-fab md-raised md-mini\">\r\n							<md-icon ng-class=\"\'md-light\'\">{{layout.icon}}</md-icon>\r\n						</md-button>\r\n					</div>\r\n				</div>\r\n			</md-tab-body>\r\n		</md-tab>\r\n		<!-- Content -->\r\n		<md-tab>\r\n			<md-tab-label>\r\n				<md-icon>title</md-icon>\r\n			</md-tab-label>\r\n			<md-tab-body>\r\n				<md-content layout=\"column\" layout-gt-xs=\"row\" layout-padding>\r\n					<md-input-container flex=\"30\">\r\n						<label>Title</label>\r\n						<input ng-model=\"Module.data.title\" type=\"text\">\r\n					</md-input-container>\r\n					<md-input-container flex=\"70\">\r\n						<label>Subtitle</label>\r\n						<input ng-model=\"Module.data.subtitle\" type=\"text\">\r\n					</md-input-container>\r\n				</md-content>\r\n			</md-tab-body>\r\n		</md-tab>\r\n	</md-tabs>\r\n</div>");
    $templateCache.put("_template/module/splash/template.html", "<section layout=\"row\" layout-align=\"{{Module.style.layout_align}}\" class=\"module-splash\" style=\"background-image: url({{Module.style.background_image}});\">\r\n    \r\n    <div layout=\"column\" class=\"module-splash-content\" flex-offset=\"5\">\r\n        <div class=\"module-splash-title\">\r\n            {{Module.data.title}}\r\n        </div>\r\n        <div class=\"module-splash-subtitle\">\r\n           {{Module.data.subtitle}} \r\n        </div>\r\n    </div>\r\n</section>");
    $templateCache.put("_template/module/text/options.html", "<div class=\"module-options\">\r\n    <md-tabs md-dynamic-height>\r\n        <!-- Color -->\r\n        <md-tab>\r\n            <md-tab-label>\r\n                <md-icon>color_lens</md-icon>\r\n            </md-tab-label>\r\n            <md-tab-body>\r\n                <div layout=\"column\">\r\n                    <span class=\"option-title\">Color</span>\r\n                    <div layout=\"row\">\r\n                        <div layout=\"column\" ng-repeat=\"color in Template.colors\" ng-cloak>\r\n                            <md-button aria-label=\"color.primary\" ng-click=\"Module.style.background_color= color.primary\" class=\"md-fab md-raised md-mini\" ng-class=\"color.primary\">\r\n                                <md-icon></md-icon>\r\n                            </md-button>\r\n                            <md-button aria-label=\"color.dark\" ng-click=\"Module.style.background_color= color.dark\" class=\"md-fab md-raised md-mini\" ng-class=\"color.dark\">\r\n                                <md-icon></md-icon>\r\n                            </md-button>\r\n                            <md-button aria-label=\"color.accent\" ng-click=\"Module.style.background_color= color.accent\" class=\"md-fab md-raised md-mini\" ng-class=\"color.accent\">\r\n                                <md-icon></md-icon>\r\n                            </md-button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </md-tab-body>\r\n        </md-tab>\r\n        <!-- Text Alignment -->\r\n        <md-tab>\r\n            <md-tab-label>\r\n                <md-icon>format_align_center</md-icon>\r\n            </md-tab-label>\r\n            <md-tab-body>\r\n                <div layout=\"column\">\r\n                    <span class=\"option-title\">Text Alignment</span>\r\n                    <div layout=\"row\">\r\n                        <div ng-repeat=\"layout in Template.text_align\">\r\n                            <md-button ng-click=\"Module.style.text_align = layout.alignment\" class=\"md-fab md-raised md-mini\">\r\n                                <md-icon ng-class=\"\'md-light\'\">{{layout.icon}}</md-icon>\r\n                            </md-button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </md-tab-body>\r\n        </md-tab>\r\n        <!-- Font Family -->\r\n        <md-tab>\r\n            <md-tab-label>\r\n                <md-icon>font_download</md-icon>\r\n            </md-tab-label>\r\n            <md-tab-body>\r\n                <div layout=\"column\">\r\n                    <span class=\"option-title\">Font</span>\r\n                    <div layout=\"row\">\r\n                        <div ng-repeat=\"font in Template.fonts\">\r\n                            <md-button ng-click=\"Module.style.font_family = font.font_family\" class=\"md-raised\" style=\"font-family: {{font.font_family}}\">\r\n                                <span>{{font.font_family}}</span>\r\n                            </md-button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </md-tab-body>\r\n        </md-tab>\r\n        <!-- Columns -->\r\n        <md-tab>\r\n            <md-tab-label>\r\n                <md-icon>view_column</md-icon>\r\n            </md-tab-label>\r\n            <md-tab-body>\r\n                <div layout=\"column\">\r\n                    <span class=\"option-title\">Text Content</span>\r\n                    <div layout=\"row\">\r\n                        <div flex\r\n                             layout=\"column\"\r\n                             layout-align=\"start center\"\r\n                             ng-repeat=\"column in Module.data.columns\"\r\n                             style=\"margin: 0px 20px; text-align: {{Module.style.text_align}}\">\r\n    \r\n                            <md-card>\r\n                                <md-card-header style=\"background: #252526; color: white; padding: 0px;\">\r\n                                    <span flex></span>\r\n                                    <md-button class=\"md-icon-button\" aria-label=\"Visibility\" ng-click=\"column.visibility=!column.visibility\">\r\n                                        <md-icon style=\"color: white;\" ng-show=\"column.visibility\">visibility</md-icon>\r\n                                        <md-icon style=\"color: white;\" ng-show=\"!column.visibility\">visibility_off</md-icon>\r\n                                    </md-button>\r\n                                </md-card-header>\r\n                                <!-- Title -->\r\n                                <div style=\"padding:10px\">\r\n                                    <md-input-container class=\"md-block\">\r\n                                        <label>Title</label>\r\n                                        <input ng-disabled=\"!column.visibility\" md-maxlength=\"30\" ng-model=\"column.title\" />\r\n                                        <div ng-messages=\"projectForm.description.$error\">\r\n                                          <div ng-message=\"required\">This is required.</div>\r\n                                          <div ng-message=\"md-maxlength\">The name has to be less than 30 characters long.</div>\r\n                                        </div>\r\n                                    </md-input-container>\r\n                                </div>\r\n                                <!-- Paragraph -->\r\n                                <div style=\"padding:10px\">\r\n                                    <md-input-container class=\"md-block\">\r\n                                        <label>Paragraph</label>\r\n                                        <textarea ng-disabled=\"!column.visibility\" md-maxlength=\"250\" ng-model=\"column.paragraph\"></textarea>\r\n                                        <div ng-messages=\"projectForm.description.$error\">\r\n                                          <div ng-message=\"required\">This is required.</div>\r\n                                          <div ng-message=\"md-maxlength\">The name has to be less than 250 characters long.</div>\r\n                                        </div>\r\n                                    </md-input-container>\r\n                                </div>\r\n                            </md-card>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </md-tab-body>\r\n        </md-tab>\r\n    </md-tabs>\r\n</div>");
    $templateCache.put("_template/module/text/template.html", "<section layout=\"row\" class=\"module-text {{Module.style.background_color}}\" style=\"font-family: {{Module.style.font_family}}\">\r\n\r\n	<div layout=\"column\" layout-gt-sm=\"row\" flex=\"90\" flex-offset=\"5\" class=\"module-text-columns\">\r\n		<div flex\r\n			 layout=\"column\"\r\n			 class=\"module-text-columns-single {{Module.style.text_align}}\"\r\n			 ng-repeat=\"column in Module.data.columns\"\r\n			 ng-if=\"column.visibility\">\r\n			<h3>{{ column.title }}</h3>\r\n			<p>{{ column.paragraph }}</p>\r\n		</div>\r\n	</div>\r\n</section>");
}]);