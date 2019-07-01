module.exports = {
  env: {
    "node": true
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "project": "./functions/tsconfig.json",
    "tsconfigRootDir": "."
  },
  plugins: [
    "@typescript-eslint",
  ],
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/prefer-interface": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    // "@typescript-eslint/no-use-before-define": "warn",
    // "@typescript-eslint/array-type": "off",
    // "@typescript-eslint/interface-name-prefix": "warn"
  }
}
