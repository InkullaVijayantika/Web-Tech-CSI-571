let query;
var genres;



function getHomePage(){
  console.log(1);
  getTrendingMovies();
  getTrendingTV();
}


function getTrendingMovies(){
  console.log(1);
  var results;
  var dataElem = document.getElementById('trending-movies');
  var slideshow_container = document.createElement('div');
  slideshow_container.setAttribute('class','slideshow_container');
  dataElem.appendChild(slideshow_container);

  const xmlReq = new XMLHttpRequest();
  xmlReq.overrideMimeType('application/json');
  xmlReq.open('GET', "/trendingmovies/", true);
  xmlReq.onreadystatechange = function(){
    if (this.readyState === 4 && this.status === 404) {
      displayErrorMessage('Error: No record has been found, please enter a valid symbol.');
    }
    if (this.readyState === 4 && this.status === 200){
      data = JSON.parse(this.responseText);
      var results = data.results;
        for(var i=0;i<5;i++){
          var slide1 = document.createElement('div');
          slide1.setAttribute('class','mySlides1');
          slide1.innerHTML = '<img style ="width:80%;" src= "https://image.tmdb.org/t/p/w780/'+ results[i].backdrop_path+ '"/>' +
          '</br><div class="text">'+results[i].title+ ' (' +results[i].release_date.split('-')[0]+')</div>';
          slideshow_container.appendChild(slide1);
        }
      console.log(document.getElementsByClassName('mySlides1').length);

      var slideIndex = 0;
      showSlides();
      function showSlides() {
        var i;
        var slides = document.getElementsByClassName("mySlides1");
        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1;}
        slides[slideIndex-1].style.display = "block";
        setTimeout(showSlides, 2000); // Change image every 2 seconds
      }
    }
  };
  xmlReq.send();
}

function getTrendingTV(){
  console.log(1);
  var results;
  var dataElem = document.getElementById('tv-shows');
  var slideshow_container = document.createElement('div');
  slideshow_container.setAttribute('class','slideshow_container');
  dataElem.appendChild(slideshow_container);

  const xmlReq = new XMLHttpRequest();
  xmlReq.overrideMimeType('application/json');
  xmlReq.open('GET', "/trendingtv/", true);
  xmlReq.onreadystatechange = function(){
    if (this.readyState === 4 && this.status === 404) {
      displayErrorMessage('Error: No record has been found, please enter a valid symbol.');
    }
    if (this.readyState === 4 && this.status === 200){
      data = JSON.parse(this.responseText);
      var results = data.results;
        for(var i=0;i<5;i++){
          var slide2 = document.createElement('div');
          slide2.setAttribute('class','mySlides2');
          slide2.innerHTML = '<img style = "width:80%" src= "https://image.tmdb.org/t/p/w780/'+ results[i].backdrop_path+ '"/>' +
          '</br><div class="text">'+results[i].name+' (' +results[i].first_air_date.split('-')[0]+')</div>';
          slideshow_container.appendChild(slide2);
        }

        var slideIndex = 0;
        showSlides();
        function showSlides() {
          var i;
          var slides = document.getElementsByClassName("mySlides2");
          for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
          }
          slideIndex++;
          if (slideIndex > slides.length) {slideIndex = 1;}
          slides[slideIndex-1].style.display = "block";
          setTimeout(showSlides, 2000); // Change image every 2 seconds
        }
    }
  };
  xmlReq.send();
}

// var index = 0;
// function showSlides() {
//   var i;
//   var slides1 = document.getElementsByClassName("mySlides1");
//   var slides2 = document.getElementsByClassName("mySlides2");
//   console.log(slides1.length);
//   for (i = 0; i < slides1.length; i++) {
//     slides1[i].style.display = "none";
//     slides2[i].style.display = "none";
//   }
//   index++;
//   if (index > slides1.length) {index = 1;}
//   slides1[index-1].style.display = "block";
//   slides2[index-1].style.display = "block";
//   setTimeout(showSlides, 2000); // Change image every 2 seconds
// }



