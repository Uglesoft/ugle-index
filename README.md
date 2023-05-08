# ugle-index

A front end utility for paginating and filtering

![ugle-index icon](https://raw.githubusercontent.com/Uglesoft/ugle-index/main/ICON.png)


## Installation

```bash
npm install ugle-index
```


## Configuration

### Express

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

### Manual

You can also take the file located at `ugle-index/src/public/script.js` and copy it to your public directory, or use the contents of that file in some other manner.

## Usage

In your html, import the script at the top of the file

```html
<script src="/ugle-index/script.js"></script>
```

This will load the `ugle_index` object with several useful functions, the first of which initializes the necessary variables for the script with your custom settings.

```javascript
// filterId: the id of the input element where the user types their filter parameter
// parentId: the parent of the elements that you want paginated
// pageSize: the number of elements to display on each page
// addressId: the element to contain text info about the page aka address
// targetClass: the class of the element to actually compare for the filter parameter
ugle_index.indexInit(filterId, parentId, pageSize, addressId, targetClass)
```

The other functions are self explanatory and require no arguments
```javascript
ugle_index.resetFilter()
ugle_index.paginationBegin()
ugle_index.paginationEnd()
ugle_index.paginationNext()
ugle_index.paginationPrev()
```

You can incorporate this into your HTML content like so

```html
<div>
    <input type="text" id="content_filter" onkeyup="ugle_index.paginationBegin()">
    <button type="button" onclick="ugle_index.resetFilter()">

    <div id="content_parent">
        <div id="content1">
            <span class="ugle_index_filter">apples</span>
            <span>some other content here</span>
        </div>
        <div id="content2">
            <span class="ugle_index_filter">oranges</span>
            <span>some other content here</span>
        </div>
        <div id="content3">
            <span class="ugle_index_filter">pears</span>
            <span>some other content here</span>
        </div>
    </div>
    <div>
        <button onclick="ugle_index.paginationBegin()">Begin</button>
        <button onclick="ugle_index.paginationPrev()">Previous</button>
        <div id="content_address"></div>
        <button onclick="ugle_index.paginationNext()">Next</button>
        <button onclick="ugle_index.paginationEnd()">End</button>
    </div>
</div>

<script src="/ugle-index/script.js"></script>
<script>
    ugle_index.indexInit('content_filter', 'content_parent', 2, 'content_address', 'ugle_index_filter')
</script>
```

ugle-index will traverse down until it finds the element with the given class and ignore all content outside of that element, that way you can allow the users to only query the data that is relevant.

## Support

Reach out to uglesoft at `uglesoft@gmail.com`

## Author(s)

Christian J Kesler, Uglesoft Openware &copy;
 
### Acknowledgements

As always, I have ChatGPT to thank for helping me walk through my thought process and teach me new things as I go.  

