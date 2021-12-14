# 使用方式
裝好docker後 先去把目錄底下mongoDB資料夾刪除
接著在專案路徑底下輸入cmd
docker-compose up

去docker內看容器是否都成功運行
沒成功運行，我們碰過的原因:
  1. 可能為有地方占用了port:80 or 8081 or 27017 (80可能是Apache) 

重試方法:
  1. 執行 docker-compose down 把容器刪掉
  2. 使用docker指令或者直接使用docker 把diarydb_app這個image刪除
  3. 重新跑docker-compose up

# 成功執行後:

  ## 先發送請求(HTTP GET)
    localhost/user 
  查看是否有使用者
  ## 沒有的話要發送請求(HTTP POST)
    localhost/user 
 來新增我們的測試使用者

  ## 新增日記測試(HTTP POST):
    localhost/user/genewang7@gmail.com/Uncategorized 
    
  POST測試內容(json):
    {
        "title": "MYDIARY",
        "content": "# SHGSDIG;ASIHGIS;G",
        "date": "2021-12-14T03:24:03.572+00:00",
        "tag": ["tagSSSS"],
        "filesURL": ["filesSSSS"],
        "picURL": ["picSSSS"],
        "videoURL": ["videosSSSS"],
        "isFavored": false
    }

  ## 透過title取得日記 (HTTP GET) :
    localhost/user/genewang7@gmail.com/Uncategorized/MYDIARY
  (使用者email:genewang7@gmail.com下的資料夾名稱:Uncategorized下的title為MYDIARY的日記)


  ## 關鍵字查詢取得日記透過title (HTTP GET)
    localhost/search/1?condition=title&search_query=mydiary
  ## 關鍵字查詢取得日記透過content (HTTP GET)
    localhost/search/1?condition=content&search_query=SHGSDIG
  ## 關鍵字查詢取得日記透過tags (HTTP GET)
    localhost/search/1?condition=tags&search_query=tagSSSS
  ## 透過日期取得日記 (HTTP GET)
    localhost/date/genewang7@gmail.com?date=20211214
  ## 將日記新增至指定資料夾 (HTTP POST)
    localhost/genewang7@gmail.com/Uncategorized
  POST測試內容(json):
    {
        "title": "MYDIARY1",
        "content": "# SHGSDIG;ASIHGIS;G",
        "date": "2021-12-14T03:24:03.572+00:00",
        "tag": ["tagSSSS"],
        "filesURL": ["filesSSSS"],
        "picURL": ["picSSSS"],
        "videoURL": ["videosSSSS"],
        "isFavored": false
    }
   
   ## 修改特定title的日記內容 (HTTP PUT)
     localhost/genewang7@gmail.com/Uncategorized/MYDIARY
  PUT測試內容(json):
    {
        "title": "MYDIARY",
        "content": "# Hello;ASIHGIS;G",
        "date": "2021-12-14T03:24:03.572+00:00",
        "tag": ["tagSSSS"],
        "filesURL": ["filesSSSS"],
        "picURL": ["picSSSS"],
        "videoURL": ["videosSSSS"],
        "isFavored": false
    }
    
   ## 透過title刪除日記 (HTTP DELETE)
     localhost/genewang7@gmail.com/Uncategorized/MYDIARY1
  
    
    
