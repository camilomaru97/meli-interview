export interface Product {
  title:       string;
  image:       string;
  description: string;
  detail:      Detail;
  id:          string;
}

export interface Detail {
  info:    string;
  price:   string;
  address: string;
}
