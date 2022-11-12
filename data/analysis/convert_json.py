import json

f = open('/home/zacharydeziel/Documents/dbt-city-access/data/analysis/city_centers.json')
d = json.load(f)

new_d = []
for el in d:
    new_el = []
    for key in el:
        key_pair = {}
        key_pair['axis'] = key
        key_pair['value'] = el[key]
        new_el.append(key_pair)
    new_d.append(new_el)

with open('/home/zacharydeziel/Documents/dbt-city-access/data/analysis/city_centers_formatted.json', 'w') as outfile:
    json.dump(new_d, outfile)
