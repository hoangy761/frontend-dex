/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react';
import Button from '~/components/Button';
import PageTitle from '~/components/PageTitle/PageTitle';
import { useWalletProvider } from '~/hooks/Wallet/useWalletProvider';

const Swap = () => {
  const [vote, setVote] = useState<string>('0');
  const [idDisableButton, setIsDisableButton] = useState<boolean>(true);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDisableButton(true);
    if (e.target.value === '') {
      setVote('');
    }
    console.log('value', isNaN(Number(e.target.value)));
    if (isNaN(Number(e.target.value))) return;
    if (Number(e.target.value) > 0) {
      setVote(e.target.value);
      setIsDisableButton(false);
    }
  };
  const handleVote = async () => {
    if (isNaN(Number(vote)) || Number(vote) <= 0) return;
    const formData = new FormData();
    formData.append('action', 'it_epoll_vote');
    formData.append('wp_nonce', '16d284610b');
    formData.append('option_id', '12511522542604');
    formData.append('fingerprint', '');
    formData.append('poll_id', '12551');

    const res = await axios.post('http://longdragon.lanihoian.io.vn/wp-admin/admin-ajax.php', formData);
    console.log(res);
  };

  return (
    <div>
      <PageTitle title="LayerC | Swap" />
      <div className="text-center flex justify-center">
        <div className="space-y-4  bg-slate-500 p-4">
          <p>Muốn vote mấy vote</p>
          <input type="text" className="bg-white text-black" onChange={handleInput} value={vote} />
          <Button white disable={idDisableButton} onClick={handleVote}>
            Bắt đầu vote
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Swap;
