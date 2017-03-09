module.exports ={
  "entry": "/Users/jason/Sites/jpme/src/app.tsx",
  "output": {
    "path": "/Users/jason/Sites/jpme/dist",
    "filename": "bundle.js"
  },
  "resolve": {
    "extensions": [
      ".js",
      ".ts",
      ".tsx"
    ],
    "unsafeCache": true,
    "modules": [
      "node_modules"
    ],
    "aliasFields": [],
    "mainFields": [
      "module",
      "main"
    ]
  },
  "module": {
    "rules": [
      {
        "enforce": "pre",
        "test": {},
        "use": "eslint-loader"
      },
      {
        "test": {},
        "use": "ts-loader"
      },
      {
        "test": {},
        "use": "ts-loader"
      },
      {
        "test": {},
        "use": [
          "css-loader?modules"
        ]
      }
    ],
    "unknownContextRequest": ".",
    "unknownContextRegExp": false,
    "unknownContextRecursive": true,
    "unknownContextCritical": true,
    "exprContextRequest": ".",
    "exprContextRegExp": false,
    "exprContextRecursive": true,
    "exprContextCritical": true,
    "wrappedContextRegExp": {},
    "wrappedContextRecursive": true,
    "wrappedContextCritical": false,
    "unsafeCache": true
  }
}