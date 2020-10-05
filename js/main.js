Vue.component('paginate', VuejsPaginate)
const page_size = 5;

var app = new Vue({
    el: '#app',
    data:{
        data:[],  //設定空白欄位，陣列為空
        sortName: "", //空白字串
        isReverse: false,  //預設isReverse為false
        currentPage: 1,
        pageCount: 1,
    },
    created: function(){ //使用created呼叫json內的getData
        this.getData();
    },
    watch: {
        data: function(){   //監聽整個data，將setPage2Model呼叫出來
            this.setPage2Model();
        }
    },
    methods: {
        getData: function(){ //Ajax傳入api
            const vm = this; //設定vm = this
            const api = 'https://script.google.com/macros/s/AKfycbzl6KKgb4v2-F3SCVxVaXjnMwM_XQvnk2A08nw7NjmGfuRVmak0/exec?url=http://interview.tripresso.com/tour/search?page=2&row_per_page=5&sort=price_asc';
            $.get(api).then(function( response ) { //取得api網址,並加入參數:response
                vm.data = response.data.tour_list;  
                console.log(vm.data)
              });
        },
        startSort: function(sortName){   
              this.isReverse = !this.isReverse; //:class的isReverse預設為true，否則的話為false             
              this.sortName = sortName;
          },  
        setPage2Model: function(){
            let vm = this;
            let err = vm.data.length;
            if (err <= 0) {  //假如data裡的資料小於or等於0，則paginate會顯示1頁
                vm.pageCount = 1;
            }else{
                vm.pageCount = parseInt(err / page_size) + (err % page_size > 0 ? 1 : 0); //假如err=38，page_size=5，則第一個(7.6)+(1) =>parseInt('8')
                for (let i = 0; i < err; i++){
                    vm.$set(vm.data[i], "paginate", parseInt(i / page_size) + 1); //+1的意思是，因為長度皆從0開始，+1從1開始
                }
            }
        },       
        pageCallback: function(pageNum) {
            let vm = this;
            this.$set(vm, 'currentPage', pageNum);
            console.log(pageNum)
        },
    },
    computed: {
        filterData: function(){ //資料排序
            let vm = this;
            let err = vm.data.length;
            let data = vm.data.sort(function(a,b){ //sort針對a,b陣列進行順序排列
                a = a [vm.sortName];
                b = b [vm.sortName];              
                return vm.isReverse ? b-a : a-b;                
            })
            if (err > 0) {    //data.length>0，則paginate必須等於當前頁面才return
                return vm.data.filter(function (x) {
                    return x.paginate === vm.currentPage;                  
                })
            }
            return data;            
        }
    }    
})