function resetInput(){
  document.getElementById('search').value = "";
  document.getElementById('category').value = "nothing";
  var dataElem = document.getElementById('card-table');
  if(dataElem){
    dataElem.style.display = "none";
  }
  var e = document.getElementById('error');
  if(e){
    e.parentElement.removeChild(e);
  }
  f = document.getElementById('footer');
  f.parentElement.removeChild(f);
  let footerElem = document.createElement('footer');
  footerElem.setAttribute('id','footer');
  footerElem.setAttribute('style','margin-top:380px;height:70px');
  footerElem.innerHTML = '<p style="color:white;">Develped by Vijayantika <br> Powered by TMDB</p>';
  let parent = document.getElementById('right-pane');
  parent.appendChild(footerElem);

}




function myPopup(cat,id,genre){
  console.log(cat);
  console.log(id);
  console.log(genre);
  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];

  const xmlReq = new XMLHttpRequest();
  xmlReq.overrideMimeType('application/json');
  xmlReq.open('GET', "/details/?id=" + id +"&category=" + cat, true);
  xmlReq.onreadystatechange = function(){
    if (this.readyState === 4 && this.status === 404) {
      displayErrorMessage('Error: No record has been found, please enter a valid symbol.');
    }
    if (this.readyState === 4 && this.status === 200){
        var d = JSON.parse(this.responseText);
        console.log(d.title);
        console.log(d.runtime);
        console.log(d.spoken_languages);
        let main = document.createElement('div');
        main.setAttribute('id','main');
        span.parentElement.appendChild(main);
        let poster = document.createElement('img');
        let textNode = document.createElement('div');
        if(!d.backdrop_path){
          poster.setAttribute('src','static/movie-placeholder.jpg');
          poster.setAttribute('style','width:780px');
        }
        else{
          poster.setAttribute('src','https://image.tmdb.org/t/p/w780'+d.backdrop_path);
          poster.setAttribute('style','width:780px');
        }

        main.appendChild(poster);

        var spoken = "";
        if(d.spoken_languages.length !== 0){
          var spoken = 'Spoken languages: ';
          for(var x in d.spoken_languages){
            spoken+=d.spoken_languages[x].english_name+' ';
          }
        }
        var vote_average ="";
        if(d.vote_average){
            vote_average=d.vote_average;
        }
        var vote_count="";
        if(d.vote_count){
            vote_count=d.vote_count;
        }
        var overview="";
        if(d.overview){
            overview=d.overview;
        }

        if(cat == 'movie'){
          var title="";
          if(d.title){
              title = d.title;
          }
          var release_date ="";
          if(d.release_date){
              release_date=d.release_date.split('-')[0];
          }
          textNode.innerHTML = '<p style="color:black;font-size:20px;font-weight:400"> ' + title + '<a href="https://www.themoviedb.org/movie/'+id+'" target="_blank" style="color:red;text-decoration:none"> &#9432;</a> </p>' + ' <p style="color:black;font-size:15px"> ' + release_date + ' | ' +genre+ ' </p>'
          + '</br> <p class="ratings" style="color:black"> ' +'<span style="color:red">&#9733;'+ vote_average/2 +'/5 </span> ' + vote_count + ' votes' +' </p>' + '</br><p style="color:black; display:flex"> ' + overview +' </p>'
          +'<p style="margin-top:10px;color:black;font-weight:500;font-style:italic">'+spoken+'</p>';
        }
        if(cat == 'tv'){
          var name="";
          if(d.name){
              name = d.name;
          }
          var first_air_date ="";
          if(d.first_air_date){
              first_air_date=d.first_air_date.split('-')[0];
          }
          textNode.innerHTML = '<p style="color:black;font-size:20px;font-weight:400"> ' + name + '<a href="https://www.themoviedb.org/tv/'+id+'" target="_blank" style="color:red;text-decoration:none"> &#9432;</a> </p>' + ' <p style="color:black;font-size:15px"> ' + first_air_date + ' | ' +genre+ ' </p>'
          + '</br> <p class="ratings" style="color:black"> ' +'<span style="color:red">&#9733;'+ vote_average/2 +'/5 </span> ' + vote_count + ' votes' +' </p>' + '</br><p style="color:black; display:flex"> ' + overview +' </p>'
          +'<p style="margin-top:10px;color:black;font-weight:500;font-style:italic">'+spoken+'</p>';
        }
        if(cat == 'multi'){
          if(d.title){
            var title="";
            if(d.title){
                title = d.title;
            }
            var release_date ="";
            if(d.release_date){
                release_date=d.release_date.split('-')[0];
            }
            textNode.innerHTML = '<p style="color:black;font-size:20px;font-weight:400"> ' + title + '<a href="https://www.themoviedb.org/movie/'+id+'" target="_blank" style="color:red;text-decoration:none"> &#9432;</a> </p>' + ' <p style="color:black;font-size:15px"> ' + release_date + ' | ' +genre+ ' </p>'
            + '</br> <p class="ratings" style="color:black"> ' +'<span style="color:red">&#9733;'+ vote_average/2 +'/5 </span> ' + vote_count + ' votes' +' </p>' + '</br><p style="color:black; display:flex"> ' + overview +' </p>'
            +'<p style="margin-top:10px;color:black;font-weight:500;font-style:italic">'+spoken+'</p>';
          }
          if(d.name){
            var name="";
            if(d.name){
                name = d.name;
            }
            var first_air_date ="";
            if(d.first_air_date){
                first_air_date=d.first_air_date.split('-')[0];
            }
            textNode.innerHTML = '<p style="color:black;font-size:20px;font-weight:400"> ' + name + '<a href="https://www.themoviedb.org/tv/'+id+'" target="_blank" style="color:red;text-decoration:none"> &#9432;</a> </p>' + ' <p style="color:black;font-size:15px"> ' + first_air_date + ' | ' +genre+ ' </p>'
            + '</br> <p class="ratings" style="color:black"> ' +'<span style="color:red">&#9733;'+ vote_average/2 +'/5 </span> ' + vote_count + ' votes' +' </p>' + '</br><p style="color:black; display:flex"> ' + overview +' </p>'
            +'<p style="margin-top:10px;color:black;font-weight:500;font-style:italic">'+spoken+'</p>';
          }
        }

        main.appendChild(textNode);

        getCredits(id,cat);

        span.onclick = function() {
        modal.style.display = "none";
        main.parentElement.removeChild(main);
        };
      }
    };
  xmlReq.send();

  var cont = document.createElement('div');
  modal.style.display = "block";
}




