# Ze Partners API - Technical Test (Software Engineer Backend)

REST API that implements the three following features:

### 1 - Create a Partner
### 2 - Load Partner by id
### 3 - Find nearest partner for a given location


# Prerequisites
* npm
  ```sh
  npm install npm@latest -g
  ```
* Docker

  Instalation guide: https://docs.docker.com/get-docker/

Note: If you don't to install docker you will need to have mongodb configured locally on your computer.

# How to execute locally
1. Clone the repo
   ```sh
   git clone https://github.com/rodrigo-estrela/ze-partners-api.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
2. Run dev script
   ```sh
   npm run dev
   ```
4. Await confirmation message on the console
   ```sh
   Server running at http://localhost:<PORT>
   ```
# Test scripts
* To run all unit tests, execute the following script:
   ```sh
   npm run test:unit
   ```
* To run all integration tests, execute the following script:
   ```sh
   npm run test:integration
   ```
* To run ALL tests, execute the following script:
   ```sh
   npm run test
   ```
* To check tests coverage, execute the following script:
   ```sh
   npm run test:ci
   ```


# Endpoints
## POST /api/partners
**Save a partner to the database**
Parameters | Comments
------------- | -------------
**tradingName** | Required. Partner Trading Name [string]
**ownerName**  | Required. Partner owner Name [string]
**document** | Required. Partner document [string]
**coverageArea** | Required. A valid GeoJON MultiPolygon
**address** | Required. A valid GeoJON Point
-------------------
## GET /api/partners/:partnerId
**Returns a partner**
Parameters | Comments
------------- | -------------
**partnerId** | A valid ObjectId
------------------
## GET /api/partners/search?lon=??lat=??
**Search the nearest partner which the coverage area includes the given location**
Parameters | Comments
------------- | -------------
**lon** | Required. A valid longitude data [number]
**lat** | Required. A valid longitude data [number]
