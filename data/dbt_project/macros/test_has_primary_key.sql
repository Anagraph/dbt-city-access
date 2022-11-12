{% test has_primary_key(model) %}
select count(*)
from information_schema.table_constraints tc
where constraint_type = 'PRIMARY KEY'
  and tc.constraint_schema = '{{ model.schema }}'
  and tc.table_name = '{{ model.table }}'
having count(*) <> 1
{% endtest %}