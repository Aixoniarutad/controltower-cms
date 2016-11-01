tower.constant('Template', (function(){
	var exports = {};

	exports.states = [{"name": "Alabama","abbreviation": "AL"},{"name": "Alaska","abbreviation": "AK"},{"name": "Arizona","abbreviation": "AZ"},{"name": "Arkansas","abbreviation": "AR"},{"name": "California","abbreviation": "CA"},{"name": "Colorado","abbreviation": "CO"},{"name": "Connecticut","abbreviation": "CT"},{"name": "Delaware","abbreviation": "DE"},{"name": "Florida","abbreviation": "FL"},{"name": "Georgia","abbreviation": "GA"},{"name": "Hawaii","abbreviation": "HI"},{"name": "Idaho","abbreviation": "ID"},{"name": "Illinois","abbreviation": "IL"},{"name": "Indiana","abbreviation": "IN"},{"name": "Iowa","abbreviation": "IA"},{"name": "Kansas","abbreviation": "KS"},{"name": "Kentucky","abbreviation": "KY"},{"name": "Louisiana","abbreviation": "LA"},{"name": "Maine","abbreviation": "ME"},{"name": "Maryland","abbreviation": "MD"},{"name": "Massachusetts","abbreviation": "MA"},{"name": "Michigan","abbreviation": "MI"},{"name": "Minnesota","abbreviation": "MN"},{"name": "Mississippi","abbreviation": "MS"},{"name": "Missouri","abbreviation": "MO"},{"name": "Montana","abbreviation": "MT"},{"name": "Nebraska","abbreviation": "NE"},{"name": "Nevada","abbreviation": "NV"},{"name": "New Hampshire","abbreviation": "NH"},{"name": "New Jersey","abbreviation": "NJ"},{"name": "New Mexico","abbreviation": "NM"},{"name": "New York","abbreviation": "NY"},{"name": "North Carolina","abbreviation": "NC"},{"name": "North Dakota","abbreviation": "ND"},{"name": "Ohio","abbreviation": "OH"},{"name": "Oklahoma","abbreviation": "OK"},{"name": "Oregon","abbreviation": "OR"},{"name": "Pennsylvania","abbreviation": "PA"},{"name": "Rhode Island","abbreviation": "RI"},{"name": "South Carolina","abbreviation": "SC"},{"name": "South Dakota","abbreviation": "SD"},{"name": "Tennessee","abbreviation": "TN"},{"name": "Texas","abbreviation": "TX"},{"name": "Utah","abbreviation": "UT"},{"name": "Vermont","abbreviation": "VT"},{"name": "Virginia","abbreviation": "VA"},{"name": "Washington","abbreviation": "WA"},{"name": "West Virginia","abbreviation": "WV"},{"name": "Wisconsin","abbreviation": "WI"},{"name": "Wyoming","abbreviation": "WY"}];

	exports.colors = [
		{	primary: "red",
			dark: "red-dark",
			accent:	"red-accent"
		},
		{	primary: "pink",
			dark: "pink-dark",
			accent: "pink-accent"
		},
		{	primary: "purple",
			dark: "purple-dark",
			accent: "purple-accent"
		},
		{	primary: "indigo",
			dark: "indigo-dark",
			accent: "indigo-accent"
		},
		{	primary: "blue",
			dark: "blue-dark",
			accent: "blue-accent"
		},
		{	primary: "green",
			dark: "green-dark",
			accent: "green-accent"
		},
		{	primary: "orange",
			dark: "orange-dark",
			accent: "orange-accent"
		},
		{	primary: "grey",
			dark: "grey-dark",
			accent: "grey-accent"
		},
		{	primary: "white",
			dark: "white-dark",
			accent: "white-accent"
		}
	];

	exports.fonts = [
		{	font_family: "Arial"
		},
		{	font_family: "Times New Roman"
		},
		{	font_family: "Verdana"
		},
		{	font_family: "Tahoma"
		},
		{	font_family: "Georgia"
		},
		{	font_family: "Impact"
		},
		{	font_family: "Century Gothic"
		},
		{	font_family: "Lucida Console"
		}
	];

	exports.modules = {
		"header": {
	        "type": "header",
	        "deleteable": false,
	        "icon": "menu"
	    },
	    "splash": {
	        "type": "splash",
	        "deleteable": true,
	        "icon": "stars"
	    },
	    "text": {
	        "type": "text",
	        "deleteable": true,
	        "icon": "text_fields"
	    },
	    "contact": {
	        "type": "contact",
	        "deleteable": true,
	        "icon": "email"
	    },
	    "footer": {
	        "type": "footer",
	        "deleteable": true,
	        "icon": "subtitles"
	    }
	};

	exports.layout_align = [
        {"alignment": "start", "icon": "format_align_left"},
        {"alignment": "center", "icon": "format_align_center"},
        {"alignment": "end", "icon": "format_align_right"}
    ];
    exports.text_align = [
        {"alignment": "text-align-left", "icon": "format_align_left"},
        {"alignment": "text-align-center", "icon": "format_align_center"},
        {"alignment": "text-align-right", "icon": "format_align_right"}
    ];

	return exports;
})());