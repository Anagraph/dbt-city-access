{{ config(materialized='table',
indexes=[  { 'columns': ['h3_id']}, { 'columns': ['geom'], 'type': 'gist'},
])}}
select h3_id, population, geom from local_pop