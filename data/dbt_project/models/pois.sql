{{ config(materialized='table',
indexes=[  { 'columns': ['geom'], 'type': 'gist'},
])}}

select id, name, b.group_name, type::int, st_transform((ST_Dump(wkb_geometry)).geom, 4326)::geometry(Point, 4326) geom
from pois
         join {{ref ('pois_groups')}} b
on pois.type::int = b.code