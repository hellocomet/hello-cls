[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# CLS

A Node.js library that implements Continuation-Local Storage for Node 10+

## Install & Requirements

`npm i @comet/cls`  
or  
`yarn add @comet/cls`

## How to use

```javascript
const { namespace } = require('@comet/cls')

const context = namespace.initContext()

// I can set a value to a given key on the namespace
namespace.set('beer', 🍺)

// I can get a value from the namespace
console.log(namespace.get('beer'))
// -> 🍺

context.close()

// I can't get a value from the namespace if the context is closed
console.log(namespace.get('beer'))
// -> null
```
