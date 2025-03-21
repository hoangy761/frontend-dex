/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Box from '~/components/Box';
import PageTitle from '~/components/PageTitle/PageTitle';

const Home = () => {
  return (
    <div className="">
      <PageTitle title="LayerC | Home" />

      <div className="bg-red-500">
        <Box>Hello world 1</Box>
        <Box>Hello world 2</Box>
        <Box>Hello world 3</Box>
      </div>
      <div className="bg-green-400 flex w-fit">
        <Box>Hello world 1</Box>
        <Box>Hello world 2</Box>
        <Box>Hello world 3</Box>
      </div>
      <div className="bg-green-400 flex w-fit">
        <div className="m-0">
          <Box>Hello world 1</Box>
          <Box>Hello world 2</Box>
          <Box>Hello world 3</Box>
        </div>
        <div className="m-0">
          <Box>Hello world 4</Box>
          <Box>Hello world 5</Box>
          <Box>Hello world 6</Box>
        </div>
      </div>
    </div>
  );
};

export default Home;
