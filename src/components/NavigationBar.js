import React from 'react';

import { navigatationBar } from 'config';
import LinkTexts from 'components/LinkTexts';
import SmartLink from 'components/SmartLink';


const NavigationBar = () => {
  return (
    Object.prototype.toString.call(navigatationBar) === '[object Object]' &&
    Object.keys(navigatationBar).length !== 0
  )
    ? (
        <h2
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            margin: 'auto',
          }}
        >
          <LinkTexts
            infos={navigatationBar}
            Link={({href, text}) =>
              <SmartLink href={href} isAuthorLink={false}>{text}</SmartLink>
            }
          />
        </h2>
       )
    : null;
};

export default NavigationBar;
