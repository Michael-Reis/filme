(function(){
    const nomeDoFilme = document.querySelector("#nomedofilme")
    const botao = document.querySelector("#btnpesquisar")
    conteudodiv = document.querySelector('.conteudo')

 
    botao.addEventListener("click", function(){
        //alert("clicou"); 
        //usando método fetch
        fetch("http://www.omdbapi.com/?s=" + nomeDoFilme.value + "&apikey=17fedfb5",{
          method: "GET",  
        }).then(function(resposta){
            resposta.json().then(function(respostaJson){

                if(respostaJson.Error == undefined){
                    filmesPesquisados = document.querySelectorAll('.filmes').length
                    filmesAnteriores = document.querySelectorAll('.filmes')

                    qtdfilmes = respostaJson.Search.length
                    if(filmesPesquisados > 0){
                        for(u = 0; u < qtdfilmes; u++){
                            filmesAnteriores[u].remove()
                        }
                    }

                   
                    for(i = 0; i < qtdfilmes; i++){
                        var divNova = document.createElement('div')
                        var imagem = document.createElement('img')
                        divNova.className = "filmes";
                        imagem.src = respostaJson.Search[i].Poster;
                        divNova.appendChild(imagem);
                        conteudodiv.appendChild(divNova)

                    }
                   
                }

               

            })
        })
    })

})()