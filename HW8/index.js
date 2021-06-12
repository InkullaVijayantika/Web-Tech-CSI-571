"use strict";
const express = require('express');
const axios = require('axios');
var cors = require('cors')

const app = express();
const router = express.Router();

var API_KEY = 'a9f2cb016a20f09e5aa2d3f6d2a7b2cc';
app.use(cors())

function getAutoCompleteResponse(data){
    let response = [];
    if (data.hasOwnProperty('response')) {
        return {
            'code': 404,
            'response': response
        };
    }


    for(var i=0; i<7; i++){
        if (data[i].name){
            response.push({
                'id': data[i].id,
                'title': data[i].name,
                'backdrop_path':'https://image.tmdb.org/t/p/w500' + data[i].backdrop_path,
                'media_type':data[i].media_type,
                'poster_path':'https://image.tmdb.org/t/p/w500' + data[i].poster_path,
            });
        }
        if (data[i].title){
            response.push({
                'id': data[i].id,
                'title': data[i].title,
                'backdrop_path':'https://image.tmdb.org/t/p/w500' + data[i].backdrop_path,
                'media_type':data[i].media_type,
                'poster_path':'https://image.tmdb.org/t/p/w500' + data[i].poster_path,
            });
        }
    }

    return {
        'code': 200,
        'response': response
    };

}
app.get('/autocomplete/:query', async (req, res) =>{
    const query = req.params.query;
    console.log(query);
    let url = 'https://api.themoviedb.org/3/search/multi?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc&language=enUS&query='+query;
    let data = await axios({
        method: 'GET',
        url
    }).then(response => response.data.results).catch(error => error);
    let { code, response } = getAutoCompleteResponse(data);
    console.log(response);
    res.status(code).send(response).end();
});



function getCurrentMovies(data){
    let response = [];
    for(var i=0; i<5; i++){
        if(data[i].poster_path){
            response.push({
                'id': data[i].id,
                'title': data[i].title,
                'backdrop_path': 'https://image.tmdb.org/t/p/original' + data[i].backdrop_path,
                'media_type': 'movie',
                'poster_path': 'https://image.tmdb.org/t/p/w500' + data[i].poster_path
            });
        }
    }
    return response;
}
app.get('/currentmovies/', async (req, res) =>{
    let url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc&language=enUS&page=1';
    let data = await axios({
        method: 'GET',
        url
    }).then(response => response.data.results).catch(error => error);
    let response = getCurrentMovies(data);
    res.send(response).end();
});



function getPopularTopTrendMovies(data){
    let response = [];
    data.forEach(d=>{
        if(d.poster_path){
            response.push({
                'id': d.id,
                'title': d.title,
                'poster_path':'https://image.tmdb.org/t/p/w500' + d.poster_path,
                'media_type': 'movie',
                'backdrop_path': 'https://image.tmdb.org/t/p/w500' + d.backdrop_path,
            });
        }
    });
    return response;
}
app.get('/popularmovies/', async (req, res) =>{
    let url = 'https://api.themoviedb.org/3/movie/popular?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc&language=enUS&page=1';
    let data = await axios({
        method: 'GET',
        url
    }).then(response => response.data.results).catch(error => error);
    let response = getPopularTopTrendMovies(data);
    res.send(response).end();
});




app.get('/topmovies/', async (req, res) =>{
    let url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc&language=enUS&page=1';
    let data = await axios({
        method: 'GET',
        url
    }).then(response => response.data.results).catch(error => error);
    let response = getPopularTopTrendMovies(data);
    res.send(response).end();
});




app.get('/trendmovies/', async (req, res) =>{
    let url = 'https://api.themoviedb.org/3/trending/movie/day?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc';
    let data = await axios({
        method: 'GET',
        url
    }).then(response => response.data.results).catch(error => error);
    let response = getPopularTopTrendMovies(data);
    res.send(response).end();
});




function getPopularTopTrendTV(data){
    let response = [];
    data.forEach(d=>{
        if(d.poster_path){
            response.push({
                'id': d.id,
                'title': d.name,
                'poster_path':'https://image.tmdb.org/t/p/w500' + d.poster_path,
                'media_type': 'tv',
                'backdrop_path': 'https://image.tmdb.org/t/p/w500' + d.backdrop_path,
            });
        }
    });
    return response;
}
app.get('/populartv/', async (req, res) =>{
    let url = 'https://api.themoviedb.org/3/tv/popular?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc&language=en-US&page=1';
    let data = await axios({
        method: 'GET',
        url
    }).then(response => response.data.results).catch(error => error);
    let response = getPopularTopTrendTV(data);
    res.send(response).end();
});


app.get('/toptv/', async (req, res) =>{
    let url = 'https://api.themoviedb.org/3/tv/top_rated?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc&language=enUS&page=1';
    let data = await axios({
        method: 'GET',
        url
    }).then(response => response.data.results).catch(error => error);
    let response = getPopularTopTrendTV(data);
    res.send(response).end();
});



