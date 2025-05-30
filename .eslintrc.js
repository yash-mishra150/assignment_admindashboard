module.exports = {
  extends: [
    'next/core-web-vitals',
    // Other extends...
  ],
  rules: {
    // Disable rules that might be causing problems
    "@typescript-eslint/no-empty-interface": "warn",
    "@typescript-eslint/no-unused-vars": ["error", { 
      "argsIgnorePattern": "^_",
      "varsIgnorePattern": "^_"
    }],
    // Add other rule customizations as needed
  }
}
