import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

# Define the URL and the base directory to save the files
url = "https://mariomatkovski.com/danyresto/"
base_dir = "downloaded_site"

# Create the base directory if it does not exist
if not os.path.exists(base_dir):
    os.makedirs(base_dir)

# Function to save a file from a URL
def save_file(url, path):
    response = requests.get(url)
    with open(path, 'wb') as file:
        file.write(response.content)

# Get the HTML content of the page
response = requests.get(url)
html_content = response.text

# Save the HTML content
html_path = os.path.join(base_dir, "index.html")
with open(html_path, 'w') as file:
    file.write(html_content)

# Parse the HTML to find linked CSS files
soup = BeautifulSoup(html_content, 'html.parser')
css_files = [link.get('href') for link in soup.find_all('link', rel='stylesheet')]

# Download each CSS file
for css_file in css_files:
    css_url = urljoin(url, css_file)
    css_path = os.path.join(base_dir, os.path.basename(css_file))
    save_file(css_url, css_path)

print("HTML and CSS files have been downloaded.")