app.get('/trendtv/', async (req, res) =>{
    let url = 'https://api.themoviedb.org/3/trending/tv/day?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc';
    let data = await axios({
        method: 'GET',
        url
    }).then(response => response.data.results).catch(error => error);
    let response = getPopularTopTrendTV(data);
    res.send(response).end();
});




function getDetailsResponse(videoData, detailsData){
    let response = {};
    if(videoData == null){
        videoData = {};
        videoData.site=null;
        videoData.type=null;
        videoData.name=null;
        videoData.key=null;
    }
    if (videoData.hasOwnProperty('response') || detailsData.hasOwnProperty('response')) {
        return {
            'code': 404,
            'response': response
        };
    }
    var title = '';
    var runtime;
    var release_date = '';
    var k;
    if(detailsData.title){
        title = detailsData.title;
        runtime = detailsData.runtime;
        release_date = detailsData.release_date;

    }
    if(detailsData.name){
        title = detailsData.name;
        runtime = detailsData.episode_run_time[0];
        release_date = detailsData.first_air_date;
    }
    if(videoData.key == '' || videoData.key == null){
        k = 'tzkWB85ULJY';
    }
    else{
        k = videoData.key;
    }
    response = {
        'site':videoData.site,
        'type':videoData.type,
        'name':videoData.name,
        'key':k,
        'title':title,
        'genres':detailsData.genres,
        'languages':detailsData.spoken_languages,
        'release_date':release_date,
        'overview':detailsData.overview,
        'vote':detailsData.vote_average,
        'tagline':detailsData.tagline,
        'runtime':runtime,
        'poster_path': 'https://image.tmdb.org/t/p/w500' + detailsData.poster_path,
        'id': detailsData.id
    };
    return {
        code: 200,
        response: response
    };
}
async function getCombinedDetails(id, media_type){
    console.log(id, media_type);
    var videoUrl = '';
    var detailsUrl = '';
    if (media_type == 'movie'){
        videoUrl = 'https://api.themoviedb.org/3/movie/'+id+'/videos?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc&language=en-US&page=1';
        detailsUrl = 'https://api.themoviedb.org/3/movie/'+id+'?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc&language=enUS&page=1';
    }
    if(media_type == 'tv'){
        videoUrl = 'https://api.themoviedb.org/3/tv/'+id+'/videos?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc&language=en-US&page=1';
        detailsUrl = 'https://api.themoviedb.org/3/tv/'+id+'?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc&language=enUS&page=1';
    }

    let videoData = await axios({
        method: 'GET',
        url: videoUrl,
    }).then(response => response.data.results[0]).catch(error => error);
    let detailsData = await axios({
        method: 'GET',
        url: detailsUrl,
    }).then(response => response.data).catch(error => error);
    console.log(videoData);
    return {
        videoData,
        detailsData
    };

}
app.get('/watch/:media_type/:id', async(req, res) =>{
    const media_type = req.params.media_type;
    const id = req.params.id;
    console.log(media_type,id);
    let { videoData, detailsData } = await getCombinedDetails(id, media_type);
    let { code, response } = getDetailsResponse(videoData, detailsData);

    res.status(code).send(response).end();

});




function getCast(castData){
    let response = [];
    castData.forEach(d=>{
        if(d.profile_path){
            response.push({
                'id': d.id,
                'name': d.name,
                'character':d.character,
                'profile_path':'https://image.tmdb.org/t/p/w500' + d.profile_path
            });
        }
    });

    return response;
}
app.get('/cast/:media_type/:id', async(req, res) =>{
    const media_type = req.params.media_type;
    const id = req.params.id;
    var url ='';
    if(media_type == 'movie'){
        url ='https://api.themoviedb.org/3/movie/'+id+'/credits?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc&language=en-US&page=1';
    }
    if(media_type == 'tv'){
        url = 'https://api.themoviedb.org/3/tv/'+id+'/credits?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc&language=en-US&page=1';
    }
    let castData = await axios({
        method: 'GET',
        url
    }).then(response => response.data.cast).catch(error => error);

    let response = getCast(castData);
    res.send(response).end();

});



function getCastDetails(castDetails, castExtDetails){
    let response = {};
    var g = '';
    console.log(castDetails.gender)
    if(castDetails.gender == 1){
        g = 'Female';
    }
    if(castDetails.gender == 2){
        g = 'Male';
    }
    // var dict = {};
    // for(var key in castExtDetails){
    //   if(castExtDetails[key]!=null || castExtDetails[key]!= ""){
    //     dict[key] = castExtDetails[key];
    //   }
    // }
    response={
        'id':castDetails.id,
        'dob':castDetails.birthday,
        'gender':g,
        'name':castDetails.name,
        'page':castDetails.homepage,
        'knownas':castDetails.also_known_as,
        'talent':castDetails.known_for_department,
        'bio':castDetails.biography,
        'place':castDetails.place_of_birth,
        'imdb':castExtDetails.imdb_id,
        'fb':castExtDetails.facebook_id,
        'insta':castExtDetails.instagram_id,
        'twitter':castExtDetails.twitter_id
    };
    return response;
}
async function getCastFull(pid){
    let url1 ='https://api.themoviedb.org/3/person/'+pid+'?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc&language=enUS&page=1';
    let url2 = 'https://api.themoviedb.org/3/person/'+pid+'/external_ids?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc&language=en-US&page=1';
    let castDetails = await axios({
        method: 'GET',
        url:url1,
    }).then(response => response.data).catch(error => error);
    let castExtDetails = await axios({
        method: 'GET',
        url:url2,
    }).then(response => response.data).catch(error => error);

    return {
        castDetails,
        castExtDetails
    };


}
app.get('/castdetails/:pid', async(req, res) =>{
    const pid = req.params.pid;


    let {castDetails, castExtDetails} = await getCastFull(pid);
    let response = getCastDetails(castDetails, castExtDetails);
    res.send(response).end();

});





