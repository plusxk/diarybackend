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
  ## 先發送請求 (HTTP GET)
    localhost/user 
  查看是否有使用者
  ## 沒有的話要發送請求 (HTTP POST)
    localhost/user 
 來新增我們的測試使用者


  ## 登入&帳戶管理系統
  ### 註冊使用者 (HTTP POST):
    localhost/signUp

  POST測試內容(json):
    {
        "email": "123456@google.com",
        "password": "tttttt"
    }

  ### 寄送驗證碼入信箱 (HTTP POST):
    localhost/mail
  
  ### 登入 (HTTP POST):
    localhost/login

  POST測試內容(json):
    {
        "email": "123456@google.com",
        "password": "tttttt"
    }

  ### 驗證是否登入 (HTTP POST):
    localhost/checkLogin

  ### 忘記密碼 (HTTP POST):
    localhost/randomPassword
  (寄出隨機密碼入信箱)

  ### 重設密碼 (HTTP POST):
    localhost/resetPassword


  ## 日記&資料夾系統
  ### 新增資料夾 (HTTP POST):
    localhost/user/:email/folder
    ex: localhost/user/genewang7@gmail.com/folder

  POST測試內容(json):
    {
        folderName: 'MYFOLDER'
    }

  ### 取得所有資料夾 (HTTP GET):
    localhost/user/:email/folder
    ex: localhost/user/genewang7@gmail.com/folder

  ### 透過folderName取得特定資料夾 (HTTP GET):
    localhost/user/:email/:folderName
    ex: localhost/user/genewang7@gmail.com/Uncategorized

  ### 重新命名資料夾 (HTTP PUT):
    localhost/user/:email/:folderName
    ex: localhost/user/genewang7@gmail.com/MYFOLDER

  POST測試內容(json):
    {
        folderName: 'mYfOlDeR'
    }

  ### 刪除資料夾 (HTTP DELETE):
    localhost/user/:email/:folderName
    ex: localhost/user/genewang7@gmail.com/MYFOLDER

  ### 新增日記 (HTTP POST):
    localhost/user/:email/:folderName
    ex: localhost/user/genewang7@gmail.com/Uncategorized 
    
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

  *前端GET日記內容請用"markdown"這個atrribute而非"content"*

  ### 透過title取得日記 (HTTP GET):
    localhost/user/:email/:folderName/:title
    ex: localhost/user/genewang7@gmail.com/Uncategorized/MYDIARY
  (使用者email:genewang7@gmail.com下的資料夾名稱:Uncategorized下的title為MYDIARY的日記)

  ### 關鍵字查詢取得日記透過title (HTTP GET):
    localhost/search/:email
    ex: localhost/search/1?condition=title&search_query=mydiary
  ### 關鍵字查詢取得日記透過content (HTTP GET):
    localhost/search/:email
    ex: localhost/search/1?condition=content&search_query=SHGSDIG
  ### 關鍵字查詢取得日記透過tags (HTTP GET):
    localhost/search/:email
    ex: localhost/search/1?condition=tags&search_query=tagSSSS

  ### 透過日期取得日記 (HTTP GET):
    localhost/date/:email
    ex: localhost/date/genewang7@gmail.com?date=20211214
  ### 將日記新增至指定資料夾 (HTTP POST):
    localhost/user/:email/:folderName
    ex: localhost/genewang7@gmail.com/Uncategorized
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
   
  ### 修改日記 (HTTP PUT):
    localhost/user/:email/:folderName/:title
    ex: localhost/genewang7@gmail.com/Uncategorized/MYDIARY
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
    
  ### 刪除日記 (HTTP DELETE):
    localhost/user/:email/:folderName/:title
    ex: localhost/genewang7@gmail.com/Uncategorized/MYDIARY
  
  ### 分享連結 (HTTP GET):
    localhost/shareLink/:email/:folderName/:title
    ex: localhost/shareLink/genewang7@gmail.com/Uncategorized/mydiary

  ## 管理員系統
  ### 透過email取得使用者 (HTTP GET):
    localhost/user/:email
    ex: localhost/user/genewang7@gmail.com

  ### 透過email刪除使用者 (HTTP DELETE):
    localhost/user/:email
    ex: localhost/user/genewang7@gmail.com