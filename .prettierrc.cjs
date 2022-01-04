const prettierConfigStandard = require('prettier-config-standard');

const modifiedConfig = {
  ...prettierConfigStandard,
  semi: true
}

module.exports = modifiedConfig