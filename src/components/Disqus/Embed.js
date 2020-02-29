import React from 'react';
import PropTypes from 'prop-types';

import { DiscussionEmbed } from 'disqus-react';

import Disqus from './Disqus';

const Embed = ({identifier, title, slug }) => {
  return (
    <details open>
      <summary>Comments</summary>
      <Disqus
        identifier={identifier}
        title={title}
        slug={slug}
        Component={DiscussionEmbed}
      />
    </details>
  );
}

Embed.propTypes = {
  identifier: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
}

export default Embed;
