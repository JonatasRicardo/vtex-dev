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
		var term = getParamFromUrl(window.location.href, 'ft');
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

	function video() {
		if ($('.vtex__product-image')) {
			var videoUrl = $('.value-field.Videos').text();
			var videoId = getParamFromUrl(videoUrl, 'v');
			$('.vtex__product-image').prepend('<button class="product__video-btn">ver vídeo</button>');
			$('body').append('<div class="product__video-modal"><iframe  width="420" height="315" src="https://www.youtube.com/embed/'+videoId+'"></iframe></div>')
		
			$('.product__video-btn').on('click', function() {
				$('.product__video-modal').fadeIn();
			})
			$('.product__video-modal').on('click', function() {
				$('.product__video-modal').fadeOut();
			})

		}
	}
	video();

	function manualUsuario() {
		var $manualUsuarioEl = $('.value-field.Manual-do-usuario');
		var manualLink = $manualUsuarioEl.text();
		$manualUsuarioEl.html('<a href="'+manualLink+'" target="_blank">Baixar manual</a>').addClass('ativo');
	}
	manualUsuario();

	function addToCart(e) {
		e.preventDefault();
		var urlCart = $('.buy-button-ref').attr('href');
		var skuId = getParamFromUrl(urlCart, 'sku');
		if (!skuId) return alert('selecione uma opção');
		
		var item = {
			id: skuId,
			quantity: 1,
			seller: '1'
		};
		vtexjs.checkout.getOrderForm().then(function() {
		  vtexjs.checkout.addToCart([item])
			.done(function(orderForm) {
			  window.location.href = "/checkout/#/cart";
			});
		});
	}
	$('.buy-button').on('click', addToCart);

}

function getParamFromUrl(url, param) {
	if (url.indexOf('?') === -1) return '';

	var value = '';
	var params = url.split('?')[1].split('&');
	for (var i = 0; i < params.length; i++) {
		var ftSplit = params[i].split(param+'=');
		if (ftSplit.length === 2 && params[i].indexOf(param) === 0) {
			value = ftSplit[1];
		}
	}
	return value;
}