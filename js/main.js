Vue.component('paginate', VuejsPaginate)
const page_size = 5;

var app = new Vue({
    el: '#app',
    data:{
        data:[], 
        sortName: "", 
        isReverse: false,
        currentPage: 1,
        pageCount: 1,
    },
    created: function(){ 
        this.getData();
    },
    watch: {
        data: function(){ 
            this.setPage2Model();
        }
    },
    methods: {
        getData: function(){ 
            const vm = this;
            const api = 'https://script.google.com/macros/s/AKfycbzl6KKgb4v2-F3SCVxVaXjnMwM_XQvnk2A08nw7NjmGfuRVmak0/exec?url=http://interview.tripresso.com/tour/search?page=2&row_per_page=5&sort=price_asc';
            $.get(api).then(function( response ) { 
                vm.data = response.data.tour_list;  
                console.log(vm.data)
              });
        },
        startSort: function(sortName){   
              this.isReverse = !this.isReverse;         
              this.sortName = sortName;
          },  
        setPage2Model: function(){
            let vm = this;
            let err = vm.data.length;
            if (err <= 0) {  
                vm.pageCount = 1;
            }else{
                vm.pageCount = parseInt(err / page_size) + (err % page_size > 0 ? 1 : 0); 
                for (let i = 0; i < err; i++){
                    vm.$set(vm.data[i], "paginate", parseInt(i / page_size) + 1); 
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
        filterData: function(){ 
            let vm = this;
            let err = vm.data.length;
            let data = vm.data.sort(function(a,b){ 
                a = a [vm.sortName];
                b = b [vm.sortName];              
                return vm.isReverse ? b-a : a-b;                
            })
            if (err > 0) {
                return vm.data.filter(function (x) {
                    return x.paginate === vm.currentPage;                  
                })
            }
            return data;            
        }
    }    
})