/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import getData from '../../helperFunctions/getData.js';

export default function Questions(props) {
  const urlAddOn = 'products/13023';
  const [product, setProduct] = useState('');

  useEffect(() => {
    getData(urlAddOn, (err, res) => {
      if (err) {
        console.log('err', err);
      } else {
        console.log('res', res);
        setProduct(res.data);
      }
    });
  }, []);

  return (
    <>
      <h3>Hello World</h3>
      {product
        && <div>{product.id}</div>}
    </>
  );
}
