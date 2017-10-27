angular.module('MetronicApp').controller('autoCompleteController', function ($http, $scope) {
    "use strict";

    $http.get("json/Tags.json").then(function (response) {
        // $scope.searchItems = response.data.ProductTags;
        $scope.searchItems = ["Alfreds Futterkiste",
            "Berglunds snabbköp",
            "Centro comercial Moctezuma",
            "Ernst Handel"]
        //Sort Array

        $scope.searchItems.sort();

    });


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

});