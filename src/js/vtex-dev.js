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
		mergeMenu:true, // Define se o menu de links será mesclado com o de filtros será mesclado na página de departamento
		insertMenuAfter:".search-multiple-navigator h3:first", // O menu de links será inserido após este elemento
		emptySearchElem:jQuery('<div class="vtexsr-emptySearch"></div>'), // Elemento Html (em Objeto jQuery) no qual será adicionado a mensagem de busca vazia
		elemLoading:'<div id="scrollLoading">Carregando ... </div>', // Elemento com mensagem de carregando ao iniciar a requisição da página seguinte
		returnTopText:'<span class="text">voltar ao</span><span class="text2">TOPO</span>', // Mensagem de "retornar ao topo"
		emptySearchMsg:'<h3>Esta combinação de filtros não retornou nenhum resultado!</h3>', // Html com a mensagem para ser apresentada quando não existirem resultados para os filtros selecionados
		filterErrorMsg:"Houve um erro ao tentar filtrar a página!", // Mensagem de erro exibida quando existe algum erro de servidor ao aplicar os filtros
		searchUrl:null, // Url da página de busca (opicional)
		usePopup:false, // Opção p/ definir se deseja que a mensagem de não localizado seja exibida em um popup
		showLinks:true, // Exibe o menu de links caso o de filtro não seja encontrado
		popupAutoCloseSeconds:3, // Caso esteja utilizando popup, defina aqui o tempo para que ele feche automaticamente
		// Função que retorna o valor p/ onde a página deve rolar quando o usuário marca ou desmarca um filtro
		filterScrollTop:function(shelfOffset)
		{
			return (shelfOffset.top-20);
		},
		callback:function(){},
		// Cálculo do tamanho do conteúdo/vitrine para que uma nova página seja chamada antes do usuário chegar ao "final" do site
		getShelfHeight:function(container)
		{
			return (container.scrollTop()+container.height());
		},
		// Callback após inserir a prateleira na página
		shelfCallback:function(){},
		// Callback em cada requisição Ajax (Para requisições feitas com sucesso)
		// Recebe como parâmetro um objeto contendo a quantidade total de requisições feitas e a quantidade de filtros selecionados
		ajaxCallback:function(){},
		// Função que é executada quando a seleção de filtros não retorna nenhum resultado
		// Recebe como parâmetro um objeto contendo a quantidade total de requisições feitas e a quantidade de filtros selecionados
		emptySearchCallback:function(){},
		// Função para permitir ou não que a rolagem infinita execute na página esta deve retornar "true" ou "false"
		// Recebe como parâmetro um objeto contendo a quantidade total de requisições feitas e a quantidade de filtros selecionados
		authorizeScroll:function(){return true;},
		// Função para permitir ou não que o conteúdo de "loadContent" seja atualizado. Esta deve retornar "true" ou "false"
		// Recebe como parâmetro um objeto contendo a quantidade total de requisições feitas e a quantidade de filtros selecionados
		authorizeUpdate:function(){return true;},
		// Callback de cada laço percorrendo os fildsets e os labels. Retorna um objeto com algumas informações
		labelCallback:function(data){}
    });
}