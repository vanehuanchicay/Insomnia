$(document).ready(() =>{
	$('#movie').on('keypress', function(enter){  //on al presionar la tecla
			let movie = $('#movie').val(); // Rescatar el valor que ingresa el usuario
			if(enter.which === 13) {//  13 es el valor q tiene la tecla enter  which es para saber si se presionó la tecla
				$('#movie').val();
				$.ajax({ // pedir información 
					url: `http://www.omdbapi.com/?s=${movie}&apikey=fed8ba13`,
					type: 'GET' ,
					datatype: 'json'
				})
				.done(function(response){  // parecido a then  respuesta esperada puede ser cualquier nombre
					console.log(response);
					showInfo(response); // si funciona que se ejecute la función
				}) 
				.fail(function(){
					console.log('error en conexión a la API');
				});
				$('.premiere').hide(); // ocultar secciones al hacer enter
				$('.suggestion').addClass('hidden');
			}
			
	});
	function showInfo(info){
		let search = info.Search; // Search palabra reservada  si busca me arroje una respuesta
		if(info.Response === 'false'){ // Response palabra reservada para respuesta
			alert('Película no encontrada');
		}else{
			$('.preview, #title, #plot, #genre, #year, #director, #runtime, #rating, #img, #btn_imdb').empty(); // llamo a mis div del html y luego los limpio para cada busqueda
			search.forEach(element =>{ 
				$('.preview').append(`<div class="title_movie_search img-thumbnail"><p>${element.Title}</p><img class="img_poster" src="${element.Poster}"></div>`);
			});

			$('.title_movie_search').click(function(){ // evento para la foto al hacer click muestre más info
					let newTitle = ($(this).text());
					$.ajax({ // volver a pedir una petición para otro evento 
						url: `http://www.omdbapi.com/?t=${newTitle}&apikey=796a29c7`,
						type: 'GET',
						datatype: 'json'
					})
					.done(function(response){ // respuesta positiva
						console.log(response);
						showMovie(response);
					}) 
					.fail(function(){
						console.log('No se conecta con la API')
					});
					$('.premiere').hide();
					$('.suggestion').addClass('hidden');
			});
		
		}
	}

	$('.icon_owl').click(function(){
		window.location.reload();
		});



	function showMovie(info){
		if(info.Response === 'false'){
			alert('La película no fue encontrada');
		}else{
			$('.preview, #title, #genre, #year, #runtime, #img').empty();
			$('#title').append(`<h5>TITULO</h5> ${info.Title}`);
			$('#plot').append(`<h5>ARGUMENTO</h5> ${info.Plot}`);
			$('#year').append(`<h5>AÑO</h5> ${info.Year}`);
			$('#director').append(`<h5>DIRECTOR</h5> ${info.Director}`);
			$('#runtime').append(`<h5>DURACIÓN</h5> ${info.Runtime}`);
			$('#genre').append(`<h5>GENERO</h5> ${info.Genre}`);
			$('#rating').append(`<h5>RATINGS</h5> Movie Database: ${info.Ratings["0"].Value} <br>
				Rotten Tomatoes: ${info.Ratings["1"].Value} <br> Metacritic: ${info.Ratings["2"].Value} <br>
				imdb: ${info.imdbRating}`);
			$('#img').append(`<img class="each_photo" src=" ${info.Poster}">`);
			$('#btn_imdb').append(`<a href="http://www.imdb.com/title/${info.imdbID}" class=" op2" aria-label="Left Align" target="_blank">
				<img src="assets/img/IMDb_icon.png"></a>`)
			
		}
	} 
	$(".img-poster-2").click(function(){
		$(".movie-details").removeClass('hidden');
		$(".suggestion").addClass('hidden');
		$(".premiere").addClass('hidden');
		
		});
		$('#Carousel').carousel({
			interval: 3000
	})

	$("#film_logo").click(function(){
		$("#indi_movies").removeClass('hidden');
		$(".suggestion").addClass('hidden');
		$(".premiere").addClass('hidden');
		$(".preview").empty();
		$(".description").empty();
		$(".photo").empty();
		$(".user-section").addClass('hidden');


		$('#Carousel-1').carousel({
			interval: 2500
		})
	});
	$(".user").click(function(){
		$(".user-section").removeClass('hidden');
		$(".suggestion").addClass('hidden');
		$(".premiere").addClass('hidden');
		$(".preview").empty();
		$(".description").empty();
		$(".photo").empty();
		$("#indi_movies").addClass('hidden');
  });

})
	
