with open("/home/zacharydeziel/Documents/dbt-city-access/data/pois/uac_filter.txt", "r") as f:
    l = f.readlines()

level_0 = [el.replace('=\n', '') for el in l if el[0] != " " and el != "\n"]

group_idxs = []
for i in range(len(l)):
    if l[i] == "\n":
        group_idxs.append(i)

separated = []
for i in range(len(group_idxs)):
    if i == 0:
        separated.append(l[:group_idxs[i]])
    else:
        separated.append(l[group_idxs[i - 1] + 1:group_idxs[i]])

separated.append(l[82:])

new_gs = []
for g in separated:
    new_g = [
        [el.replace('  =', '').replace('\n', '').split(" ")[0], el.replace('  =', '').replace('\n', '').split(" ")[1]]
        for el in g if el[0] == " "]
    new_gs.append(new_g)

d = {}
for i in range(len(level_0)):
    d[level_0[i]] = new_gs[i]

print(d)

with open("groups.csv", "w+") as f:
    f.write("group_name,subgroup,code\n")
    for key in d:
        for el in d[key]:
            f.write(f"{key},{el[0]},{el[1]}\n")
