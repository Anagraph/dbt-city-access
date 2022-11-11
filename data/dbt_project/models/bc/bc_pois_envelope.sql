{{ config(materialized='table',
indexes=[  { 'columns': ['geom'], 'type': 'gist'},
])}}
select st_makeenvelope(-131.124, 54.820, -110.015, 49.286, 4326) geom
