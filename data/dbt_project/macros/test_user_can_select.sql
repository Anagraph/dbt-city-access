{% test user_can_select(model, user_name) %}
with count_role as (
SELECT count(*)	cnt
FROM information_schema.table_privileges
WHERE table_schema  = '{{ model.schema }}' and
		table_name = '{{ model.table }}' and
		privilege_type = 'SELECT' and
		grantee = '{{ user_name }}' )
select cnt from count_role where cnt <> 1
{% endtest %}