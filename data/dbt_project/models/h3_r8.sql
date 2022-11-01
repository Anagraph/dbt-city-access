{{ config(materialized='table',
indexes=[  { 'columns': ['h3_id']}, { 'columns': ['geom'], 'type': 'gist'},
])}}

with h3_ids as (
select h3_polyfill(geom, 8) h3_id from {{ref('pois_envelope')}}
)
select h3_id, st_setsrid(h3_h3index_to_geoboundary(h3_id), 4326) geom from h3_ids