module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        'indent': ['error', 4],
        'curly': ['off'],
        'space-before-function-paren': 0,
        'object-curly-spacing': 0,
        'no-extra-boolean-cast': 'off',
        'comma-dangle': 'off',
        // 'no-unused-vars': 0,
    }
}