function getReviews(data){
    let response = [];
    if (data.hasOwnProperty('response')) {
        return {
            'code': 404,
            'response': response
        };
    }
    console.log(data.length);
    for(var i=0; i<data.length; i++){
        if(i==10){
            break;
        }
        var path = '';
        console.log(data[i].author_details.avatar_path);
        if(!data[i].author_details.avatar_path){
            path = null;
        }
        else{
            var str = data[i].author_details.avatar_path;
            if(str.includes('https')){
                path = str.substring(1);
            }
            else{
                path = 'https://image.tmdb.org/t/p/original'+data[i].author_details.avatar_path;
            }
        }

        response.push({
            'author': data[i].author,
            'content': data[i].content,
            'created':data[i].created_at,
            'url':data[i].url,
            'profile_path':path,
            'rating':data[i].author_details.rating,
            'id': data[i].id
        });
    }

    return {
        'code': 200,
        'response': response
    };
}
app.get('/reviews/:media_type/:id', async(req, res) =>{
    const id = req.params.id;
    const media_type = req.params.media_type;
    var url = '';
    if(media_type == 'movie'){
        url = 'https://api.themoviedb.org/3/movie/'+id+'/reviews?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc&language=en-US&page=1';
    }
    if(media_type == 'tv'){
        url = 'https://api.themoviedb.org/3/tv/'+id+'/reviews?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc&language=en-US&page=1';
    }
    let data = await axios({
        method: 'GET',
        url
    }).then(response => response.data.results).catch(error => error);
    let { code, response } = await getReviews(data);
    res.status(code).send(response).end();


});




function getRecommendations(data, media_type){
    let response = [];
    data.forEach(d =>{
        if (d.name){
            response.push({
                'id': d.id,
                'title': d.name,
                'poster_path':'https://image.tmdb.org/t/p/w500' + d.poster_path,
                'media_type': media_type,
                'backdrop_path': 'https://image.tmdb.org/t/p/w500' + d.backdrop_path,
            });
        }
        if (d.title){
            response.push({
                'id': d.id,
                'title': d.title,
                'poster_path':'https://image.tmdb.org/t/p/w500' + d.poster_path,
                'media_type': media_type,
                'backdrop_path': 'https://image.tmdb.org/t/p/w500' + d.backdrop_path
            });
        }
    });
    return response;
}
app.get('/recommendations/:media_type/:id', async(req,res) =>{
    const id = req.params.id;
    const media_type = req.params.media_type;
    var url = '';
    if(media_type == 'movie'){
        url = 'https://api.themoviedb.org/3/movie/'+id+'/recommendations?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc&language=en-US&page=1';
    }
    if(media_type == 'tv'){
        url = 'https://api.themoviedb.org/3/tv/'+id+'/recommendations?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc&language=en-US&page=1';
    }
    let data = await axios({
        method: 'GET',
        url
    }).then(response => response.data.results).catch(error => error);
    let response = getRecommendations(data, media_type);
    res.send(response).end();
});





function getSimilar(data, media_type){
    let response = [];
    data.forEach(d =>{
        if (d.name){
            response.push({
                'id': d.id,
                'title': d.name,
                'poster_path':'https://image.tmdb.org/t/p/w500' + d.poster_path,
                'media_type': media_type,
                'backdrop_path': 'https://image.tmdb.org/t/p/w500' + d.backdrop_path
            });
        }
        if (d.title){
            response.push({
                'id': d.id,
                'title': d.title,
                'poster_path':'https://image.tmdb.org/t/p/w500' + d.poster_path,
                'media_type': media_type,
                'backdrop_path': 'https://image.tmdb.org/t/p/w500' + d.backdrop_path
            });
        }
    });
    return response;
}

app.get('/similar/:media_type/:id', async(req,res) =>{
    const id = req.params.id;
    const media_type = req.params.media_type;
    var url = '';
    if(media_type == 'movie'){
        url = 'https://api.themoviedb.org/3/movie/'+id+'/similar?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc&language=en-US&page=1';
    }
    if(media_type == 'tv'){
        url = 'https://api.themoviedb.org/3/tv/'+id+'/similar?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc&language=en-US&page=1';
    }
    let data = await axios({
        method: 'GET',
        url
    }).then(response => response.data.results).catch(error => error);
    let response  = getSimilar(data, media_type);
    res.send(response).end();
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});

module.exports = app;