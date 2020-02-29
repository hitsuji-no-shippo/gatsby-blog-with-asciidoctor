import React from 'react';
import PropTypes from 'prop-types';

const LinkTexts = ({infos, Link})  => {
  if (Object.prototype.toString.call(infos) !== '[object Object]') {
    return null;
  }

  return Object.entries(infos).map(([displayText, href]) => {
    return <Link key={displayText} href={href} text={displayText} />
  })
}

LinkTexts.propTypes = {
  infos: PropTypes.objectOf(PropTypes.string).isRequired,
  Link: PropTypes.elementType.isRequired,
};

export default LinkTexts;
