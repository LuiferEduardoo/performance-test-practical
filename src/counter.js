import http from 'k6/http';
import {Counter} from 'k6/metrics';

export const options = {
  vus: 10,
  duration: '20s',
}

const productsCounter = new Counter("called_products");
export default function() {
  let response = http.get("https://api.escuelajs.co/api/v1/products");
  productsCounter.add(1);
}