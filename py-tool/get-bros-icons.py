#!/usr/bin/env python3

import asyncio
import re
from urllib.request import urlretrieve

import bs4
import numpy as np
import requests

all_icon_names = []

for page in range(1, 6):
  print(f"get page {page}", end="")

  url = "https://www.iconbros.com/"
  par = {'page': page}
  r = requests.get(url, params=par)

  soup = bs4.BeautifulSoup(r.text, 'lxml')

  ss = [str(a['href'])[7:] for a in soup.find_all('a', {'href': re.compile('/icons/.*')})]
  all_icon_names.extend(ss)
  print(f" for {len(ss)} icons.")

print(len(all_icon_names))
all_icon_names = np.unique(all_icon_names)
print(len(all_icon_names))

print("start grab all icons")

with open('index.ts', "w") as f:
  names = ",\n  ".join(map(lambda s: f"'{s}.svg'", all_icon_names))
  f.write(f'export const brosIcons = [{names}];')

loop = asyncio.get_event_loop()

maxLen = max(map(len, all_icon_names))

tasks = []
tasks2 = []


async def send_req(icon_name: str):
  print(f"get icon {icon_name} number.")
  res = await loop.run_in_executor(None, requests.get, f"https://www.iconbros.com/icons/{icon_name}")
  raw_number_path = bs4.BeautifulSoup(res.text, 'lxml') \
    .find('form', {'action': re.compile('/icons/\\d+/download_svg_file\\?type=svg')})['action']
  n = str(raw_number_path)[1:].split('/')[1]
  svg_url = f"https://www.iconbros.com/icons/{n}/download_svg"
  lab = f"{icon_name.ljust(maxLen)} : {n.ljust(8)}"
  tasks2.append(loop.create_task(download_icon(icon_name, lab, svg_url)))


async def download_icon(icon_name, lab, svg_url):
  print(f"{lab} => download {svg_url}")
  await loop.run_in_executor(None, urlretrieve, svg_url, f"./icons/{icon_name}.svg")
  print(f"{lab} => OK")


for icon in all_icon_names:
  task = loop.create_task(send_req(icon))
  tasks.append(task)

loop.run_until_complete(asyncio.wait(tasks))
print('download svg')
loop.run_until_complete(asyncio.wait(tasks2))
