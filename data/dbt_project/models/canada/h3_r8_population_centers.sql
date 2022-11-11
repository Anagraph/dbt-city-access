{%
    set column_names = ['amenity', 'shop', 'leisure', 'public_transport', 'railway', 'office', 'total']
%}


select
    {% for column_name in column_names %}
    sum(a.{{ column_name }}) as {{ column_name }},
    max(a.{{ column_name }}) as {{ column_name }}_max,
    min(a.{{ column_name }}) as {{ column_name }}_min,
    avg(a.{{ column_name }}) as {{ column_name }}_avg,
    stddev(a.{{ column_name }}) as {{ column_name }}_stddev,
    {% endfor %}
    b.name, b.id, b.geom
from {{ref ('h3_r8_ratios')}} a, {{ref ('population_centers')}} b
where a.geom && b.geom and st_intersects(a.geom, b.geom)
group by b.name, b.id, b.geom