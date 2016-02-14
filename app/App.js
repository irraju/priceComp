import React from 'react';
import ReactDOM from 'react-dom';
import Price from './components/Price';

var data = {
	perHour:"3.5"
};

ReactDOM.render(
  <Price perHour={3.51} unitPerHour="€" perMonth={120} unitPerMonth="$"/>,
  document.getElementById('app')
)