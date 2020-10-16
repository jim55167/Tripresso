Git pages：https://jim55167.github.io/Tripresso-Vue.js/
# feat:
#### 因應需求增加排序功能:
isReverse預設為false，sortName=" "
當isReverse為false時，反之isReverse為true
將this.sortName指向參數
![](https://i.imgur.com/wJwlR5O.png)</br>

使用sort來改變陣列的排序內容
假設isReverse為false，則改變內容</br>
![](https://i.imgur.com/5PIv8Cx.png)

先將starSort的function帶入li標籤
接著動態新增class名稱為:inverse
再加入v-if變數為每個sortName增加名稱</br>
![](https://i.imgur.com/cCA2vik.png)

#### 因應需求增加paginate功能:(無篩選功能時)
[參考套件](https://github.com/lokyoung/vuejs-paginate)

指定每頁只顯示五筆資料</br>
![](https://i.imgur.com/S0Fuc94.png)

pageCount頁數計算:
vm.data.length總共10筆資料
(10/5)=2，10%5,餘數=0
因此pageCount為2頁

※假設vm.data.length為21筆資料
(21/5)=4，(21%5),餘數=1
則pageCount為5頁;

跑for迴圈
在每筆vm.data內加入paginate(索引直)</br>
![](https://i.imgur.com/UTtB29K.png)

在filterData資料內加入頁碼切換
假如資料筆數>0
則回傳資料</br>
![](https://i.imgur.com/98E2Ws6.png)
