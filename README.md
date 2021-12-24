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
    localhost/resendCode
    
  ### 確認驗證碼 (HTTP POST):
    localhost/verify
    
  POST測試內容(json):
    {
        "email": "123456@google.com",
        "code": "3518"
    }
  
  ### 登入(登入成功後，前端要將token存到cookie) (HTTP POST):
    localhost/login

  POST測試內容(json):
    {
        "email": "123456@google.com",
        "password": "tttttt"
    }

  ### 驗證是否登入(headers裡面放token，傳到後端check Token) (HTTP POST):
    localhost/checkLogin

  ### 忘記密碼(僅輸入email即可) (HTTP POST):
    localhost/randomPassword
  (寄出隨機密碼入信箱)

  ### 重設密碼 (HTTP POST):
    localhost/resetPassword
  POST測試內容(json):
    {
        "email": "123456@google.com",
        "password": "tttttt",
        "newPassword": "ssssss"
    }


  ## 日記&資料夾系統
  ### 新增資料夾 (HTTP POST):
    localhost/user/:email/folder
    ex: localhost/user/genewang7@gmail.com/folder

  POST測試內容(json):
    {
        folderName: 'MYFOLDER'
    }
  
  回傳狀態:正常->200
          發現相同資料夾->409

  ### 取得所有資料夾 (HTTP GET):
    localhost/user/:email/folder
    ex: localhost/user/genewang7@gmail.com/folder

  回傳狀態:正常->200

  ### 透過folderName取得特定資料夾 (HTTP GET):
    localhost/user/:email/:folderName
    ex: localhost/user/genewang7@gmail.com/Uncategorized

  回傳狀態:正常->200

  ### 重新命名資料夾 (HTTP PUT):
    localhost/user/:email/:folderName
    ex: localhost/user/genewang7@gmail.com/MYFOLDER

  POST測試內容(json):
    {
        folderName: 'mYfOlDeR'
    }

  回傳狀態:正常->200
          發現相同資料夾->409  

  ### 刪除資料夾 (HTTP DELETE):
    localhost/user/:email/:folderName
    ex: localhost/user/genewang7@gmail.com/MYFOLDER

  回傳狀態:正常->200  

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

  回傳狀態:正常->200
          發現相同日記->409 

  ### 透過title取得日記 (HTTP GET):
    localhost/user/:email/:folderName/:title
    ex: localhost/user/genewang7@gmail.com/Uncategorized/MYDIARY
  (使用者email:genewang7@gmail.com下的資料夾名稱:Uncategorized下的title為MYDIARY的日記)

  回傳狀態:正常->200

  ### 關鍵字查詢取得日記透過title (HTTP GET):
    localhost/search/:email
    ex: localhost/search/1?condition=title&search_query=mythirddiary

  回傳狀態:正常->200

  ### 關鍵字查詢取得日記透過content (HTTP GET):
    localhost/search/:email
    ex: localhost/search/1?condition=content&search_query=SHGSDIG

  回傳狀態:正常->200

  ### 關鍵字查詢取得日記透過tags (HTTP GET):
    localhost/search/:email
    ex: localhost/search/1?condition=tags&search_query=tagSSSS

  回傳狀態:正常->200

  ### 透過日期取得日記 (HTTP GET):
    localhost/date/:email
    ex: localhost/date/genewang7@gmail.com?date=20211214

  回傳狀態:正常->200

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

  回傳狀態:正常->200
          發現相同日記->409 
   
  ### 修改日記 (HTTP PUT):
    localhost/user/:email/:folderName/:title
    ex: localhost/user/genewang7@gmail.com/Uncategorized/MYDIARY

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

  回傳狀態:正常->200
          發現相同日記->409  
    
  ### 刪除日記 (HTTP DELETE):
    localhost/user/:email/:folderName/:title
    ex: localhost/user/genewang7@gmail.com/Uncategorized/MYDIARY

  回傳狀態:正常->200  
  
  ### 分享連結 (HTTP GET):
    localhost/shareLink/:email/:folderName/:title
    ex: localhost/shareLink/genewang7@gmail.com/Uncategorized/mydiary

  ### 上傳圖片 (HTTP POST):
    localhost/fileupload

  ## 管理員系統
  ### 透過email取得使用者 (HTTP GET):
    localhost/user/:email
    ex: localhost/user/genewang7@gmail.com

  回傳狀態:正常->200  

  ### 透過email刪除使用者 (HTTP DELETE):
    localhost/user/:email
    ex: localhost/user/genewang7@gmail.com

  回傳狀態:正常->200  

    
  # 注意事項
  __前端GET日記內容請用"markdown"這個atrribute而非"content"__  
  __前端在讀取本地端檔案時請將name設為"myfile"__