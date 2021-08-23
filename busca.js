(function(){

    var query = location.search.slice(1);
    var partes = query.split('&');
    var data = {};
    partes.forEach(function (parte) {
        var chaveValor = parte.split('=');
        var chave = chaveValor[0];
        var valor = chaveValor[1];
        data[chave] = valor;
    });

    urlbasebanner ="https://www.themoviedb.org/t/p/w1920_and_h1080_bestv2/"; 
    urlbaseposter ="https://www.themoviedb.org/t/p/w780/"; 
    urlbaselogo ="https://themoviedb.org/t/p/w780/"; 

    titulo = document.querySelector('.titulo')
    sinopse = document.querySelector('.sinopse')
    poster = document.querySelector('.poster')
    banner = document.querySelector('.banner')
    filmepesquisado = document.querySelector('#nomedofilme')
    btnpesquisar = document.querySelector('#btnpesquisar')
    logo = document.querySelector('.logo-filtrado')
    estreia = document.querySelector('.data-estreia')
    origin = document.querySelector('.origin')

    api_key = "bc2edd6da7c1980f09e65291361b7db1";
    pesquisaFilme(data.id)
    function pesquisaFilme(idfilme){
        fetch("https://api.themoviedb.org/3/movie/" + idfilme +"?api_key="+ api_key +"&language=pt-br",{method: "GET",  
            }).then(function(resposta){resposta.json().then(function(respostaJson){
                titulofilmeapi = respostaJson.title
                titulofilme = titulofilmeapi.toUpperCase()
                titulo.innerText = titulofilme
                sinopse.innerText = respostaJson.overview
                poster.src = urlbaseposter + respostaJson.poster_path
                codigobanner = respostaJson.backdrop_path ? respostaJson.backdrop_path : respostaJson.poster_path
                banner.src = urlbasebanner + codigobanner
                logoapi = respostaJson.production_companies[0].logo_path
                logo.src = urlbaselogo + logoapi
                data_eua = respostaJson.release_date
                data_brasileira = data_eua.split('-').reverse().join('/');
                estreia.innerText = data_brasileira
                pais = respostaJson.production_countries[0].iso_3166_1 
                origin.innerText = pais
                


            })
        })

    }





})()