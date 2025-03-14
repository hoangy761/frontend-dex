export const Manager = [
  {
    type: 'function',
    name: 'mint',
    inputs: [
      {
        name: 'poolAddress_',
        type: 'address',
        internalType: 'address',
      },
      { name: 'lowerTick', type: 'int24', internalType: 'int24' },
      { name: 'upperTick', type: 'int24', internalType: 'int24' },
      { name: 'liquidity', type: 'uint128', internalType: 'uint128' },
      { name: 'data', type: 'bytes', internalType: 'bytes' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'swap',
    inputs: [
      {
        name: 'poolAddress_',
        type: 'address',
        internalType: 'address',
      },
      { name: 'data', type: 'bytes', internalType: 'bytes' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'uniswapV3MintCallback',
    inputs: [
      { name: 'amount0', type: 'uint256', internalType: 'uint256' },
      { name: 'amount1', type: 'uint256', internalType: 'uint256' },
      { name: 'data', type: 'bytes', internalType: 'bytes' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'uniswapV3SwapCallback',
    inputs: [
      { name: 'amount0', type: 'int256', internalType: 'int256' },
      { name: 'amount1', type: 'int256', internalType: 'int256' },
      { name: 'data', type: 'bytes', internalType: 'bytes' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
];
