{{ config(materialized='table',
indexes=[  { 'columns': ['code']},
])}}
select group_name, subgroup, code::int from pois_groups