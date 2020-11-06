# Boba bundle

Boba bundle is an application that let you know the impact of adding an NPM package to your bundle.
It compute the size of the package itself along with all the dependency its dragging. This way you know the real size impact of a NPM package.

Boba bundle also provides information about the size of 3 previous versions of the package and the previous major version.

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

The API only expose one 'search' route. It is the entry point that allow to retrieve information about a package. The package name has to be provided as the URL query parameter 'package'

Example: the entry point `api/search/?package=lodash ` will return information about the lodash package.

When the API receives a request it first try to get all the existing versions of the package. It then only keeps the 3 last release versions as well as the previous major version discarding all beta, alpha and pre releases versions.

In case the previous major version is already included in the 3 previous version, the API return 4th previous version in order to always return information about 4 packages version.

The number of previous versions / major version is considered as a config in the API and can be easily updated.

Once the versions we are interested in are retrieved, we do an npm install, in parallel, for all version of the package. There are installed in a local 'workspace' folder and installed under the path `packageName/version`.

Once the npm installation is over, webpack is used in order to bundle the package. All dependencies are bundled except for peerDependencies, as they are supposed to be already installed in the project using the NPM package, so it doesn't count as added weight.

Once webpack as produce the minified js file we determine its size, then gzip it in order to get the gzip size of the minified bundle.

The workspace is persistent and never deleted, as we will discuss later in the Improvement list section, this is not ideal for a production app.
It has been put in place here in order to speed up the API respond when we retrieve information about a package we have previously bundled. Indeed, if the bundle is already here, the API won't need to build the package again.

In case the process fail at any point (package unknown, install fail, build fail) the API will always return the same error "Impossible to retrieve information for the package". This as been done for saving time on development but as we will discuss in the improvement list section, it is not ideal either.

<a name="apiLimitation"></a>

### 1.3 Limitations of the API

The api is able to retrieve size information for almost every NPM package, however there are exceptions.

The API is sometimes unable to install packages that have specific install process (some package are doing a build during the install, such as 'cap' package that use node-gyp to build during the install), as we don't necessary have the dependencies required or the environment is not adapted to the tasks the package is doing. The installation can fail.

For the building step, it happens that webpack will fail because the package doesn't follow the standard. For example, having dev dependencies that are mandatory for the build (often happen for libraries such as react-query that depends on a framework). Those dev dependencies should actually be peer dependency that would therefore be ignored by our webpack build.

It can also happen that the package require a specific webpack loader that we don't provide.

Of course, all those issues can be fixed by investing more time in testing and tweaking the configurations. However, all of those edge case packages have been left out of scope for now.

<a name="apiImprovement"></a>

### 1.4 Improvement list

As stated earlier, the API has some shortcomings that have been taken in order to limit development time. In this section we are quickly going to review what should be the next step in order to make the application production ready.

- The API would need to store size information already computed (such as in a data base for example). The API would then be much fast for package with already calculated size and do much less CPU intensive tasks.

- Unit tests and integrations tests should be added (omitted to speed up development).

- Better error management. Currently, every time the API fail it return the same generic error message. A more granular error management that return different errors like "package not found" or "build failed" would improve the user experience.

- Finally, some smaller improvements that would help with performance like a caching mechanism or using workers for install and build tasks. Since we are doing those actions on 4 packages at a time, splitting the load across CPUs would help.

<a name="clientDoc"></a>

## 2. Client Documentation

<a name="clientPres"></a>

### 2.1 Presentation

<a name="clientTechnicalArchitecture"></a>

### 2.2 Technical architecture

<a name="clientImprovement"></a>

### 2.3 Improvement list

Note that the contextAPI could have been used in order to simply story the state of the application. Redux has been use only as a technical demonstration.

Backend:

- better error management

- need a cache and a database

- For a better user experience, the application will always compare the latest package version with 3 other versions including at least 1 major version

Limitiation of the backend:

Some package cannot be bundle because webpack is missing a loader or because of some specific package error

Front end: short end;

- mock are duplicated
