import { ERC20, Manager, Pool, Quoter } from '~/abi';

export const config_token = {
  token0Address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  token1Address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  poolAddress: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
  managerAddress: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
  quoterAddress: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
  ABIs: {
    ERC20: ERC20,
    Pool: Pool,
    Manager: Manager,
    Quoter: Quoter,
  },
};
