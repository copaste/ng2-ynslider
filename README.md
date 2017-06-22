> This repository is for demonstration purposes of how it can be implemented in Angular and is not maintaned. Please fork and maintain your own version of this repository.

# ngx-paginator

Simple pagination bar control for your angular2 applications using bootstrap3.
Does not depend of jquery. If you don't want to use it without bootstrap - simply create proper css classes. 
Please star a project if you liked it, or create an issue if you have problems with it.

## Installation

1. Install npm module:
    
    `npm install ngx-paginator --save`

2. If you are using system.js you may want to add this into `map` and `package` config:

    ```json
    {
        "map": {
            "ngx-paginator": "node_modules/ngx-paginator"
        },
        "packages": {
            "ngx-paginator": { "main": "index.js", "defaultExtension": "js" }
        }
    }
    ```

## Usage

Import `PaginatorModule` in your app.
There are two components you can use in your components.

First is a `paginator` is a simple control that shows pages and emits events when page is being chagned:

```html
<paginator [total]="50"
           [onPage]="5"
           [currentPage]="1"
           [maxVisible]="5"
           (onChange)="someActionOnPageChange()"
           [directionLinks]="true"
           directionNextLabel="Next"
           directionPreviousLabel="Prev"
           [boundaryLinks]="true"
           boundaryFirstLabel="First"
           boundaryLastLabel="Last"
           [hideOnSinglePage]="true">
</paginator>
```

* `total` - a total number of items of the content you show
* `onPage` - number of items of content you show per page
* `currentPage` - currently selected page
* `maxVisible` - maximum number of pages visible for selection (to prevent pages overflow)
* `(onChange)` - event emitted when user changes the page
* `directionLinks` - Shows direction (prev/next) buttons. Default is **true**.
* `directionNextLabel` - Label for the next direction button. Default is **»**.
* `directionPreviousLabel` - Label for the previous direction button. Default is **«**.
* `boundaryLinks` - Shows boundary (first/last) buttons. Default is **false**.
* `boundaryFirstLabel` - Label for the first boundary button. Default is **First**.
* `boundaryLastLabel` - Label for the last boundary button. Default is **Last**.
* `hideOnSinglePage` - hides the whole paginator if there is only one page. Default is **true**.


Second is a `router-paginator` that shows pages and re-navigates using router parameters when page is being chagned.

```html
<router-paginator  param="page"
                   queryParam="page"
                   [total]="50"
                   [onPage]="5"
                   [currentPage]="1"
                   [maxVisible]="5"
                   (onChange)="someActionOnPageChange()"
                   [directionLinks]="true"
                   directionNextLabel="Next"
                   directionPreviousLabel="Prev"
                   [boundaryLinks]="true"
                   boundaryFirstLabel="First"
                   boundaryLastLabel="Last"
                   [hideOnSinglePage]="true">
</router-paginator>
```

* `param` - router parameter name to be used to store page. Either this, either `queryParam` must be set.
* `queryParam` - router parameter name to be used to store page. Either this, either `param` must be set.
* `total` - a total number of items of the content you show
* `onPage` - number of items of content you show per page
* `currentPage` - currently selected page
* `maxVisible` - maximum number of pages visible for selection (to prevent pages overflow)
* `(onChange)` - event emitted when user changes the page
* `directionLinks` - Shows direction (prev/next) buttons. Default is **true**.
* `directionNextLabel` - Label for the next direction button. Default is **»**.
* `directionPreviousLabel` - Label for the previous direction button. Default is **«**.
* `boundaryLinks` - Shows boundary (first/last) buttons. Default is **false**.
* `boundaryFirstLabel` - Label for the first boundary button. Default is **First**.
* `boundaryLastLabel` - Label for the last boundary button. Default is **Last**.
* `hideOnSinglePage` - hides the whole paginator if there is only one page. Default is **true**.


## Sample

Using simple paginator:

```typescript
import {Component} from "@angular/core";
import {PaginatorModule} from "ngx-paginator";

@Component({
    selector: "app",
    template: `
    <div class="container">

        <!-- default paginator -->
        <paginator
            [onPage]="5"
            [total]="100"
            [maxVisible]="5"></paginator>

        <!-- simple paginator without any additional controls -->
        <paginator
            [directionLinks]="false"
            [boundaryLinks]="false"
            [onPage]="5"
            [total]="100"
            [maxVisible]="5"></paginator>

        <!-- paginator with next/prev custom labels -->
        <paginator
            [directionLinks]="true"
            directionNextLabel="next >>"
            directionPreviousLabel="<< prev"
            [onPage]="5"
            [total]="100"
            [maxVisible]="5"></paginator>

        <!-- paginator with boundary buttons -->
        <paginator
            [boundaryLinks]="true"
            [onPage]="5"
            [total]="100"
            [maxVisible]="5"></paginator>

        <!-- paginator with boundary custom labels -->
        <paginator
            [boundaryLinks]="true"
            boundaryFirstLabel=":first"
            boundaryLastLabel="last:"
            [onPage]="5"
            [total]="100"
            [maxVisible]="5"></paginator>

        <!-- paginator that is hidden if there are zero pages -->
        <paginator
            [hideOnSinglePage]="true"
            [onPage]="5"
            [total]="5"
            [maxVisible]="5"></paginator>

        <!-- paginator that is NOT hidden if there are zero pages -->
        <paginator
            [hideOnSinglePage]="false"
            [onPage]="5"
            [total]="5"
            [maxVisible]="5"></paginator>

    </div>
    `
})
export class App {

}

@NgModule({
    imports: [
        // ...
        PaginatorModule
    ],
    declarations: [
        App
    ],
    bootstrap: [
        App
    ]
})
export class AppModule {

}
```

