# datatable-vue

> Datatable dynamic component for Vue.JS

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


How long did you spend on the test? Would you do anything differently if you had more time?

Started this project, 11 days ago (see commit on the github page) but I didn't have much time to develop it 
throughout the days since I'm currently working full-time. 
I'd pay more attention to details. Like there is a CSS layout bug with the margin of the datatable component. As you
will see there is a unneccessary margin bottom that creates whitespace. 
I would also involce a database for the records, but I didn't have much time for that so I got creative with using 
the Vuex in a tremendous simple manner. 

In what ways would you adapt your component so that it could be used in many different scenarios where a data table is required?

I would manipulate more with the CSS. Even though the component I made is pretty dynamic. Depending of the keys (that I treat as headers) and values (as rows) the table gets created and I dynamically add css properties regarding those criterias. 

What is your favorite CSS property? Why?

display:flex, and display:grid. 
Flex eased the pain of floats that are now ancient history, it's really dynamic and I like working with it and ordering stuff. 
I use grid if I know 100% sure how the structure will be. I mostly use it for dashboard layouts and input groups inside a form.

What is your favorite modern Javascript feature? Why?

I really like the Map function. It's simple to use and it's readable. 
As per my favorite feature: I'd say promises and asynchronous method activity. 
Having in mind that Javascript runs on a single thread, asynchronous behaviour is very much needed, and combined with promises its a perfect match for data processing and client-side requests.


What is your favorite third-party Vue.js library? Why?

Element ui. It has a good documentation and offers a lot of components that ease the developing phase.