

### 이미지 빌드
<pre><code> docker build -t test_db:1.0.0 . </code></pre>  

### 컨테이너 생성 및 실행
<pre><code> docker run -p 3310:3306 --name test -d test_db:1.0.0 </code></pre>  

<br/>
