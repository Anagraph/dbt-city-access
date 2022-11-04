{{ config(materialized='table',
indexes=[  { 'columns': ['h3_id']}, { 'columns': ['geom'], 'type': 'gist'},
])}}

{%
set grps = dbt_utils.get_column_values(table=ref('pois_groups'), column='group_name') %}

select a.h3_id,
       a.population,
    {% for grp in grps %}
    b.{{grp}},
    b.{{grp}}/NULLIF(a.population, 0) {{grp}}_population,
    {% endfor %}
    b.total,
    b.total/NULLIF(a.population, 0) total_population
    b.geom
from {{ref('local_pop')}} a join {{ref('h3_r8_access')}} b
on a.h3_id = b.h3_id
union
select h3_id,
       0 population,
    {% for grp in grps %}
    {{grp}},
    0 {{grp}}_population,
    {% endfor %}
    geom
from {{ref('h3_r8_access')}}
where h3_id not in (select h3_id from {{ref('local_pop')}})