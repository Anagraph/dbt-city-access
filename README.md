# City Access Map - Anagraph :cityscape: :walking: :zap:

## About The Project

The project was inspired by the work done by [Leonardo Nicoletti](https://github.com/lnicoletti/) on
his [City-Access-Map](https://github.com/lnicoletti/city-access-map) project.

We some of his data processing steps for our PostGIS Day presentation our processing geospatial data with PostGIS and
dbt.

### Built With

* [GDAL](https://gdal.org/)
* [dbt](https://docs.getdbt.com/docs/building-a-dbt-project/documentation)
* [PostGIS](https://postgis.net/documentation/)
* [python](https://docs.python.org/3/)
* [docker](https://docs.docker.com/)

## Getting Started

### Prerequisites

You must have the following software installed on the linux host machine:

- dbt
- ogr2ogr
- psql
- docker
- docker-compose
- yogrt

## Usage

- Add your `yogrt/secrets.yaml` (use `yogrt init --target .` to create a template)
- Run `yogrt run --profile yogrt/profile.yaml --secrets yogrt/secrets.yaml --sources yogrt/sources.yaml` to import the
  datasources
- Create your `.env` file (use `.env.example` as a template)
- Run `cd docker; docker-compose up` to start the database and pg_tileserv
- Run dbt `./data/run_dbt.sh` to run the dbt project

### Overview

### Additional documentation

## Roadmap

## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Run our test suit [Dbt tests](#dbt-tests)
4. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the Branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request