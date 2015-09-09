angular.module("angular-table-restful-example").controller("apiCtrl", ["$http", function($http) {
  var vm = this;

  vm.clear = clear;
  vm.refresh = refresh;
  vm.hasData = hasData;

  //Keep in mind that without the 'changeEvent' function, the API Pagination will NOT work.
  vm.myTableConfig = {
    changeEvent: tableChangeEvt,
    loadOnStartup: true //Responsible to load the table when page loads.
  };

  function tableChangeEvt(pageInfo, deferred) {
    //Take a look at it and see the functionalities that you can use.
    console.log('vm.myTableConfig', vm.myTableConfig);

    var page = 'page' + pageInfo.pageNo + '.json';

    $http.get('api/' + page).then(function(successData){
      vm.apiError = false;
      var data = prepareData(successData.data);
      deferred.resolve(data);
    }, function(errorData){
      vm.apiError = true;
    });
  }

  //This function could be an interceptor, just treat the API response
  function prepareData(data){
    var extractedData = [];

    extractedData = data.pageItems;

    //totalCount -> Total count of all items (e.g.: 3 pages with 5 items each, totalCount: 15).
    extractedData.totalCount = data.totalCount;

    //pageNo -> The page that the API will retreive (same value that the pageInfo.pageNo has).
    extractedData.pageNo = data.pageNo;

    return extractedData;
  }

  //These are some examples of functionalities that you can use.
  //For a full view check out the 'vm.myTableConfig' object at the console log or the docs.
  function refresh(){
    vm.myTableConfig.refresh();
  }

  function clear(){
    vm.myTableConfig.clearData(); 
  }

  function hasData(){
    return vm.myTableConfig.hasData(); 
  }

}])