function getCredits(id,cat){
  var main = document.getElementById('main');
  var credits;
  const xmlReq = new XMLHttpRequest();
  xmlReq.overrideMimeType('application/json');
  xmlReq.open('GET', "/credits/?id=" + id +"&category=" + cat, true);
  xmlReq.onreadystatechange = function(){
    if (this.readyState === 4 && this.status === 404) {
      displayErrorMessage('Error: No record has been found, please enter a valid symbol.');
    }
    if (this.readyState === 4 && this.status === 200){
      credits = JSON.parse(this.responseText);
      var cast = credits.cast;
      var c = document.createElement('div');
      c.setAttribute('style','display:flex;flex-direction:row;flex-wrap:wrap');
      console.log(cast.length);
      if(cast.length!=0){
        var z = document.createElement('div');
        z.innerHTML = '</br><span style="color:black;font-weight:700;font-size:20px">Cast<span></br></br>';
        main.appendChild(z);
      }
      else{
        var z = document.createElement('div');
        z.innerHTML = '</br><span style="color:black;font-weight:700;font-size:20px">Cast: N/A<span></br></br>';
        main.appendChild(z);
      }

      for(var x=0;x<cast.length;x++){
        if(x>7){break;}
        var container = document.createElement('div');
        container.setAttribute('style','width:200px;');
        if(!cast[x].profile_path){
          if(cast[x].character == ""){
            container.innerHTML = '<img src="static/person-placeholder.png"/>'
            +'<h3 style="text-align:center;margin-bottom:-17px;font-size:15px">'+cast[x].name+'</h3>';
            c.appendChild(container);
          }
          else{
            container.innerHTML = '<img src="static/person-placeholder.png"/>'
            +'<h3 style="text-align:center;margin-bottom:-17px;font-size:15px">'+cast[x].name+'</h3>'+'<p style="text-align:center;width:170px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:15px"">AS <br>'+cast[x].character+'</p>';
            c.appendChild(container);
          }
        }
        else{
          if(cast[x].character == ""){
            container.innerHTML = '<img src="https://image.tmdb.org/t/p/w185/'+cast[x].profile_path+'"/>'
            +'<h3 style="text-align:center;margin-bottom:-17px;font-size:15px">'+cast[x].name+'</h3>';
            c.appendChild(container);
          }
          else{
            container.innerHTML = '<img src="https://image.tmdb.org/t/p/w185/'+cast[x].profile_path+'"/>'
            +'<h3 style="text-align:center;margin-bottom:-17px;font-size:15px">'+cast[x].name+'</h3>'+'<p style="text-align:center;width:170px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:15px"">AS <br>'+cast[x].character+'</p>';
            c.appendChild(container);
          }
        }
      }
      main.appendChild(c);
      getReviews(id,cat);

    }
  };
  xmlReq.send();

}



