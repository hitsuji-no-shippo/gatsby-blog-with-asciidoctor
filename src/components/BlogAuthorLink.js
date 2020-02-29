import React from 'react';
import PropTypes from 'prop-types';

import { author } from 'config'
import SmartLink from 'components/SmartLink'

const BlogAuthorLink = ({children}) => {
  return <SmartLink href={author.url} isAuthorLink={true}>{children}</SmartLink>
}

BlogAuthorLink.propTypes = {
  children: PropTypes.oneOfType(
    [PropTypes.string, PropTypes.element]
  ).isRequired,
};

export default BlogAuthorLink;
