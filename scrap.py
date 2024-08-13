import requests

url = "https://preview.themeforest.net/item/danyresto-food-restaurant-template/full_screen_preview/23231116?_ga=2.184706345.108539233.1548503133-1724650462.1542981147&_gac=1.183314706.1548672922.EAIaIQobChMI8"

src = requests.get(url).text
f = open("main_page.html", "w")
f.write(src)
f.close()
