# ugle-index



## Installation

```bash
npm install ugle-index
```


## Configuration

In your Express app, include the following:

```javascript
const ugle_index = require('ugle-index')

ugle_index.express()
```

When you start your Express app, you'll now have access to the following route

```
/ugle-index/script.js
```

If you would like to use a different route, ugle-index includes a route function that can be used as follows:

```javascript
const ugle_index = require('ugle-index')

ugle_index.route('/my/custom/public/dir')

ugle_index.express()
```

Which would grant access to the same script file at the following path

```
/my/custom/public/dir/script.js
```

## Usage

In your html, import the script at the top of the file

```html
<script src="/ugle-index/script.js"></script>
```

This will load the `ugle_index` object with several useful functions

## Support
Reach out to uglesoft at `uglesoft@gmail.com`

## Authors and acknowledgment
Christian J Kesler, Uglesoft Openware &copy;