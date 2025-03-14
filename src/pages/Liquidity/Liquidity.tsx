/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AbiCoder, Contract, parseEther, parseUnits } from 'ethers';

import React, { useEffect } from 'react';
import Button from '~/components/Button';
import PageTitle from '~/components/PageTitle/PageTitle';
import { config_token } from '~/config';
import { useWalletProvider } from '~/hooks/Wallet/useWalletProvider';
import useDebounce from '~/hooks/useDebounce';

interface Liquidity {
  account: string | null;
  token0: Contract | null;
  token1: Contract | null;
  manager: Contract | null;
  managerAddress: string | null;
  poolAddress: string | null;
}
interface Swap {
  amountIn: string;
  account: string;
  tokenIn: Contract;
  token0: Contract;
  token1: Contract;
  manager: Contract;
  managerAddress: string;
  poolAddress: string;
}

function Liquidity() {
  const { provider, signer, selectedAccount } = useWalletProvider();
  const [token0, setToken0] = React.useState<Contract | null>(null);
  const [token1, setToken1] = React.useState<Contract | null>(null);
  const [manager, setManager] = React.useState<Contract | null>(null);
  const [quoter, setQuoter] = React.useState<Contract | null>(null);

  const [amountIn, setAmountIn] = React.useState<number>(0);
  const [amountOut, setAmountOut] = React.useState<number>(0);

  useEffect(() => {
    if (provider && signer) {
      setToken0(new Contract(config_token.token0Address, config_token.ABIs.ERC20, signer));
      setToken1(new Contract(config_token.token1Address, config_token.ABIs.ERC20, signer));
      setManager(new Contract(config_token.managerAddress, config_token.ABIs.Manager, signer));
      setQuoter(new Contract(config_token.quoterAddress, config_token.ABIs.Quoter, signer));
    }
  }, [provider, signer]);

  const _addLiquidity = async ({ account, token0, token1, manager, managerAddress, poolAddress }: Liquidity) => {
    if (!token0 || !token1) return;
    const amount0 = parseEther('0.998976618347425280');
    const amount1 = parseEther('5000'); // 5000 USDC
    const lowerTick = 84222;
    const upperTick = 86129;
    const liquidity = BigInt('1517882343751509868544');
    const abiCoder = new AbiCoder();

    try {
      const _token0Address = await token0.getAddress();
      const _token1Address = await token1.getAddress();
      const extra = abiCoder.encode(['address', 'address', 'address'], [_token0Address, _token1Address, account]);

      /**     Not working
       *      token0.allowance(account, managerAddress),
       *      token1.allowance(account, managerAddress),
       */
      // const [allowance0, allowance1] = await Promise.all([
      //   token0.allowance(account, managerAddress),
      //   token1.allowance(account, managerAddress),
      // ]);

      //         if (allowance0.lt(amount0)) {
      //           return token0.approve(managerAddress, amount0).then((tx) => tx.wait());
      //         }

      //         if (allowance1.lt(amount1)) {
      //           return token1.approve(managerAddress, amount1).then((tx) => tx.wait());
      //         }

      //if (manager)
      //           return manager.mint(poolAddress, lowerTick, upperTick, liquidity, extra).then((tx) => tx.wait());

      const tx0 = await token0.approve(managerAddress, amount0);
      tx0.wait();

      const tx1 = await token1.approve(managerAddress, amount1);
      tx1.wait();
      if (manager) {
        const txFinal = await manager.mint(poolAddress, lowerTick, upperTick, liquidity, extra);
        txFinal.wait();
        console.log('addliquidity success', txFinal);
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  const _swap = ({ amountIn, account, tokenIn, manager, token0, token1, managerAddress, poolAddress }: Swap) => {
    const amountInWei = parseEther(amountIn);
    const abiCoder = new AbiCoder();
    const extra = abiCoder.encode(['address', 'address', 'address'], [token0.address, token1.address, account]);

    tokenIn
      .allowance(account, managerAddress)
      .then((allowance) => {
        if (allowance.lt(amountInWei)) {
          return tokenIn.approve(managerAddress, amountInWei).then((tx) => tx.wait());
        }
      })
      .then(() => {
        return manager.swap(poolAddress, extra).then((tx) => tx.wait());
      })
      .then(() => {
        alert('Swap succeeded!');
      })
      .catch((err) => {
        console.error(err);
        alert('Failed!');
      });
  };

  const addLiquidity = () => {
    if (!token0 || !token1 || !manager || !config_token.managerAddress || !config_token.poolAddress) return;
    _addLiquidity({
      account: selectedAccount,
      token0: token0,
      token1: token1,
      manager: manager,
      managerAddress: config_token.managerAddress,
      poolAddress: config_token.poolAddress,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('e.target.value', e.target.value);
    setAmountIn(Number(e.target.value));
    try {
      if (!isNaN(Number(e.target.value))) {
        setAmountIn(Number(e.target.value));
      } else {
        return;
      }
    } catch (error) {
      console.log('error', error);
      return;
    }
  };

  return (
    <div>
      <PageTitle title="Liquidity" />
      <div className="flex flex-col space-y-4 h-screen bg-slate-500 items-center justify-items-center">
        <div className="border border-spacing-0 p-4 space-y-4 my-10">
          <div className="flex justify-between">
            <label htmlFor="token0" className="block">
              Token 0
            </label>
            <input
              value={amountIn}
              className="text-black border border-red-300 mx-4"
              onChange={useDebounce(handleInputChange, 400)}
            ></input>
          </div>
          <div className="flex justify-between">
            <label htmlFor="token1" className="block">
              Token 1
            </label>
            <input id="token1" className="text-black border border-red-300 mx-4"></input>
          </div>
          <div className=" w-full flex justify-center">
            <Button white onClick={addLiquidity} className="">
              Add Liquidity
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Liquidity;
