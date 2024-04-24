export class FindManyMovieDto {}

export enum OrderByFindMany {
  releaseDate = 'releaseDate',
  rating = 'rating',
  title = 'title',
}

export enum OrderMethodFindMany {
  asc = 'asc',
  desc = 'desc',
}
