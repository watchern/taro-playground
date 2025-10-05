module.exports = {
  "customSyntax": "postcss-scss", // 全局指定 SCSS 语法解析器
  extends: [
    // 支持 SCSS 的标准配置
    "stylelint-config-standard-scss"
  ],
  rules: {
    // 自定义规则
    "color-no-invalid-hex": true,
    // 禁用特定规则（示例）
    "scss/dollar-variable-pattern": "^_?[a-z]+[a-z0-9-]*$"
  }
};
