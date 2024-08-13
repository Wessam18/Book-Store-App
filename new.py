import requests

url = "https://potasta.com/"
src = requests.get(url).text
f = open("new.html", "w")
f.write(src)
f.close()
