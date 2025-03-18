import { DiscordIcon, GoogleDocIcon, NewTwitterIcon, TelegramIcon } from 'hugeicons-react';
import React from 'react';
import Button from '~/components/Button';
function Footer() {
  return (
    <ul className="flex justify-between">
      <li>
        <Button text className="underline" to="#" icon={<NewTwitterIcon />}></Button>
      </li>
      <li>
        <Button text className="underline" to="#" icon={<DiscordIcon />}></Button>
      </li>
      <li>
        <Button text className="underline" to="#" icon={<TelegramIcon />}></Button>
      </li>
      <li>
        <Button
          text
          className="underline"
          target="_href"
          href="https://yizy.gitbook.io/layercompound"
          icon={<GoogleDocIcon />}
        ></Button>
      </li>
    </ul>
  );
}

export default Footer;
