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
   &nbsp;2.1. [ Technical architecture ](#clientTechnicalArchitecture)  
   &nbsp;2.2 [ Improvement list ](#clientImprovement)

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

Example: `js api/search/?package=lodash ` will return information about the lodash package.

When the API receives a request it first try to get all the existing versions of the package. It then only keeps the 3 last release versions as well as the previous major version discarding all beta, alpha and pre releases versions.

In case the previous major version is already included in the 3 previous version, the API return 4th previous version in order to always return information about 4 packages version.

The number of previous versions / major version is considered as a config in the API and can be easily updated.

Once the versions we are interested in are retrieved, we do an npm install, in parallel, for all version of the packages. There are installed in a local 'workspace' folder and installed under the path `packageName/version`

<a name="apiLimitation"></a>

### 1.3 Limitations of the API

<a name="apiImprovement"></a>

### 1.4 Improvement list

<a name="clientDoc"></a>

## 2. Client Documentation

<a name="clientTechnicalArchitecture"></a>

### 2.1 Technical architecture

<a name="clientImprovement"></a>

### 2.2 Improvement list

Note that the contextAPI could have been used in order to simply story the state of the application. Redux has been use only as a technical demonstration.

Backend:

- better error management

- need a cache and a database

- For a better user experience, the application will always compare the latest package version with 3 other versions including at least 1 major version

Limitiation of the backend:

Some package cannot be bundle because webpack is missing a loader or because of some specific package error

Front end: short end;

- mock are duplicated
