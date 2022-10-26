{{ config(materialized='table',
indexes=[  { 'columns': ['geom'], 'type': 'gist'},
])}}

select id, name, type, st_transform(wkb_geometry, 4326) geom from pois