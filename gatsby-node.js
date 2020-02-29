/* eslint-disable no-console */
const path = require(`path`);
const R = require('ramda');
const { haveSameItem, getPreviousNextNode, kebabCase } = require('./src/utils/helpers');
const getBaseUrl = require('./src/utils/getBaseUrl');
const {
  site: { lang: defaultLang = 'en', displayTranslations },
  supportedLanguages,
} = require('./config');

// group by language
const byLangKey = R.groupBy(R.path(['node', 'fields', 'langKey']));
// group by directoryName
const byDirectoryName = R.groupBy(R.path(['node', 'fields', 'directoryName']));

const translationsByDirectory = articles => {
  const gpDirArticles = byDirectoryName(articles);

  const dirNames = R.keys(gpDirArticles);

  const otherLangs = R.compose(
    R.map(R.map(R.path(['node', 'fields', 'langKey']))),
    R.values,
  )(gpDirArticles);

  return R.zipObj(dirNames, otherLangs);
};

/**
 * @param {*func} createPage
 */
function PageMaker(createPage) {
  const blogIndex = path.resolve('./src/templates/blog-index.js');
  const blogArticle = path.resolve('./src/templates/blog-article.js');
  const tagsTotal = path.resolve('./src/templates/tags.js');
  const tagPage = path.resolve('./src/templates/tag-page.js');

  return {
    createBlogIndex() {
      // Create index pages for all supported languages
      Object.keys(supportedLanguages).forEach(langKey => {
        const slug = getBaseUrl(defaultLang, langKey);

        createPage({
          path: slug,
          component: blogIndex,
          context: {
            langKey,
            slug,
          },
        });
      });
    },

    createBlogArticle(allArticles) {
      const translationsInfo = displayTranslations
        ? translationsByDirectory(allArticles)
        : [];

      const articlesDivideByType = allArticles.reduce((articles, article) => {
        articles[article.node.pageAttributes.page ? 0 : 1].push(article);

        return articles;
      }, [[], []]);

      articlesDivideByType.forEach(articles => articles.forEach(article => {
        // article in same language
        const articleLangKey = article.node.fields.langKey;
        const articlesInSameLang = articles.filter(({ node }) => articleLangKey === node.fields.langKey);
        const indexInSameLang = articlesInSameLang.findIndex(
          p => p.node.fields.slug === article.node.fields.slug,
        );
        const { previous, next } = getPreviousNextNode(articlesInSameLang, indexInSameLang);

        // article in same tags
        const articleTags = article.node.pageAttributes.tags;
        const articlesInSameTag = articles.filter(({ node }) =>
          haveSameItem(articleTags, node.pageAttributes.tags),
        );
        const indexInSameTag = articlesInSameTag.findIndex(
          p => p.node.fields.slug === article.node.fields.slug,
        );
        const { previous: previousInSameTag, next: nextInSameTag } = getPreviousNextNode(
          articlesInSameTag,
          indexInSameTag,
        );

        // translations
        let translationsLink = [];
        if (displayTranslations && R.path(['node', 'fields', 'directoryName'], article)) {
          const dirName = article.node.fields.directoryName;
          const translations = R.without([articleLangKey], translationsInfo[dirName]);

          translationsLink = translations.map(trans => ({
            name: supportedLanguages[trans],
            url: `/${trans}/${dirName}/`.replace(`/${defaultLang}`, ''),
            langKey: trans,
          }));
        }

        createPage({
          path: article.node.fields.slug,
          component: blogArticle,
          context: {
            slug: article.node.fields.slug,
            previous,
            next,
            previousInSameTag,
            nextInSameTag,
            translationsLink,
          },
        });
      }));
    },

    createTagIndex(articlesGroupByLang) {
      Object.keys(articlesGroupByLang).forEach(langKey => {
        // Make tags-total
        createPage({
          path: `${getBaseUrl(defaultLang, langKey)}tags/`,
          component: tagsTotal,
          context: {
            langKey,
          },
        });
      });
    },

    createTagPage(articlesGroupByLang) {
      Object.keys(articlesGroupByLang).forEach(langKey => {
        // Tag pages:
        let tags = [];
        articlesGroupByLang[langKey].forEach(article => {
          if (R.path(['node', 'pageAttributes', 'tags'], article)) {
            tags = tags.concat(article.node.pageAttributes.tags);
          }
        });
        // Eliminate duplicate tags
        tags = R.uniq(tags);

        // Make tag pages
        tags.forEach(tag => {
          const slug = `${getBaseUrl(defaultLang, langKey)}tags/${kebabCase(tag)}/`;

          createPage({
            path: slug,
            component: tagPage,
            context: {
              tag,
              langKey,
              slug,
            },
          });
        });
      });
    },
  };
}

exports.createPages = ({ graphql, actions: { createPage } }) => {
  const pageMaker = PageMaker(createPage);

  return new Promise((resolve, reject) => {
    pageMaker.createBlogIndex();

    resolve(
      graphql(
        `
          {
            allAsciidoc(sort: { fields: [revision___date], order: DESC }, limit: 1000) {
              edges {
                node {
                  fields {
                    slug
                    langKey
                    directoryName
                  }
                  document {
                    title
                  }
                  revision {
                    date
                  }
                  pageAttributes {
                    tags
                    page
                  }
                }
              }
            }
          }
        `,
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const article = result.data.allAsciidoc.edges;
        const gpLangArticles = byLangKey(article);

        pageMaker.createBlogArticle(article);
        pageMaker.createTagIndex(gpLangArticles);
        pageMaker.createTagPage(gpLangArticles);

        return null;
      }),
    );
  });
};

exports.onCreateNode = ({ node, actions }) => {
  if (R.path(['internal', 'type'], node) === 'Asciidoc') {
    actions.createNodeField({
      node,
      name: 'directoryName',
      value: node.paths.from.source.file.slice(
        0, node.paths.from.source.file.lastIndexOf(`/`)
      )
    });
  }
};
