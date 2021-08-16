    const API_KEY = 'bc2edd6da7c1980f09e65291361b7db1';
    const BASE_URL = 'https://api.themoviedb.org/3'
    const API_URL = BASE_URL + '/discover/movie/400?' + API_KEY;
    console.log(API_URL); 


    fetch(API_URL,{
        method: "GET",  
      }).then(function(resposta){
            resposta.json().then(function(respostaJson){
            console.log(respostaJson)

        })
    })
