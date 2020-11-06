#Boba bundle

Boba bundle is an application that let you know the impact of adding an NPM package to your bundle.
It bundle a the package with all its dependencies in order to let you know the real size impact of adding it to your project.\

Boba bundle also provides information about the size of previous versions of the package.

1. [ API Documentation ](#apiDoc)\
   &nbsp;1.1. [ Technical architecture ](#apiTechnicalArchitecture)\
   &nbsp;1.2 [ How does it work ](#howItWorks)\
   &nbsp;1.3 [ Limitations of the API](#apiLimitation)\
   &nbsp;1.4 [ Improvement list ](#apiImprovement)\
2. [ Client documentation ](#clientDoc)\
   &nbsp;2.1. [ Technical architecture ](#clientTechnicalArchitecture)\
   &nbsp;2.2 [ Improvement list ](#clientImprovement)\

<a name="apiDocumentation"></a>

## 1. API Documentation

<a name="apiTechnicalArchitecture"></a>

### 1.1 Technical architecture

<a name="howItWorks"></a>

### 1.2 How does it work

<a name="apiLimitation"></a>

### 1.3 Limitations of the API

<a name="apiImprovement"></a>

### 1.4 Improvement list

<a name="clientDoc"></a>

## 2. Client Documentation

<a name="clientTechnicalArchitecture"></a>

### 2.1 Technical architecture

<a name="clientImprovement"></a>

### 2.2 CImprovement list

Note that the contextAPI could have been used in order to simply story the state of the application. Redux has been use only as a technical demonstration.

Backend:

- better error management

- need a cache and a database

- For a better user experience, the application will always compare the latest package version with 3 other versions including at least 1 major version

Limitiation of the backend:

Some package cannot be bundle because webpack is missing a loader or because of some specific package error

Front end: short end;

- mock are duplicated
