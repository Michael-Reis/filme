(function(){
    filmepesquisado = document.querySelector('#nomedofilme')
    btnpesquisar = document.querySelector('#btnpesquisar')
    conteudodiv = document.querySelector('.filmes')
    const fotofilme = "https://www.themoviedb.org/t/p/w533_and_h300_bestv2/"
    const busca = "http://localhost/github/mydrugs/filme-api/busca.html?id="

    btnpesquisar.addEventListener('click', function(){
        filmesolicitado = filmepesquisado.value;  
        lengthfilme = filmepesquisado.value.length
        document.querySelectorAll('.grid-item').forEach((filmeanterior)=>{
            filmeanterior.remove()
        }) 
        if(lengthfilme > 1){ 
            pesquisaFilme(filmesolicitado) 
        }else{
            pesquisaFilme("star wars") 
        }
    })
    
    
    function pesquisaFilme(nomedofilme){
        fetch("https://api.themoviedb.org/3/search/movie?api_key=bc2edd6da7c1980f09e65291361b7db1&language=pt-br&query="+ nomedofilme +"&page=1",{method: "GET",  
            }).then(function(resposta){
                resposta.json().then(function(respostaJson){
                console.log(respostaJson)
                const listafilmes = respostaJson.results
                        
                criandoitems = new Promise(
                    (resolve, reject) => {
                        listafilmes.forEach(filme => {
                            qtdfilmesdalista = filme.original_title.length
                            var trataimagem =  filme.backdrop_path ?  /* filme.backdrop_path */  filme.poster_path :  filme.poster_path; 
                            if(qtdfilmesdalista > 0){
                                var divNova = document.createElement('div')
                                var imagem = document.createElement('img')
                                divNova.className = "grid-item"
                                
                                imagem.src = fotofilme + trataimagem
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
                    if(filme.original_title.length > 0){
                        var titulo = document.createElement('h3')
                        titulo.className = "original_title"
                        titulo.innerText = filme.original_title
                        items[contador].appendChild(titulo)
                        contador++;
                    }

                });

                contafilmes = 0;
                listafilmes.forEach(filme => {
                    if(filme.original_title.length > 0){
                        linkdadosfilme = document.createElement('a')
                        linkdadosfilme.className = "filmedirecionar"
                        linkdadosfilme.href = busca + filme.id;
                        items[contafilmes].appendChild(linkdadosfilme)
                        contafilmes++;
                    }
                });

                sombras = document.querySelectorAll('.sombra')
                linkfilme = document.querySelectorAll('.filmedirecionar')
                for (let i = 0; i < linkfilme.length ; i++) {
                    sombradados = sombras[i]
                    linkfilme[i].appendChild(sombradados)
                    
                }


            })
        })

    }

    pesquisaFilme("star wars"); 

        

   

})()