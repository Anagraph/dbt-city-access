{% test is_qualified_geometry(model, column_name ) %}
select *
from geometry_columns
where (
    f_table_schema = '{{ model.schema }}'
and f_table_name = '{{ model.table }}'
    )
and (
    srid <> 3857
or type not in ('MULTILINESTRING',
'LINESTRING',
'MULTIPOINT',
'POINT',
'MULTIPOLYGON',
'POLYGON'))
{% endtest %}
