angular.module("jedi-table-example").controller("basicExampleCtrl", ["personList", function(personList) {
	var vm = this;

  	vm.list = personList;
}]);