function getReviews(id,cat){
  var main = document.getElementById('main');
  var r;
  const xmlR = new XMLHttpRequest();
  xmlR.overrideMimeType('application/json');
  xmlR.open('GET', "/reviews/?id=" + id +"&category=" + cat, true);
  xmlR.onreadystatechange = function(){
    if (this.readyState === 4 && this.status === 404) {
      displayErrorMessage('Error: No record has been found, please enter a valid symbol.');
    }
    if (this.readyState === 4 && this.status === 200){
      r = JSON.parse(this.responseText);
      var list = r.results;
      console.log(list);
      var reviews = document.createElement('div');
      if(list.length !== 0){
        reviews.innerHTML = '</br></br><p style="font-size:20px;font-weight:bold">Reviews</p>';
      }
      else{
        reviews.innerHTML = '</br></br><p style="font-size:20px;font-weight:bold">Reviews: N/A</p>';
      }
      for(var x=0; x<list.length;x++){
        if(x>4){break;}
        var c = document.createElement('div');
        var username = list[x].author_details.username;
        console.log(username);
        var created = list[x].created_at;
        var rating = list[x].author_details.rating;
        var ra;
        if(rating === null){
          ra = ' ';
        }
        else{
          ra=' <p style="color:red;margin-bottom:-2px">&#9733;'+rating/2+'/5</p>';
        }
        var content = list[x].content;
        c.innerHTML = '<p style="color:black;"><span style="font-size:15px;font-weight:bold">'+username+'</span> on '+created.split('T')[0]+'</p>'
        +ra+'<div class="review-text" style="color:balck">'+content+'</div>'
        +'<hr style="width:700px"></br>';
        reviews.appendChild(c);
      }
      main.appendChild(reviews);
    }
  };
  xmlR.send();
}


