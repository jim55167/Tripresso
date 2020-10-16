Vue.component('paginate', VuejsPaginate)

var app = new Vue({
    el: '#app',
    data:{
        data:[], 
        sortName: "",
        filter: '',
        isReverse: false, 
        currentPage: 1,
        pageCount: 1,
        page_size: 4,
    },
    created: function(){ 
        this.getData();
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
        pageCallback: function(pageNum) {
            let vm = this;
            vm.$set(vm, 'currentPage', pageNum);
            console.log(pageNum)
        },
    },
    computed: {
        filterData: function(){ 
            let vm = this;
            let err = vm.data.length;
            let arr = vm.page_size;
            let data = vm.data.sort(function(a,b){ 
                a = a [vm.sortName];
                b = b [vm.sortName];              
                return vm.isReverse ? b-a : a-b;                
            })
            if (vm.filter === '') {
               let pageTotal = err % arr === 0 ? err / arr : Math.ceil(err / arr);
               let pageNumber = 1;
               vm.pageCount = pageTotal;
               vm.data.forEach(function(item,index){
                   if(index < (arr * pageNumber)){
                       vm.$set(item, "paginate", pageNumber);
                   }
                   if((index + 1) === (arr * pageNumber) && pageNumber < pageTotal){
                       pageNumber++                       
                   }
                   console.log(item);
               })
               let pageData = vm.data.filter(function(item){
                   return item.paginate === vm.currentPage;
               })
               return pageData;
            }
            return data;            
        }
    }    
})