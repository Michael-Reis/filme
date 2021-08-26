(function(){
    const paginasarray = []; 
    const api_key = "bc2edd6da7c1980f09e65291361b7db1"
    const nomedofilme = "Loki";
    const fotofilme = "https://www.themoviedb.org/t/p/w533_and_h300_bestv2/"
    const busca = "http://localhost/github/mydrugs/filme-api/busca.html?id="
    filmepesquisado = document.querySelector('#nomedofilme')
    btnpesquisar = document.querySelector('#btnpesquisar')
    conteudodiv = document.querySelector('.filmes')


    async function dadosAPI(nomedofilme){
        const dadosapifilme = []
        const response = await fetch("https://api.themoviedb.org/3/search/multi?api_key=" + api_key + "&language=pt-br&query="+ nomedofilme +"&page=1")
        const movies = await response.json();
        pages = movies.total_pages

        for (let i = 1; i <= pages; i++) {
            const resposta = await fetch("https://api.themoviedb.org/3/search/multi?api_key=" + api_key + "&language=pt-br&query="+ nomedofilme +"&page="+i); 
            const allpages = await resposta.json();
            paginasarray.push(allpages) 
        }

        arraypronto = Promise.all(paginasarray).then(filme =>{
           filme.forEach(info => {
                qtdfilmes = info.results.length
                //console.log(info.page)
                for (let u = 0; u < qtdfilmes; u++) {
                    //console.log(info.results[u])
                    dadosapifilme.push(info.results[u])     
                    //console.log("Página:" + info.page)
                }
           })
           return dadosapifilme; 

        })

        arraypronto.then( (solution)=>{
            qtdtotalfilmes = solution.length
            solution.forEach( dadosfilme => {
                tipomidia = dadosfilme.media_type
                switch (tipomidia) {
                    case 'movie':
                        insereFront(dadosfilme, tipomidia)
                        break; 
                    case 'tv':
                        insereFront(dadosfilme, tipomidia)
                        console.log(dadosfilme)
                        break; 
                    case 'person': 
                        insereFront(dadosfilme, tipomidia)
                        break;
                    default:
                        console.log(`nenhum deles, esse é: ${tipomidia}`) 
                        break;
                   
                }
            });

            linkfilme = document.querySelectorAll('.filmedirecionar')
            items = document.querySelectorAll('.grid-item')
            for (let i = 0; i < linkfilme.length ; i++) {
                var sombra = document.createElement('div')
                sombra.className = "sombra" 
                linkfilme[i].appendChild(sombra)  
            }
            

            
        })

        function insereFront(dadosfilme, tipomidia){
            trataimagem = dadosfilme.poster_path =! null ?  dadosfilme.poster_path : dadosfilme.backdrop_path
            if(trataimagem){
                var divNova = document.createElement('div')
                var imagem = document.createElement('img')
                divNova.className = "grid-item"
                imagem.src = fotofilme + trataimagem
                divNova.appendChild(imagem)
                conteudodiv.appendChild(divNova)     

                switch (tipomidia) {
                    case "movie":
                        insereTitulos(dadosfilme.title, divNova)
                        insereLink(dadosfilme.id, divNova, tipomidia)
                        break;
                    case "tv":
                        insereTitulos(dadosfilme.original_name, divNova)
                        insereLink(dadosfilme.id, divNova, tipomidia)
                        break;
                    case "person":
                        insereTitulos(dadosfilme.original_name, divNova)
                        insereLink(dadosfilme.id, divNova, tipomidia)
                        break;                
                    default:
                        break;
                }

            }

        }


        function insereTitulos(titulofilme, divNova){
            var titulo = document.createElement('h3')
            titulo.className = "original_title"
            titulo.innerText = titulofilme
            divNova.appendChild(titulo)
        }

        function insereLink(idfilme, divNova, tipomidia){
            linkdadosfilme = document.createElement('a')
            linkdadosfilme.className = "filmedirecionar"
            divNova.appendChild(linkdadosfilme) 
            linkdadosfilme.href = busca + idfilme + "&tipo=" + tipomidia; 
            
        }

 
    }

    dadosAPI(nomedofilme)
})()