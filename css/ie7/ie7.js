/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-chevron-down': '&#xe900;',
		'icon-barcode': '&#xe937;',
		'icon-qrcode': '&#xe938;',
		'icon-credit-card': '&#xe93f;',
		'icon-phone': '&#xe942;',
		'icon-location': '&#xe947;',
		'icon-mug': '&#xe9a2;',
		'icon-lab': '&#xe9aa;',
		'icon-menu': '&#xe9bd;',
		'icon-cross': '&#xea0f;',
		'icon-checkmark': '&#xea10;',
		'icon-checkmark2': '&#xea11;',
		'icon-embed2': '&#xea80;',
		'icon-terminal': '&#xea81;',
		'icon-mail4': '&#xea86;',
		'icon-facebook2': '&#xea91;',
		'icon-instagram': '&#xea92;',
		'icon-whatsapp': '&#xea93;',
		'icon-twitter': '&#xea96;',
		'icon-github': '&#xeab0;',
		'icon-wordpress': '&#xeab4;',
		'icon-tux': '&#xeabd;',
		'icon-appleinc': '&#xeabe;',
		'icon-android': '&#xeac0;',
		'icon-windows8': '&#xeac2;',
		'icon-linkedin': '&#xeac9;',
		'icon-chrome': '&#xead9;',
		'icon-firefox': '&#xeada;',
		'icon-IE': '&#xeadb;',
		'icon-file-pdf': '&#xeadf;',
		'icon-html-five': '&#xeae4;',
		'icon-html-five2': '&#xeae5;',
		'icon-css3': '&#xeae6;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
