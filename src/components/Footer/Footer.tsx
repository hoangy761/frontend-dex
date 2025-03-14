import React from 'react';
import Button from '../Button';
import { DiscordIcon, GoogleDocIcon, NewTwitterIcon, TelegramIcon } from 'hugeicons-react';

const Footer = () => {
  return (
    <div className=" bg-black w-auto m-1 rounded-t-md">
      <div className="border border-white-1 container mx-auto"></div>
      <div className=" container mx-auto flex justify-between py-10 items-center">
        <ul className=" md:space-x-4 md:flex sm:grid grid-cols-4">
          <li>
            <Button text className="underline" to="#" icon={<NewTwitterIcon />}>
              X.com
            </Button>
          </li>
          <li>
            <Button text className="underline" to="#" icon={<DiscordIcon />}>
              Discord
            </Button>
          </li>
          <li>
            <Button text className="underline" to="#" icon={<TelegramIcon />}>
              Telegram
            </Button>
          </li>
          <li>
            <Button
              text
              className="underline"
              target="_href"
              href="https://yizy.gitbook.io/layercompound"
              icon={<GoogleDocIcon />}
            >
              Docs
            </Button>
          </li>
        </ul>
        <Button className="text-2xl underline" to="/">
          LayerCompound
        </Button>
      </div>
    </div>
  );
};

export default Footer;