function completeData(mydata,data,cat){
  var result = data.results;
  var displayElem = document.getElementById('content');
  var newElem = document.createElement('div');
  newElem.setAttribute('id','card-table');
  newElem.innerHTML = '<p style="color:white"> &nbsp;&nbsp;Showing results...</p>';

  for ( var i in result){
    var d = result[i];
    var vote_average ="";
    if(d.vote_average){
        vote_average=d.vote_average;
    }
    var vote_count="";
    if(d.vote_count){
        vote_count=d.vote_count;
    }
    var overview="";
    if(d.overview){
        overview=d.overview;
    }

    var id = d.id;
    var genre_ids = "";
    if(d.genre_ids){
        genre_ids=d.genre_ids;
    }

    var cardContainerElem = document.createElement('div');
    cardContainerElem.classList.add('card-container');
    var completeElem = document.createElement('div');
    completeElem.classList.add('complete');
    var poster = document.createElement('img');
    if(!d.poster_path){
      poster.setAttribute('src','static/movie-placeholder.jpg');
      poster.setAttribute('style','width:185px');
    }
    else{
      poster.setAttribute('src','https://image.tmdb.org/t/p/w185'+d.poster_path);
      poster.setAttribute('style','width:185px');
    }

    poster.classList.add('card-image');
    var textNode = document.createElement('div');
    textNode.classList.add('card-text');

    var genre_text = '';
    var arr = [];
    for(var x in d.genre_ids){
      genre_text += mydata[d.genre_ids[x]] + '. ';
      arr.push(mydata[d.genre_ids[x]]);
    }
    console.log('onClick="myPopup('+"'movie'"+','+id+','+'"'+genre_text+'"'+')"');
    if(cat == 'movie'){
      var title="";
      if(d.title){
          title = d.title;
      }
      var release_date ="";
      if(d.release_date){
          release_date=d.release_date.split('-')[0];
      }
      textNode.innerHTML = '<h2 class="title-truncate">' + title + '</h2>' + '<br/><p class="other-text">' + release_date + ' | ' +genre_text+ ' </p>'  + '<p class="ratings" style="color:white"> ' +'<span style="color:red">&#9733;'+ vote_average/2+'/5 &nbsp;</span> ' + vote_count + ' votes' +' </p>' + '</br><p class="overview-text" style="color:white;"> ' + overview + '</p>'+ '<br/></br><button class="show-more" id="show-more" style=" color:white;" onClick="myPopup('+"'movie'"+','+id+','+'\''+genre_text+'\''+')"> Show More  </button>'+'<div id="myModal" class="modal"><div class="modal-content"><span class="close">&times;</span></div></div>';

    }
    else if(cat == 'tv'){
      var name="";
      if(d.name){
          name = d.name;
      }
      var first_air_date ="";
      if(d.first_air_date){
          first_air_date=d.first_air_date.split('-')[0];
      }
      textNode.innerHTML = '<h2 class="title-truncate"> ' + name + ' </h2>' + '</br><p class="other-text"> ' + first_air_date + ' | '+genre_text + ' </p>'+ ' <p class="ratings" style="color:white"> ' +'<span style="color:red">&#9733;'+ vote_average/2 +'/5 &nbsp;</span> ' + vote_count + ' votes' +' </p>' + '</br><p class="overview-text" style="color:white;"> ' + overview + '</p>'
      + '<br/></br><button class="show-more" id="show-more" style=" color:white" onClick="myPopup('+"'tv'"+','+id+','+'\''+genre_text+'\''+')"> Show More  </button>'+'<div id="myModal" class="modal"><div class="modal-content"><span class="close">&times;</span></div></div>';
    }
    else{
      if(d.title){
        var title="";
        if(d.title){
            title = d.title;
        }
        var release_date ="";
        if(d.release_date){
            release_date=d.release_date.split('-')[0];
        }
        textNode.innerHTML = '<h2 class="title-truncate">' + title + '</h2>' + '<br/><p class="other-text">' + release_date + ' | ' +genre_text+ ' </p>'
        + ' <p class="ratings" style="color:white"> ' +'<span style="color:red">&#9733;'+ vote_average/2+'/5 &nbsp;</span> ' + vote_count + ' votes' +' </p>' + '</br><p class="overview-text" style="color:white;"> ' + overview +'</p>'
        + '<br/></br><button class="show-more" id="show-more" style=" color:white" onClick="myPopup('+"'movie'"+','+id+','+'\''+genre_text+'\''+')"> Show More  </button>'
        +'<div id="myModal" class="modal"><div class="modal-content"><span class="close">&times;</span></div></div>';
      }
      if(d.name){
        var name="";
        if(d.name){
            name = d.name;
        }
        var first_air_date ="";
        if(d.first_air_date){
            first_air_date=d.first_air_date.split('-')[0];
        }
        textNode.innerHTML = '<h2 class="title-truncate"> ' + name + ' </h2>' + '</br><p class="other-text"> ' + first_air_date + ' | '+genre_text + ' </p>'
        + ' <p class="ratings" style="color:white"> ' +'<span style="color:red">&#9733;'+ vote_average/2 +'/5 &nbsp;</span> ' + vote_count + ' votes' +' </p>' + '</br><p class="overview-text" style="color:white;"> ' + overview +'</p>'
        + '<br/></br><button class="show-more" id="show-more" style=" color:white" onClick="myPopup('+"'tv'"+','+id+','+'\''+genre_text+'\''+')"> Show More  </button>'+'<div id="myModal" class="modal"><div class="modal-content"><span class="close">&times;</span></div></div>';
      }
    }

    completeElem.appendChild(poster);
    completeElem.appendChild(textNode);
    cardContainerElem.appendChild(completeElem);
    newElem.appendChild(cardContainerElem);
  }
  displayElem.appendChild(newElem);
}




function getGenres(data,cat){
  var mydata;
  const xmlReq = new XMLHttpRequest();
  xmlReq.overrideMimeType('application/json');
  xmlReq.open('GET', "/genre/?category=" + cat, true);
  xmlReq.onreadystatechange = function(){
    if (this.readyState === 4 && this.status === 404) {
      displayErrorMessage('Error: No record has been found, please enter a valid symbol.');
    }
    if (this.readyState === 4 && this.status === 200){
        mydata = JSON.parse(this.responseText);
        completeData(mydata,data,cat);
      }
    };
  xmlReq.send();
}




function deletePrevious(){
  var displayElem = document.getElementById('card-table');
  if(displayElem){
    displayElem.parentElement.removeChild(displayElem);
  }
  var e = document.getElementById('error');
  if(e){
    e.parentElement.removeChild(e);
  }
}




