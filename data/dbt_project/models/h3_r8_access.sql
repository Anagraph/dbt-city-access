{{ config(materialized='table',
indexes=[  { 'columns': ['h3_id']}, { 'columns': ['geom'], 'type': 'gist'},
])}}

{%
set grps = dbt_utils.get_column_values(table=ref('pois_groups'), column='group_name') %}

with pois_h3_r8 as (
    select *, h3_geo_to_h3index(geom, 8) as h3index
    from {{ref('pois')}}
),
     count_by_type as (
         select h3index, group_name, count(*) as count from pois_h3_r8 group by h3index, group_name
     ),
     jsonb_magic as (
         select h3index, jsonb_object_agg(group_name, count) as type_counts, sum(count) total from count_by_type group by h3index
     )
select h3index h3_id,
    {% for grp in grps %}
    coalesce (type_counts->>'{{ grp }}', '0')::int as {{ grp }},
    {% endfor %}
    total,
    b.geom
from jsonb_magic a
    join {{ref ('h3_r8')}} b
on a.h3index = b.h3_id
union
select h3_id,
    {% for grp in grps %}
    0 {{ grp }},
    {% endfor %}
    0 total,
    geom
from {{ref ('h3_r8')}}
where h3_id not in (select h3index from count_by_type)