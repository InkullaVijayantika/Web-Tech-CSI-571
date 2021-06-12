import requests as http
from datetime import date
from flask import Flask, request, jsonify
from flask import render_template

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
API_KEY = 'a9f2cb016a20f09e5aa2d3f6d2a7b2cc'


@app.route('/', methods=['GET'])
def main():
    # return render_template('index.html', results = res, answers = ans)
    return app.send_static_file('index.html');

@app.route('/search/', methods=['GET'])
def search():
    query, cat = request.args.get('query'), request.args.get('category')
    q = query.replace(" ", "%20")
    print(q)
    print(cat)
    return output_data(q, cat)

def output_data(query, cat):
    resp = http.get('https://api.themoviedb.org/3/search/'+cat+'?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc&language=en-US&query='+query+'&page=1&include_adult=false')
    print('https://api.themoviedb.org/3/search/'+cat+'?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc&language=en-US&query='+query+'&page=1&include_adult=false')
    print(resp.json())
    return resp.json()

@app.route('/genre/', methods=['GET'])
def find_genre():
    cat = request.args.get('category')
    print(cat)
    resp1 = http.get('https://api.themoviedb.org/3/genre/movie/list?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc&language=en-US')
    data1 = resp1.json()
    res1 = data1['genres']
    resp2 = http.get('https://api.themoviedb.org/3/genre/tv/list?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc&language=en-US')
    data2 = resp2.json()
    res2 = data2['genres']
    dict = {}
    for x in range(len(res1)):
        dict[res1[x]['id']] = res1[x]['name']
    for x in range(len(res2)):
        dict[res2[x]['id']] = res2[x]['name']

    return dict

@app.route('/details/', methods=['GET'])
def get_details():
    id = request.args.get('id')
    cat = request.args.get('category')
    resp = http.get('https://api.themoviedb.org/3/'+cat+'/'+id+'?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc&language=en-US');
    return resp.json()

@app.route('/credits/', methods=['GET'])
def get_credits():
    id = request.args.get('id')
    cat = request.args.get('category')
    resp = http.get('https://api.themoviedb.org/3/'+cat+'/'+id+'/credits?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc&language=en-US')
    return resp.json()

@app.route('/reviews/', methods=['GET'])
def get_reviews():
    id = request.args.get('id')
    cat = request.args.get('category')
    resp = http.get('https://api.themoviedb.org/3/'+cat+'/'+id+'/reviews?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc&language=en-US&page=1');
    print(resp.json())
    return resp.json()

@app.route('/trendingmovies/', methods=['GET'])
def get_trend_movies():
    resp = http.get('https://api.themoviedb.org/3/trending/movie/week?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc')
    # data = resp.json()
    return resp.json()

@app.route('/trendingtv/', methods=['GET'])
def get_trend_tv():
    resp = http.get('https://api.themoviedb.org/3/tv/airing_today?api_key=a9f2cb016a20f09e5aa2d3f6d2a7b2cc')
    return resp.json()



if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True)
