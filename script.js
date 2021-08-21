(function(){
    
    conteudodiv = document.querySelector('.filmes')
    const fotofilme = "https://www.themoviedb.org/t/p/w533_and_h300_bestv2/"
    const filme = "star wars"
        fetch("https://api.themoviedb.org/3/search/movie?api_key=bc2edd6da7c1980f09e65291361b7db1&language=pt-br&query="+ filme +"&page=1",{
          method: "GET",  
        }).then(function(resposta){
            resposta.json().then(function(respostaJson){
                console.log(respostaJson)
                const quantidade = respostaJson.results.length
                const listafilmes = respostaJson.results
                
                criandoitems = new Promise(
                    (resolve, reject) => {
                        listafilmes.forEach(filme => {
                            if(filme.backdrop_path.length > 0){
                                var divNova = document.createElement('div')
                                var imagem = document.createElement('img')
                                divNova.className = "grid-item"
                                imagem.src = fotofilme + filme.backdrop_path 
                                divNova.appendChild(imagem)
                                conteudodiv.appendChild(divNova)                                   
                                resolve();
                            }
                       
                        });
                    }
                )
                    
                items = document.querySelectorAll('.grid-item')
                for (let i = 0; i < items.length ; i++) {
                
                    var sombra = document.createElement('div')
                    sombra.className = "sombra" 
                    items[i].appendChild(sombra)
                    
                }

                contador = 0;
                listafilmes.forEach(filme => {
                    if(filme.backdrop_path.length > 0){
                        var titulo = document.createElement('h3')
                        titulo.className = "original_title"
                        titulo.innerText = filme.title
                        items[contador].appendChild(titulo)
                        contador++;
                    }
               
                });


    
            })
        })

})()