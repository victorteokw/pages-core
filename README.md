# pages-core ![build status](https://travis-ci.org/zhangkaiyulw/pages-core.svg)
The declarative pages architecture for building web UI.

## Documentation

Managing and syncing web page's view state is complicated sometimes. When you care about the page transition animation,
you are going to make a SPA. Page hierarchy in an SPA can be tricky sometimes. The pages architecture is the right tool
to solve problems like this by describing page hierarchy with an nested and serializable JSON object.

The JSON object for describing a page is called a page descriptor. A basic page descriptor looks like this:

``` javascript
{
  key: 'camera',
  page: 'CameraPage',
  props: {
    flash: false,
    HDR: true,
    aperture: 1.4,
    shutterSpeed: 0.01,
    ISO: 200
  }
}
```

Where key is the unique identifier, page is the real *view* should be rendered, props is the configuration for the view.
Therefore, equal page descriptors always result to same look to user.

Sometimes the web page can be complicated like an app. And page transitions to another page with nice animation. Nested
pages solves this problem. A basic nested page looks like this:

``` javascript
{
  key: 'navigation',
  page: 'NavigationPage',
  props: {
    children: [
      {
        key: 'recipes',
        page: 'RecipeListPage',
        props: {
          style: 'French',
          navigationTitle: 'French Recipes'
        }
      },
      {
        key: 'recipe150',
        page: 'RecipePage',
        props: {
          recipeId: 150,
          navigationTitle: 'Coquilles Saint-Jacques'
        }
      }
    ]
  }
}
```

The children field in props specifies child page descriptors and therefore make the pages connected. Container page
renders child pages with additional UI if needed. For example, navigation page adds a navigation bar at the top of the
page. Container page can require special props on child pages, too. For example: navigation page takes navigation title
from child pages and renders it on its own navigation bar.

## Installation

```
npm install pages-core
```
