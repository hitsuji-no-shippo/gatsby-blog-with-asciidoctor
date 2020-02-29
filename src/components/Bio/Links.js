import React from 'react';
import PropTypes from 'prop-types';

import { linksInBio } from 'config';
import LinkTexts from '../LinkTexts';

const Links = ()  => {
  const Link = ({href, text}) => {
    return (
      <a href={href}
        target="_blank"
        rel="author external noopener noreferrer">
        {text}
      </a>
    );
  };
  Link.propTypes = {
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          margin: 'auto',
        }}
      >
        <LinkTexts infos={linksInBio} Link={Link} />
      </div>
      <div style={{ float: 'right' }}>
        <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
          rss
        </a>
      </div>
    </>
  );
}

export default Links;
