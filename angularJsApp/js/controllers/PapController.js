/* Setup blank page controller */
angular.module('MetronicApp').controller('PapController', ['$rootScope', '$scope', 'settings','$http', function ($rootScope, $scope, settings,$http) {
    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        App.initAjax();

        // set default layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
    });
    $scope.people = [{
        name: 'Adam',
        email: 'adam@email.com',
        age: 12,
        country: 'United States'
    }, {
        name: 'Amalie',
        email: 'amalie@email.com',
        age: 12,
        country: 'Argentina'
    }, {
        name: 'Estefanía',
        email: 'estefania@email.com',
        age: 21,
        country: 'Argentina'
    }, {
        name: 'Adrian',
        email: 'adrian@email.com',
        age: 21,
        country: 'Ecuador'
    }, {
        name: 'Wladimir',
        email: 'wladimir@email.com',
        age: 30,
        country: 'Ecuador'
    }, {
        name: 'Samantha',
        email: 'samantha@email.com',
        age: 30,
        country: 'United States'
    }, {
        name: 'Nicole',
        email: 'nicole@email.com',
        age: 43,
        country: 'Colombia'
    }, {
        name: 'Natasha',
        email: 'natasha@email.com',
        age: 54,
        country: 'Ecuador'
    }, {
        name: 'Michael',
        email: 'michael@email.com',
        age: 15,
        country: 'Colombia'
    }, {
        name: 'Nicolás',
        email: 'nicolas@email.com',
        age: 43,
        country: 'Colombia'
    }];

    //code for autoSuggest data
    "use strict";

    $scope.searchItems = ["windows", "linux","cSharp","apple"];
    //Sort Array

    $scope.searchItems.sort();

    //Define Suggestions List
    $scope.suggestions = [];
    //Define Selected Suggestion Item
    $scope.selectedIndex = -1;

    //Function To Call On ng-change
    $scope.search = function () {
        $scope.suggestions = [];
        var myMaxSuggestionListLength = 0;
        for (var i = 0; i < $scope.searchItems.length; i++) {
            var searchItemsSmallLetters = angular.lowercase($scope.searchItems[i]);
            var searchTextSmallLetters = angular.lowercase($scope.searchText);
            if (searchItemsSmallLetters.indexOf(searchTextSmallLetters) !== -1) {
                $scope.suggestions.push(searchItemsSmallLetters);
                myMaxSuggestionListLength += 1;
                if (myMaxSuggestionListLength === 5) {
                    break;
                }
            }
        }
    };

    //Keep Track Of Search Text Value During The Selection From The Suggestions List  
    $scope.$watch('selectedIndex', function (val) {
        if (val != -1) {
            $scope.searchText = $scope.suggestions[$scope.selectedIndex];
        }
    });

    //Text Field Events
    //Function To Call on ng-keydown
    $scope.checkKeyDown = function (event) {
        if (event.keyCode === 40) {//down key, increment selectedIndex
            event.preventDefault();
            if ($scope.selectedIndex + 1 < $scope.suggestions.length) {
                $scope.selectedIndex++;
            } else {
                $scope.selectedIndex = 0;
            }
        } else if (event.keyCode === 38) { //up key, decrement selectedIndex
            event.preventDefault();
            if ($scope.selectedIndex - 1 >= 0) {
                $scope.selectedIndex--;
            } else {
                $scope.selectedIndex = $scope.suggestions.length - 1;
            }
        } else if (event.keyCode === 13) { //enter key, empty suggestions array
            event.preventDefault();
            $scope.suggestions = [];
            $scope.selectedIndex = -1;
            $scope.$emit("searchT", $scope.searchText);

        } else if (event.keyCode === 27) { //ESC key, empty suggestions array
            event.preventDefault();
            $scope.suggestions = [];
            $scope.selectedIndex = -1;
        } else {
            $scope.search();
        }
    };

    //ClickOutSide
    var exclude1 = document.getElementById('textFiled');
    $scope.hideMenu = function ($event) {
        $scope.search();
        //make a condition for every object you wat to exclude
        if ($event.target !== exclude1) {
            $scope.suggestions = [];
            $scope.selectedIndex = -1;
        }
    };
    //======================================

    //Function To Call on ng-keyup
    $scope.checkKeyUp = function (event) {
        if (event.keyCode !== 8 || event.keyCode !== 46) {//delete or backspace
            if ($scope.searchText === "") {
                $scope.suggestions = [];
                $scope.selectedIndex = -1;
            }
            $scope.$emit("searchT", $scope.searchText);

        }
    };
    //======================================

    //List Item Events
    //Function To Call on ng-click

    $scope.AssignValueAndHide = function (index) {
        $scope.searchText = $scope.suggestions[index];
        $scope.$emit("searchT", $scope.searchText);
        $scope.suggestions = [];
        $scope.selectedIndex = -1;
    };
    //======================================

}]);
