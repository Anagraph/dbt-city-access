{{ config(
    materialized='table',
    indexes=[
      {'columns': ['geom'], 'type': 'gist'},
    ],
    post_hook=[
    'alter table {{ this }} ADD PRIMARY KEY ("h3_id")',
    'grant select on table {{ this }} to publictiles'
    ]
    )
}}

select {{dbt_utils.star(from=ref('h3_r8_ratios'), except=['geom'])}}, cast(st_multi(st_transform(geom, 3857)) as geometry(multipolygon, 3857)) geom
from {{ref ('h3_r8_ratios')}}