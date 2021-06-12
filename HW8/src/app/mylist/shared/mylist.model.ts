export interface MylistModel {
  title: string;
  id: number;
  poster_path: string;
  media_type: string;
}

// tslint:disable-next-line:no-shadowed-variable
export interface LocalStorageMylistModel<MylistModel> {
  [Key: string]: MylistModel;
}
