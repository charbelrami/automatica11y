# automatica11y

> Automatic A11y — let's make the web accessible to everyone.

## Important!

Learning how to make your website accessible is highly encouraged. Understanding accessibility (aka a11y) is of paramount importance for web developers. See [Learn A11y](#learn-a11y) section.

**automatica11y** is intended to help developers implement accessibility with the minimum amount of effort because an accessible web is urgent and will benefit everyone.

Contributions are always welcome! Let's make the web accessible to everyone, together.

## Requirements

 The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL
      NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED",  "MAY", and
      "OPTIONAL" in this document are to be interpreted as described in
     [RFC 2119](https://tools.ietf.org/html/rfc2119).

**automatica11y**:
- MUST be in accordance with Web Content Accessibility Guidelines and WAI-ARIA Authoring Practices
- MUST work with minimal configuration
- MUST NOT depend on the markup structure
- MUST NOT overwrite id attributes
- SHOULD use custom data-* attributes instead of class attributes
- SHOULD make the attribute names customizable

## Examples

### Tab Panel
> [reference](http://rawgit.com/w3c/aria/master/practices/aria-practices.html#tabpanel)

- [Material Design Lite](https://charbelrami.github.io/automatica11y/tabpanel-mdl.html) ([Source](tabpanel-mdl.html))
- [Bootstrap 4](https://charbelrami.github.io/automatica11y/tabpanel-bootstrap.html) ([Source](tabpanel-bootstrap.html))
- [Semantic UI](https://charbelrami.github.io/automatica11y/tabpanel-semantic-ui.html) ([Source](tabpanel-semantic-ui.html))

## Installation

### npm
```sh
npm install --save automatica11y
```

### Yarn
```sh
yarn add automatica11y
```

### CDN
```html
<script src="https://unpkg.com/automatica11y/dist/automatica11y.min.js"></script>
```

## Usage

- Include `automatica11y.min.js` in your page. Put the script tag at the bottom of the body element just before the closing tag `</body>`. We want to run **automatica11y** after the DOM construction is completed and we don't want do block the parser.
- Add the custom data-* attributes to inaccessible components.
- Voilà!

```html
<body>
  <article data-a11y-tabpanel>
    <ul data-a11y-tabpanel-tablist>
      <li data-a11y-tabpanel-tab>Tab 0</li>
      <li data-a11y-tabpanel-tab>Tab 1</li>
      <li data-a11y-tabpanel-tab>Tab 2</li>
      <li data-a11y-tabpanel-tab>Tab 3</li>
    </ul>
    <section data-a11y-tabpanel-pane>
      <h1>Pane 0</h1>
      <p>Lorem ipsum dolor sit amet.</p>
    </section>
    <section data-a11y-tabpanel-pane>
      <h1>Pane 1</h1>
      <p>Lorem ipsum dolor sit amet.</p>
    </section>
    <section data-a11y-tabpanel-pane>
      <h1>Pane 2</h1>
      <p>Lorem ipsum dolor sit amet.</p>
    </section>
    <section data-a11y-tabpanel-pane>
      <h1>Pane 3</h1>
      <p>Lorem ipsum dolor sit amet.</p>
    </section>
  </article>

  <script src="automatica11y.min.js"></script>
</body>
```

**automatica11y** adds all the necessary attributes

```html
<body>
  <article>
    <ul role="tablist">
      <li tabindex="0" aria-selected="true" role="tab" id="automatica11y-tabpanel-0-tab-0" aria-controls="automatica11y-tabpanel-0-pane-0">Tab 0</li>
      <li tabindex="-1" aria-selected="false" role="tab" id="automatica11y-tabpanel-0-tab-1" aria-controls="automatica11y-tabpanel-0-pane-1">Tab 1</li>
      <li tabindex="-1" aria-selected="false" role="tab" id="automatica11y-tabpanel-0-tab-2" aria-controls="automatica11y-tabpanel-0-pane-2">Tab 2</li>
      <li tabindex="-1" aria-selected="false" role="tab" id="automatica11y-tabpanel-0-tab-3" aria-controls="automatica11y-tabpanel-0-pane-3">Tab 3</li>
    </ul>
    <div>
      <section aria-hidden="false" role="tabpanel" id="automatica11y-tabpanel-0-pane-0" aria-labelledby="automatica11y-tabpanel-0-tab-0">
        ...
      </section>
      <section aria-hidden="true" role="tabpanel" id="automatica11y-tabpanel-0-pane-1" aria-labelledby="automatica11y-tabpanel-0-tab-1">
        ...
      </section>
      <section aria-hidden="true" role="tabpanel" id="automatica11y-tabpanel-0-pane-2" aria-labelledby="automatica11y-tabpanel-0-tab-2">
        ...
      </section>
      <section aria-hidden="true" role="tabpanel" id="automatica11y-tabpanel-0-pane-3" aria-labelledby="automatica11y-tabpanel-0-tab-3">
        ...
      </section>
    </div>
  </article>

  <script src="automatica11y.min.js"></script>
</body>
```

### Configuration

You can configure **automatica11y** using the object literal `automatica11yConfig`. You can omit any properties.

#### Default values

```js
const automatica11yConfig = {
  components: {
    tabPanel: {
      data: {  // custom data-* attributes
        identifier: 'a11y-tabpanel', // custom data-* attribute used to identify a tab panel
        tabList: 'a11y-tabpanel-tablist', // custom data-* attribute used to identify a tab list
        tab: 'a11y-tabpanel-tab', // custom data-* attribute used to identify a tab
        pane: 'a11y-tabpanel-pane' // custom data-* attribute used to identify a pane
      },
      selected: { // selected/active state identifiers
        enable: false, // enable it if your component uses classes or attributes to indicate selected state
        tab: { // selected tab identifiers
          attributes: [], // an array of all attributes originally used by the component to indicate a selected tab
          classes: [] // an array of all classes originally used by the component to indicate a selected tab
        },
        pane: { // selected pane identifiers
          attributes: [], // an array of all attributes originally used by the component to indicate a selected pane
          classes: [] // an array of all classes originally used by the component to indicate a selected pane
        }
      }
    }
  }
}
```

#### Example

```html
<div data-tabs>
  <div data-list>
    <a data-tab selected>Tab</a>
    <a data-tab>Tab</a>
    <a data-tab>Tab</a>
  </div>
  <div data-pane class="is-active">
    Pane
  </div>
  <div data-pane>
    Pane
  </div>
  <div data-pane>
    Pane
  </div>
</div>
<script>
const automatica11yConfig = {
  components: {
    tabPanel: {
      data: {
        identifier: 'tabs',
        tabList: 'list',
        tab: 'tab',
        pane: 'pane'
      },
      selected: {
        enable: true,
        tab: {
          attributes: ['selected']
        },
        pane: {
          classes: ['is-active']
        }
      }
    }
  }
}
</script>
<script src="automatica11y.min.js"></script>
```

## Learn A11y

> I learn a lot from these invaluable resources

- [A11ycasts with Rod Dodson](https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)
- [Web Accessibility - Udacity course](https://www.udacity.com/course/web-accessibility--ud891) by Alice Boxhall and Rob Dodson
- [Accessibility - Web Fundamentals](https://developers.google.com/web/fundamentals/accessibility/)

## License

[MIT](license) © 2016 Charbel Rami

[@charbelrami](https://twitter.com/charbelrami)
