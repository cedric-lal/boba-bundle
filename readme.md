# Boba bundle

Boba bundle is an application that let you know the impact of adding an NPM package to your bundle.
It compute the size of the package itself along with all the dependencies its dragging. This way you know the real size impact of a NPM package.

Boba bundle provides information about the size of 3 previous versions of the package and the previous major version.

NOTE: For info on how to run the application, go to the readme of the api or client where you will find available commands.

1. [ API Documentation ](#apiDoc)  
   &nbsp;1.1. [ Technical architecture ](#apiTechnicalArchitecture)  
   &nbsp;1.2 [ How does it work ](#howItWorks)  
   &nbsp;1.3 [ Limitations of the API](#apiLimitation)  
   &nbsp;1.4 [ Improvement list ](#apiImprovement)
2. [ Client documentation ](#clientDoc)  
   &nbsp;2.1 [ Presentation ](#clientPres)  
   &nbsp;2.2 [ Technical architecture ](#clientTechnicalArchitecture)  
   &nbsp;2.3 [ Improvement list ](#clientImprovement)

<a name="apiDocumentation"></a>

## 1. API Documentation

<a name="apiTechnicalArchitecture"></a>

### 1.1 Technical architecture

The first technical decision taken about the backend as been to build a rest API. Indeed it fits perfectly the need for our application as we want to compute and send static data to the UI.

The API is built in NodeJS using the ExpressJS framework. NodeJS has been selected because it is a great language for I/O operations, as well, it allows for a full javascript stack from front end to back end.

The framework ExpressJS has been selected for its ease of use, and small boilerplate. As well, it is a great option for building rest API.

<a name="howItWorks"></a>

### 1.2 How does it work

The API only exposes one 'search' route. It is the entry point that allow to retrieve information about a package. The package name has to be provided as the URL query parameter 'package'

Example: the entry point `api/search/?package=lodash ` will return information about the lodash package.

When the API receives a request it first try to get all the existing versions of the package. It then only keeps the 3 last released versions as well as the previous major version discarding all beta, alpha and pre releases versions.

In case the previous major version is already included in the 3 previous version, the API return the 4th previous version in order to always try to return information about 4 packages version (if less than 4 versions exist, of course the API will return only the existing versions).

The number of previous versions / major version is considered as a config in the API and can be easily updated.

Once the versions we are interested in are retrieved, we do an npm install, in parallel, for all version of the package. There are installed in a local 'workspace' folder under the path `packageName/version`.

Once the npm installation is over, webpack is used in order to bundle the package. All dependencies are bundled except for peerDependencies, as they are supposed to be already installed in the project using the NPM package, so it doesn't count as added weight.

Once webpack as produce the minified js file we determine its size, then gzip it in order to get the gzip size of the minified bundle.

The workspace is persistent and never deleted, as we will discuss later in the Improvement list section, this is not ideal for a production app.
It has been put in place here in order to speed up the API respond when we retrieve information about a package we have previously bundled. Indeed, if the bundle is already here, the API won't need to build the package again.

In case the process fail at any point (package unknown, install fail, build fail) the API will always return the same error "Impossible to retrieve information for the package". This has been done for saving time on development but as we will discuss in the improvement list section, it is not ideal either.

<a name="apiLimitation"></a>

### 1.3 Limitations of the API

The api is able to retrieve size information for almost every NPM package, however there are exceptions.

The API is sometimes unable to install packages that have specific install process (some package are doing a build during the install, such as 'cap' package that use node-gyp to build during the install), as we don't necessary have the dependencies required or the environment is not adapted to the tasks the package is doing. The installation can fail.

For the building step, it happens that webpack will fail because the package doesn't follow the standard. For example, having dev dependencies that are mandatory for the build (can happen on library such as react-query that extends and depends on a framework). Those dev dependencies should actually be peer dependency that would therefore be ignored by our webpack build.

It can also happen that the package require a specific webpack loader that we don't provide.

Of course, all those issues can be fixed by investing more time in testing and tweaking the configurations. However, all of those edge case packages have been left out of scope for now.

<a name="apiImprovement"></a>

### 1.4 Improvement list

As stated earlier, the API has some shortcomings that have been taken in order to limit development time. In this section we are quickly going to review what should be the next step in order to make the application production ready.

- The API would need to store size information for already computed package (such as in a data base for example). The API would then be much faster for package with already calculated size and do less CPU intensive tasks.

- Unit tests / integrations tests should be added (omitted to speed up development).

- Add security check regarding the package name provided, to make sure it is a valid package name and avoid malicious injections.

- Better error management. Currently, every time the API fail it return the same generic error message. A more granular error management that return different errors like "package not found" or "build failed" would improve the user experience.

- Finally, some smaller improvements that would help with performance like a caching mechanism or using workers for install and build tasks. Since we are doing those actions on 4 packages at a time, splitting the load across CPUs would help.

<a name="clientDoc"></a>

## 2. Client Documentation

![Desktop version of the application](./desktop.png?raw=true 'Desktop view')
![Mobile version of the application](./mobile.png?raw=true 'Mobile view')

<a name="clientPres"></a>

### 2.1 Presentation

When arriving on the application, the user land on the home page where he can interact with an input search in order to look for a package.

When the user searches for a package, either by pressing enter in the input or click the search button, he is redirected to the dashboard page.

The dashboard displays different panels depending on the current state of the application:

- Display the package information including the sizes of the latest version and history chart to let user compare the latest version with previous sizes
- The loading panel is display while the data for a package are being fetch
- The error state is display when retrieving the information failed

The user can execute a new search directly from the dashboard by interacting with the input at the top of the page.

<a name="clientTechnicalArchitecture"></a>

### 2.2 Technical architecture

The client of boba bundle is an independent application that is only communicating to the API through http calls.

It is built using the React framework with the redux store architecture. The redux store was not necessary in such a small and simple application but has been implemented for technical demonstration.

The application follow a basic redux architecture, meaning that when the user do an action the view dispatch the action to the store, the action then do some logic and call a reducer that will return a new state. The view receive the new state and re render.

The structure of the application is as follow:

- api: contains all the helpers to do backend calls
- components: simple reusable components that are not connected to the store
- store: container the reducers and actions of the store
- style: contains the global styling of the application (theming, mixins, CSS rests ...)
- views: container components connected to the store to retrieve data and dispatch actions

The middleware thunk is used in order to manage asynchronous call to the API. For example when a user search for a package, the async action creator search package is trigger and will dispatch multiple actions such as 'start fetching' to have a loading state or after API responded it can dispatch fetch error or success depending on the result with the corresponding payload.

In order to simplify the reducer's logic the library immer is used. This library let you simply mutate a "draft state" that is then returned, we never have to worry about risking to mutate the state as we never have access to the state object.

The application implement react router, whereas redux will be the unique source of truth for data, react router will be the unique source of truth for URL and navigation. It is used in order to have the package name as query parameter of the URL on the dashboard. This allows to have a specific URL for a package search and for example being able to share the URL to someone else.

<a name="clientTechnicalArchitecture"></a>

### 2.2 Testing environment

Regarding the testing environnement, the application has unit and integration test, using Jest framework and Testing Library, which provide simple but powerful testing tools.

The request to the API are mocked using fetch-mock library, the store is mocked using redux-mock-store. This allow use to unit test the actions, the reducers, the api helper but as well to run integration testing on component using mocked data. For example in the dashboard view, the state returned by the store can be mocked in order to check that the good panel is displayed depending on the state.

Thanks to redux-mock-store and its `mockStore.getActions()`, we are also able to efficiently test async action creators by checking every action that have been dispatched to the store after the async action creator as be executed.

<a name="clientImprovement"></a>

### 2.3 Improvement list

- The client application is lacking end to end tests that have been omitted for development time constraint. End to end testing are the most expensive to put in place and maintain but they give the most confidence regarding quality.
- Internationalisation should be added for multi language support.
