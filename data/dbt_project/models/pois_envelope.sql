{{ config(materialized='table',
indexes=[])}}
select st_convexhull(st_collect(geom)) geom
from {{ref('pois')}}