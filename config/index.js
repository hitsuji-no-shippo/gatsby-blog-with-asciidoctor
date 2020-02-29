const author = {
  name: 'hitsuji no shippo',
  email: 'xxx@yyy.zzz',
  url: 'pages/about',
  twitter: 'hns_equal_st',
}

const site = {
  pathPrefix: '/',
  title: 'Gatsby Starter Blog',
  description: 'A starter blog with asciidoctor.',
  // demo site url
  siteUrl: 'https://gatsby-blog-with-asciidoctor-demo.netlify.com',
  social : {
    twitter: author.twitter,
  },
  disqusShortName: 'gatsby-blog',
  googleTrackingId: '',
  lang: 'en',
  displayTranslations: true,
};

const supportedLanguages = {
  en: 'English',
  ja: '日本語',
};

const repository = {
  url: 'https://github.com/hitsuji-no-shippo/gatsby-blog-with-asciidoctor',
  name: 'gatsby-blog-with-asciidoctor',
  displaysLink: true,
}

const articles = {
  filePath: { Asciidoc: 'paths.from.source.full' },
  ignore: ['asciidoctor-examples/**/*.adoc'],
};

const linksInBio = {
  twitter: `https://twitter.com/${author.twitter}`,
  GitHub: 'https://github.com/hitsuji-no-shippo',
}

const dateDisplay = {
  format: "LL",
  diff: {
    patternWithNotConvert: /month|year/,
    newPost: {
      boundary: 7,
      emoji: '🎉',
    },
  },
};

const navigatationBar = {
  about: 'pages/about',
  policy: 'pages/policy',
  contact: 'https://twitter.com/hns_equal_st',
};

module.exports = {
  author,
  site,
  supportedLanguages,
  repository,
  articles,
  linksInBio,
  dateDisplay,
  navigatationBar,
};
