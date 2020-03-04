// Home
if($('body').hasClass('home')) {
    $('.home .vtex__content-place-holder--bannerHome').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    });
}

// Catalog	
if ($('body').hasClass('catalog')) {
    $(".vtex__search-navigator input[type='checkbox']").vtexSmartResearch({
        pageLimit:null, // Número máximo de páginas que o script irá retornar. Exemplo "pageLimit=3" só será retornado resultados até a terceira página
		loadContent:".vtexdev-shelf[id^=ResultItems]", // Elemento que esta em volta da(s) prateleira(s) de produtos.
		shelfClass:".vtexdev-shelf", // Pratelira de produtos (filha do elemento definido de um "loadContent")
		filtersMenu:".search-multiple-navigator", // Menu com os filtros
		linksMenu:".search-single-navigator", // Menu de links
		menuDepartament:".vtex__search-navigator .menu-departamento", // seletor do menu da página de departamentos
	});

	function filterMobile() {
		$('.catalog__filter-show').on('click', function() {
			$('body').addClass('show-mobile-filters');
		});
		$('.catalog__filter-go').on('click', function() {
			$('body').removeClass('show-mobile-filters');
		});
	}

	filterMobile();
}

// Catalog - Search
if($('body').hasClass('catalog--search')) {
	function searchTerm() {
		var term = vtxctx.searchTerm;
		var qty =  $('.resultado-busca-numero .value').first().text();
		$('.vtex__search-title').append('<h2 class="search-term"> '+qty+' resultados para <strong> '+ term +'</strong></h2>');
	}
	searchTerm();
}

// Search Not Found
if($('body').hasClass('search-not-found')) {
	function searchTerm() {
		var term = '';
		var params = window.location.search.split('&');
		for (var i = 0; i < params.length; i++) {
			var ftSplit = params[i].split('ft=');
			if (ftSplit.length === 2) {
				term = ftSplit[1];
			}
		}
		$('#term-not-found').text(term);
	}
	searchTerm();
}

if($('body').hasClass('product')) {
	// substituindo função global da vtex
	function LoadZoom() {
		if ($('.image-zoom').length > 0) {
			var optionsZoom = {
				zoomType: 'innerzoom',
				//innerzoom/standard/reverse/drag
				// zoomWidth: width,
				// zoomHeight: height,
				preloadText: '',
				title: '',
				lens: true,
				imageOpacity: 0.4,
				alwaysOn: false,
				showEffect: 'show',
				//show/fadein
				hideEffect: 'hide',
				//hide/fadeout
				fadeinSpeed: 'slow',
				//fast/slow/number
				fadeoutSpeed: '2000' //fast/slow/number
			};
			$('.image-zoom').jqzoom(optionsZoom);
		}
	}
	
	var initialZoomHtml = $('#include').html();
	$(window).on('resize', function() {
		var currentImage = $('#image').html();
		$('#include').html(initialZoomHtml);
		$('#image').html(currentImage);
		$('.thumbs .ON').click();
		LoadZoom();
	});
}
