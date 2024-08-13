import requests
from bs4 import BeautifulSoup
import re

# Fetch the HTML of the page
url = "https://mariomatkovski.com/danyresto/"
response = requests.get(url)
html_content = response.text

# Parse the HTML
soup = BeautifulSoup(html_content, 'html.parser')

# Find the div with the class 'top-bar-area'
div = soup.find('div', class_='top-bar-area')

# Get the HTML for the div
div_html = str(div)

# Find the CSS
css_rules = []
css_links = soup.find_all('link', rel='stylesheet')
for link in css_links:
    css_url = link.get('href')
    if css_url.startswith('http'):
        css_response = requests.get(css_url)
    else:
        css_response = requests.get(url + css_url)
    css_content = css_response.text
    # Extract CSS rules for the class
    css_rules.extend(re.findall(r'\.top-bar-area[^{]*\{[^}]*\}', css_content, re.MULTILINE))

# Write the HTML and CSS to files
with open('top_bar_area.html', 'w') as html_file:
    html_file.write(div_html)

with open('top_bar_area.css', 'w') as css_file:
    css_file.write('\n'.join(css_rules))

print("HTML and CSS for the class 'top-bar-area' have been saved to 'top_bar_area.html' and 'top_bar_area.css'.")
