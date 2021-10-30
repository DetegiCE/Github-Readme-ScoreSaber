from urllib.request import Request, urlopen
import json
import os
from github import Github

url = 'https://new.scoresaber.com/api/players/'
left = 500
right = 1000
pp500rank = -1

while True:
    mid = (left + right) // 2
    req = Request(url+str(mid), headers={'User-Agent', 'Mozilla/5.0'})
    req.get_method = lambda: 'GET'
    res = urlopen(req).read()
    cc = json.loads(res)
    if cc['players'][0]['pp'] >= 500 and cc['players'][49]['pp'] <= 500:
        for i in range(49):
            if cc['players'][i]['pp'] >= 500 and cc['players'][i+1]['pp'] <= 500:
                pp500rank = cc['players'][i]['rank']
                break
        if pp500rank == -1:
            pp500rank = cc['players'][49]['rank']
        break
    elif cc['players'][49]['pp'] > 500:
        left = mid + 1
    elif cc['players'][0]['pp'] < 500:
        right = mid - 1
