import http from 'k6/http';
import {Rate} from 'k6/metrics';

export const options = {
  vus: 10,
  duration: '20s',
}

const myRate = new Rate("called_products");

export default function() {
  let numberRandom = Math.floor(Math.random() * 300) + 1;

  const request = http.get(`https://api.escuelajs.co/api/v1/products/${numberRandom}`);
  if (request.status === 400 || request.status === 404) {
    myRate.add(0);
  } else {
    myRate.add(1);
  }
}