Using route paginator:

```typescript

@Component({
    selector: "sample2-component",
    template: `

    <!-- PARAM PAGINATOR-->
    
    <!-- default paginator -->
    <route-paginator 
        param="page" 
        [onPage]="5" 
        [total]="100" 
        [maxVisible]="5"></route-paginator>

    <!-- simple paginator without any additional controls -->
    <route-paginator 
        param="page" 
        [directionLinks]="false"
        [boundaryLinks]="false"
        [onPage]="5" 
        [total]="100" 
        [maxVisible]="5"></route-paginator>
        
    <!-- paginator with next/prev custom labels -->
    <route-paginator 
        param="page" 
        [directionLinks]="true"
        directionNextLabel="next >>"
        directionPreviousLabel="<< prev"
        [onPage]="5" 
        [total]="100" 
        [maxVisible]="5"></route-paginator>
        
    <!-- paginator with boundary buttons -->
    <route-paginator 
        param="page" 
        [boundaryLinks]="true"
        [onPage]="5" 
        [total]="100" 
        [maxVisible]="5"></route-paginator>
        
    <!-- paginator with boundary custom labels -->
    <route-paginator 
        param="page" 
        [boundaryLinks]="true"
        boundaryFirstLabel=":first"
        boundaryLastLabel="last:"
        [onPage]="5" 
        [total]="100" 
        [maxVisible]="5"></route-paginator>
        
    <!-- paginator that is hidden if there are zero pages -->
    <route-paginator 
        param="page" 
        [hideOnSinglePage]="true"
        [onPage]="5" 
        [total]="5" 
        [maxVisible]="5"></route-paginator>
        
    <!-- paginator that is NOT hidden if there are zero pages -->
    <route-paginator 
        param="page" 
        [hideOnSinglePage]="false"
        [onPage]="5" 
        [total]="5" 
        [maxVisible]="5"></route-paginator>
        
    <!-- QUERY PARAM PAGINATOR-->
    
    <!-- default paginator -->
    <route-paginator 
        queryParam="page" 
        [onPage]="5" 
        [total]="100" 
        [maxVisible]="5"></route-paginator>

    <!-- simple paginator without any additional controls -->
    <route-paginator 
        queryParam="page" 
        [directionLinks]="false"
        [boundaryLinks]="false"
        [onPage]="5" 
        [total]="100" 
        [maxVisible]="5"></route-paginator>
        
    <!-- paginator with next/prev custom labels -->
    <route-paginator 
        queryParam="page" 
        [directionLinks]="true"
        directionNextLabel="next >>"
        directionPreviousLabel="<< prev"
        [onPage]="5" 
        [total]="100" 
        [maxVisible]="5"></route-paginator>
        
    <!-- paginator with boundary buttons -->
    <route-paginator 
        queryParam="page" 
        [boundaryLinks]="true"
        [onPage]="5" 
        [total]="100" 
        [maxVisible]="5"></route-paginator>
        
    <!-- paginator with boundary custom labels -->
    <route-paginator 
        queryParam="page" 
        [boundaryLinks]="true"
        boundaryFirstLabel=":first"
        boundaryLastLabel="last:"
        [onPage]="5" 
        [total]="100" 
        [maxVisible]="5"></route-paginator>
        
    <!-- paginator that is hidden if there are zero pages -->
    <route-paginator 
        queryParam="page" 
        [hideOnSinglePage]="true"
        [onPage]="5" 
        [total]="5" 
        [maxVisible]="5"></route-paginator>
        
    <!-- paginator that is NOT hidden if there are zero pages -->
    <route-paginator 
        queryParam="page" 
        [hideOnSinglePage]="false"
        [onPage]="5" 
        [total]="5" 
        [maxVisible]="5"></route-paginator>
        
`
})
export class Sample2Component {

}

@NgModule({
    imports: [
        // ...
        PaginatorModule
    ],
    declarations: [
        App
    ],
    bootstrap: [
        App
    ]
})
export class AppModule {

}
```

Take a look on samples in [./sample](https://github.com/pleerock/ngx-paginator/tree/master/sample) for more examples of
usages.

## Release notes

**0.0.9**

* upgrade to angular rc.6

**0.0.8**

* `router-paginator` has been renamed to `route-paginator`
* `route-paginator` now should have implicitly set `paramName` or `queryParamName`

**0.0.9**

* `paramName` changed its name to `param`
* `queryParamName` changed its name to `queryParam`
