export const Quoter = [
  {
    type: 'function',
    name: 'quote',
    inputs: [
      {
        name: 'params',
        type: 'tuple',
        internalType: 'struct UniswapV3Quoter.QuoteParams',
        components: [
          { name: 'pool', type: 'address', internalType: 'address' },
          {
            name: 'amountIn',
            type: 'uint256',
            internalType: 'uint256',
          },
          { name: 'zeroForOne', type: 'bool', internalType: 'bool' },
        ],
      },
    ],
    outputs: [
      { name: 'amountOut', type: 'uint256', internalType: 'uint256' },
      {
        name: 'sqrtPriceX96After',
        type: 'uint160',
        internalType: 'uint160',
      },
      { name: 'tickAfter', type: 'int24', internalType: 'int24' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'uniswapV3SwapCallback',
    inputs: [
      { name: 'amount0Delta', type: 'int256', internalType: 'int256' },
      { name: 'amount1Delta', type: 'int256', internalType: 'int256' },
      { name: 'data', type: 'bytes', internalType: 'bytes' },
    ],
    outputs: [],
    stateMutability: 'view',
  },
];
