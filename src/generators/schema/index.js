const VulcanGenerator = require('../../lib/VulcanGenerator');

module.exports = class extends VulcanGenerator {
  initializing () {
    this._assert('isVulcan');
    this._assert('hasNonZeroPackages');
  }

  _registerArguments () {
    this._registerOptions(
      'packageName',
      'moduleName'
    );
  }

  prompting () {
    if (!this._canPrompt()) { return false; }
    const questions = this._getQuestions(
      'packageNameWithNumModulesList',
      'moduleNameList',
      // 'isAddCustomSchemaProperty'
    );
    return this.prompt(questions)
    .then((answers) => {
      this.props = {
        packageName: this._finalize('packageName', answers),
        moduleName: this._finalize('moduleName', answers),
        // isAddCustomSchemaProperty: this._finalize('raw', 'isAddCustomSchemaProperty', answers),
        customSchemaProperties: [],
      };
      // if (this.props.isAddCustomSchemaProperty) {
      //   return this._askCustomSchemaQuestion();
      // }
    });
  }

  _askCustomSchemaQuestion (callback) {
    const customSchemaPropertyQuestions = this._getQuestions(
      'schemaPropertyName',
      'isSchemaPropertyHidden',
      'schemaPropertyLabel',
      'schemaPropertyType',
      'isSchemaPropertyOptional',
      'schemaPropertyViewableBy',
      'schemaPropertyInsertableBy',
      'schemaPropertyEditableBy',
      'isAddAnotherCustomSchemaProperty'
    );
    const customSchemaProperties = [];
    this.prompt(customSchemaPropertyQuestions).then((answers) => {
      this.props.customSchemaProperties.push({
        name: 'kerem',
        value: 'kazan',
      });
      if (answers.isAddAnotherCustomSchemaProperty) {
        this._askCustomSchemaQuestion(() => {
          // callback();
        });
      } else {
        // callback();
      }
    });
  }

  _writeSchema () {
    this.fs.copyTpl(
      this.templatePath('schema.js'),
      this._getPath(
        { isAbsolute: true },
        'module',
        'schema.js'
      ),
      this.props
    );
  }

  _writeTestSchema () {
    const testFragmentsProps = {
      ...this.props,
      subjectName: 'schema',
      subjectPath: '../schema',
    };
    this.fs.copyTpl(
      this.templatePath('test.js'),
      this._getPath(
        { isAbsolute: true },
        'moduleTest',
        'schema.js'
      ),
      testFragmentsProps
    );
  }

  writing () {
    if (!this._canWrite()) { return; }
    this._writeSchema();
    this._writeTestSchema();
  }

  end () {
    this._end();
  }
};