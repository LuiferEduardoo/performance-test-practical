import http from 'k6/http';
import { Trend } from 'k6/metrics';

export const options = {
  vus: 10,
  duration: '20s',
}

const myTrend = new Trend("duration_time")
const mySecondTrend = new Trend("category_duration_time");

export default function() {
  let response = http.get("https://api.escuelajs.co/api/v1/users");

  myTrend.add(response.timings.duration);

  const categories = http.get("https://api.escuelajs.co/api/v1/categories");
  mySecondTrend.add(categories.timings.duration);
}