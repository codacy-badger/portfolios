/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src/'),
          '@components': path.resolve(__dirname, 'src/components'),
          '@styles': path.resolve(__dirname, 'src/styles'),
          '@pages': path.resolve(__dirname, 'src/pages'),
          '@hooks': path.resolve(__dirname, 'src/hooks'),
          '@context': path.resolve(__dirname, 'src/context'),
          '@types': path.resolve(__dirname, 'src/@types'),
          '@templates': path.resolve(__dirname, 'src/templates'),
          '@fonts': path.resolve(__dirname, 'src/fonts'),
          '@utils': path.resolve(__dirname, 'src/utils'),
        }
      }
    })
  }