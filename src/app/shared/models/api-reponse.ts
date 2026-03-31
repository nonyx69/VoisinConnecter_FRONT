export interface ApiReponse<Table> {
  status: string;
  mesage: string;
  results: Table;
}