function getSearchData(){
  deletePrevious();
  query = document.getElementById('search').value;
  // console.log(query);
  e = document.getElementById('category');
  cat = e.options[e.selectedIndex].value;
  if (query && e.value!="nothing"){
    const xmlReq = new XMLHttpRequest();
    xmlReq.overrideMimeType('application/json');
    xmlReq.open('GET', "/search/?query=" + query + "&category=" + cat, true);
    xmlReq.onreadystatechange = function(){
      if (this.readyState === 4 && this.status === 404) {
        displayErrorMessage('Error: No record has been found, please enter a valid symbol.');
      }
      if (this.readyState === 4 && this.status === 200){
        var mydata = JSON.parse(this.responseText);
        console.log(mydata.results);
        if(mydata.results.length === 0){
          console.log(1);
          var error = document.createElement('div');
          error.setAttribute('id','error');
          error.innerHTML = '<p style="color:white;text-align:center"> No results found.</p>';
          var parent = document.getElementById('right-pane');
          parent.appendChild(error);
          f = document.getElementById('footer');
          f.parentElement.removeChild(f);
          let footerElem = document.createElement('footer');
          footerElem.setAttribute('id','footer');
          footerElem.setAttribute('style','margin-top:320px;height:70px');
          footerElem.innerHTML = '<p style="color:white;">Develped by Vijayantika <br> Powered by TMDB</p>';
          parent.appendChild(footerElem);
        }
        else{
          getGenres(mydata,cat);
          f = document.getElementById('footer');
          f.parentElement.removeChild(f);
          let footerElem = document.createElement('footer');
          footerElem.setAttribute('id','footer');
          footerElem.setAttribute('style','margin-top:50px;height:70px');
          footerElem.innerHTML = '<p style="color:white;">Develped by Vijayantika <br> Powered by TMDB</p>';
          let parent = document.getElementById('right-pane');
          parent.appendChild(footerElem);

        }
      }
    };
  xmlReq.send();
  }
  else{
    alert("Please enter valid values");
  }
}



function searchData(){
  var currActive = document.getElementsByClassName('active')[0];
  var newActive = document.getElementById('search-tab');
  currActive.classList.remove('active');
  newActive.classList.add('active');

  var dataElem = document.getElementById('trending-movies');
  var parent = dataElem.parentElement;
  dataElem.parentElement.removeChild(dataElem);
  var dataElem1 = document.getElementById('tv-shows');
  dataElem1.parentElement.removeChild(dataElem1);

  var b = document.getElementById('breaks');
  b.parentElement.removeChild(b);

  var searchElem = document.createElement('div');
  searchElem.setAttribute('id', 'search-box');
  searchElem.innerHTML = '<p id="header" style="color:white;font-size:20px;font-weight:800;">Search</p>';
  var formElem = document.createElement('form');
  formElem.setAttribute('method','POST');
  formElem.setAttribute('onsubmit','return false');
  formElem.innerHTML = '<label id="text" for="search" style="color:white"> Keyword <span id="required" style="color:red">*</span>&nbsp;&nbsp;&nbsp;&nbsp; </label>'+'<input id="search" type="text" name="search" size="50"required/> <br><br>'+ '<label id="text" for="category" style="color:white;position:relative;left:-110px"> Category <span id="required" style="color:red">*</span>&nbsp;&nbsp;&nbsp;&nbsp; </label>' +
  ' <select style="position:relative;left:-110px" name="cars" id="category"> <option value="nothing"></option> <option value="movie">Movies</option> <option value="tv">TV Shows</option> <option value="multi">TV Shows or movies</option> </select>';
  var buttonElem = document.createElement('div');
  buttonElem.setAttribute('id','button-box');
  buttonElem.innerHTML = '<br><input class="button" type="submit" value="Search" onClick="getSearchData()"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
  '<input class="button" type="button" value="Clear" onclick="resetInput()"/>';

  formElem.appendChild(buttonElem);
  searchElem.appendChild(formElem);
  parent.appendChild(searchElem);

  f = document.getElementById('footer');
  f.parentElement.removeChild(f);
  var footerElem = document.createElement('footer');
  footerElem.setAttribute('id','footer');
  footerElem.setAttribute('style','margin-top:380px;height:70px');
  footerElem.innerHTML = '<p style="color:white;">Develped by Vijayantika <br> Powered by TMDB</p>';
  parent.appendChild(footerElem);

}
