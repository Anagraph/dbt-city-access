{{ config(materialized='table',
indexes=[])}}

with max as (
    select max(amenity)          max_amenity,
           max(public_transport) max_public_transport,
           max(leisure)          max_leisure,
           max(shop)             max_shop,
           max(public_transport),
           max(office)           max_office
    from {{ref('h3_r8_population_centers')}}
)
select amenity::float / max_amenity                   amenity,
       shop::float / max_shop                         shop,
       leisure::float / max_leisure                   leisure,
       public_transport::float / max_public_transport public_transport,
       office::float / max_office                     office
from {{ref('h3_r8_population_centers')}}
         cross join max
order by total desc
limit 5