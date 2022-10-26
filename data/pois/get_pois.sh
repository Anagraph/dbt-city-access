#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status.

pois_file_path=./canada-latest.osm.pbf
outputFile=pois.csv

java -jar osmpois.jar --filterFile uac_filter.txt --outputFile $outputFile --separator ";" $pois_file_path
{ echo "type;id;lat;lon;name"; cat $outputFile; } > pois_header.csv

ogr2ogr pois.geojson pois_header.csv -oo X_POSSIBLE_NAMES=lon -oo Y_POSSIBLE_NAMES=lat

aws s3 cp pois.geojson s3://tc-trail-pa/pois.geojson