import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import { useLang } from 'context/LanguageContext';

const SmartLink = ({href, isAuthorLink, children}) => {
  const { homeLink } = useLang();

  if (typeof href !== 'string') {
    return children;
  }

  const isExternal = /^http/.test(href);
  const relationship = (() => {
    if (isExternal) {
      const str = 'external noopener noreferrer';

      return isAuthorLink ? `${str} author` : str;
    }

    return isAuthorLink ? 'author' : '';
  })();

  /* eslint-disable react/jsx-no-target-blank */
  return isExternal
    ? <a href={href} target="_blank" rel={relationship}>{children}</a>
    : <Link to={homeLink + href} rel={relationship}>{children}</Link>;
  /* eslint-enable react/jsx-no-target-blank */
}

SmartLink.propTypes = {
  href: PropTypes.string.isRequired,
  isAuthorLink: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default SmartLink;
