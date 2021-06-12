export interface DetailsModel {
  site: string;
  type: string;
  name: string;
  key: string;
  title: string;
  genres: any[];
  languages: any[];
  release_date: string;
  overview: string;
  vote: number;
  tagline: string;
  runtime: number;
  poster_path: string;
  id: number;
}

export interface CastModel{
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export interface FullCastModel{
  id: number;
  dob: string;
  gender: string;
  name: string;
  page: string;
  knownas: any[];
  talent: string;
  bio: string;
  place: string;
  imdb: string;
  fb: string;
  insta: string;
  twitter: string;
}
export interface ReviewsModel{
  author: string,
  content: string,
  created:string,
  url:string,
  profile_path:string,
  rating:number,
  id: string
}

