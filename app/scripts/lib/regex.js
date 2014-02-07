module.exports = {
	"regex": [
		{
			"rule": "/xxxx/",
			"description": "a regular expression"
		}
	],
	"characters": [
		{
			"rule": "A-Z a-z 0-9",
			"description": "alphanumeric"
		},
		{
			"rule": "\\u0000-\\uFFFF",
			"description": "unicode hex"
		},
		{
			"rule": "\\x00-\\xFF",
			"description": "ASCII hex"
		},
		{
			"rule": "\\nn",
			"description": "punctuation"
		},
		{
			"rule": "\\t",
			"description": "tab character"
		},
		{
			"rule": "\\n",
			"description": "new line"
		}
	],
	"classes": [
		{
			"rule": ".",
			"description": "straight up anything"
		},
		{
			"rule": "[xx]",
			"description": "one of...",
			"example": "[@#!$&]"
		},
		{
			"rule": "[^xx]",
			"description": "one not of...",
			"example": "[^aeiou]"
		},
		{
			"rule": "xx|xx",
			"description": "either-or",
			"example": "jpg|gif"
		},
		{
			"rule": "nn-nn",
			"description": "range",
			"example": "\\x11-\\xDD"
		},
		{
			"rule": "\\d",
			"description": "digit",
			"example": "[0-9]"
		},
		{
			"rule": "\\D",
			"description": "non-digit",
			"example": "[^0-9]"
		},
		{
			"rule": "\\w",
			"description": "word char",
			"example": "[A-Za-z]"
		},
		{
			"rule": "\\W",
			"description": "non-word char",
			"example": "[^A-Za-z]"
		},
		{
			"rule": "\\s",
			"description": "whitespace"
		},
		{
			"rule": "\\S",
			"description": "non-whitespace"
		}
	],
	"repeaters": [
		{
			"rule": "xx?",
			"description": "optional (0 or 1)"
		},
		{
			"rule": "xx*",
			"description": "any (0 or more)"
		},
		{
			"rule": "xx+",
			"description": "etc. (1 or more)"
		},
		{
			"rule": "xx{nn}",
			"description": "exactly",
			"example": "\\d{3}"
		},
		{
			"rule": "xx{nn,}",
			"description": "minimum",
			"example": "\\w{2,}"
		},
		{
			"rule": "xx{nn,nn}",
			"description": "range",
			"example": "[a-z]{3,9}"
		}
	],
	"captures": [
		{
			"rule": "(xx)",
			"description": "groups or captures characters"
		},
		{
			"rule": "(?:xx)",
			"description": "non-capturing group"
		}
	]
}
