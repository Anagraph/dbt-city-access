{{ config(materialized='table',
indexes=[  { 'columns': ['geom'], 'type': 'gist'},
])}}
select st_convexhull(st_collect(geom)) geom
from {{ref('pois')}}