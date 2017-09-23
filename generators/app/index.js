const Generator = require('yeoman-generator');
const yosay = require('yosay');
const camel = require('camelcase');
const humanize = require('humanize-url');
const questions = require('./questions');

class Tssls extends Generator {

  constructor(...args) {
    super(...args);
    this.log(yosay('Tssls: A typescript generator for the serverless framework.'));
  }

  async prompting() {
    const answers = await this.prompt(questions);
    this.context = {
      moduleName: answers.moduleName,
      moduleDesc: answers.moduleDesc,
      camelModuleName: camel(answers.moduleName),
      moduleKeywords: answers.moduleKeywords.trim().split(',').map(s => (s || '').trim()),
      githubUsername: answers.githubUsername,
      name: this.user.git.name(),
      email: this.user.git.email(),
      website: answers.website,
      humanizedWebsite: humanize(answers.website)
    };
  }

  _copyFile(src, dest) {
    this.fs.copyTpl(
      this.templatePath(src),
      this.destinationPath(dest || src),
      this.context
    );
  }

  writing() {
    this._copyFile('editorconfig', '.editorconfig');
    this._copyFile('gitignore', '.gitignore');
    this._copyFile('package.json');
    this._copyFile('readme.md');
    this._copyFile('serverless.yml');
    this._copyFile('tsconfig.json');
    this._copyFile('tslint.json');
    this._copyFile('src/custom-typings.d.ts', 'src/custom-typings.d.ts');
    this._copyFile('src/handler.ts', 'src/handler.ts');
    this._copyFile('src/logger.ts', 'src/logger.ts');
    this._copyFile('src/test/handler.test.ts', 'src/test/handler.test.ts');
  }

  install() {
    this.npmInstall([
      '@types/aws-lambda',
      '@types/node',
      'typescript',
      'jest',
      'ts-jest'
    ], { 'save-dev': true });
    this.npmInstall([
      '@episodehunter/datastore',
      '@episodehunter/logger',
      'aws-sdk',
      'node-fetch',
      'assert-env'
    ], { 'save': true });
  }

  end() {
    this.spawnCommandSync('git', ['init']);
    this.spawnCommandSync('git', ['add', '--all']);
    this.spawnCommandSync('git', ['commit', '-m', ':tada:']);
    this.spawnCommandSync('gitmoji-commit-hook', ['--init']);
  }

}


module.exports = Tssls;
