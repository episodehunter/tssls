const path = require('path');
const normalize = require('normalize-url');
const slug = require('slug');

module.exports = [{
  name: 'githubUsername',
  message: 'What is your GitHub user name?',
  validate: value => value.length > 0 ? true : 'github needed'
}, {
  name: 'moduleKeywords',
  message: 'Keywords?',
  default: 'serverless'
}, {
  name: 'website',
  message: 'What is your website URL?',
  filter: s => normalize(s),
  default: props => 'http://github.com/' + props.githubUsername
}, {
  name: 'moduleName',
  message: 'What is the module name?',
  filter: (s) => slug(s),
  default: path.basename(process.cwd()).replace(/\s/g, '-')
}, {
  name: 'moduleDesc',
  message: 'What is the module description?',
  default: props => props.name
}];