Sample project to reproduce issue reg pw-comp tests and miragejs


To run the app standalone:
```
yarn start
```
This will start the app with `miragejs` mock server enabled. Can be confirmed by the fake values in the `Organisation` dropdown.


Steps to reproduce the issue
- Debug the test in `src\components\Navigation\Navigation.spec.tsx` (using playwright-test extension)
- Open the network tab in devtools once the browser opens

Actual result:
It shows an API request to `/organisation` and since it fails, the organisation dropdown shows an error

Expected result:
If `miragejs` properly intercepted the call, there wouldn't be any API call made AND the organisation dropdown in the mounted component would show fake values loaded