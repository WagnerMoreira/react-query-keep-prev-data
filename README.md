# react-query-keep-prev-data

To run the json-server mock API

`json-server --watch db.json --port 3004 --delay 2000`

To run the React app

`yarn` then `yarn run dev`

There is another branch that shows how swr doesn't support keepPreviousData when suspense is enabled, switch to `swr-version` to see that. The same happens if you try to use a middleware, the problem comes from the fact that when using suspense, `swr.data` is always defined because it always gets the result from the request assigned to it, swr skips the step where `swr.data` is undefined when you use suspense, therefore keepPreviousData and any [middleware](https://swr.vercel.app/docs/middleware#keep-previous-result) that tries to achieve the same will also fail because those rely on `swr.data` being undefined.
