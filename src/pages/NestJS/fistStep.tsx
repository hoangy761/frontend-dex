import React, { useEffect } from 'react';
import axios from 'axios';
const FistStep = () => {
  async function getHelloWorld() {
    const res = await axios.get('http://localhost:3000/cats');
    console.log('res: ', res);
  }
  useEffect(() => {
    getHelloWorld();
  }, []);
  return <div>hihihihi</div>;
};
export default FistStep;
