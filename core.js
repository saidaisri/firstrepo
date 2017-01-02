var app = angular.module('sriemp', []);

app.directive("aasriDirective", function() {
    return {
        template : '<fieldset class="align-center" style="width: 100px; text-align:center;">\
  <legend><b>Employee Registered</b></legend>\
  \
	<table border="1">\
		<tr>\
			<td colspan="2"> \
			  <div id="errorBox" style="color: red"></div> <div id="sucBox" style="color: green"></div>\
			</td>\
		</tr>\
		\
		<tr data-ng-repeat="user in users track by $index">\
			<td> {{ user.first_name }} </td>\
			<td> {{ user.last_name }} </td>\
			<td> {{ user.e_id }} </td>\
			<td> {{ user.e_mail }} </td>\
			<td> {{ user.pass }} </td>\
			<td> {{ user.phone }} </td>\
			<td> {{ user.address }} </td>\
			<td> {{ user.country }} </td>\
			<td> {{ user.state }} </td>\
			<td> {{ user.city }} </td>\
			<td> {{ user.pin_code }} </td>\
			<td> {{ user.gender }} </td>\
			<td> <a href="edit.html#/?email={{ user.e_mail }}"> Edit </a> </td>\
			<td> <a href="#" ng-click="deleteItem($index)"> Delete </a> </td>\
		</tr>\
	</table>\
\
  </fieldset>'
    };
});

app.directive('sriDirective', function(){
	return {
	  restrict: 'EA',
	  template : '<table border="1">\
		<tr>\
			<td colspan="2"> \
			  <div id="errorBox" style="color: red"></div> <div id="sucBox" style="color: green"></div>\
			</td>\
		</tr>\
	  \
	  <tr data-ng-repeat="user in usersd track by $index">\
			<td> {{ user.first_name }} </td>\
			<td> {{ user.last_name }} </td>\
			<td> {{ user.e_id }} </td>\
			<td> {{ user.e_mail }} </td>\
			<td> {{ user.pass }} </td>\
			<td> {{ user.phone }} </td>\
			<td> {{ user.address }} </td>\
			<td> {{ user.country }} </td>\
			<td> {{ user.state }} </td>\
			<td> {{ user.city }} </td>\
			<td> {{ user.pin_code }} </td>\
			<td> {{ user.gender }} </td>\
			<td> <a href="edit.html#/?email={{ user.e_mail }}"> Edit </a> </td>\
			<td> <a href="#" ng-click="deleteItem($index)"> Delete </a> </td>\
		</tr>\
		</table>',
	  scope: {
		usersd: '='
	  }
	};
});

app.controller('EditCtrl', ['$window', '$scope', '$filter', '$location', 'CustomerService', function ($window, $scope, $filter, $location, CustomerService) {
			
			$scope.countries = CustomerService.getCountry();

			$scope.getCountryStates = function () {
				$scope.sates = CustomerService.getCountryState($scope.emp.country);
				$scope.cities = [];
			}

			$scope.getStateCities = function () {
				$scope.cities = CustomerService.getStateCity($scope.emp.state);
			}			
			
			$scope.saved = localStorage.getItem('users');
			$scope.users = (localStorage.getItem('users')!==null) ? JSON.parse($scope.saved) : [ {"first_name":"Srivatsan","last_name":"Tharageswaran","e_id":"001","e_mail":"sri@think.com","pass":"pass","phone":"123","address":"XXX","country":3,"state":6,"city":31,"pin_code":"600015","gender":"male"} ];
			localStorage.setItem('users', JSON.stringify($scope.users));
			
			$scope.email = $location.search().email;
			
			var oldUsers = $scope.users;
			angular.forEach(oldUsers, function(user){
				
				if ($scope.email == user.e_mail) {
					
					$scope.sates = CustomerService.getCountryState(user.country);
					$scope.cities = CustomerService.getStateCity(user.state);
					$scope.emp = user;
				}
										
			});
			
			$scope.update = function(selected) {
				
			  $filter('filter')
				  ($scope.users, {"e_mail": selected})[0] = $scope.emp; //Retrieving Filtered Data
				
				//console.log(JSON.stringify($scope.users));
				localStorage.setItem('users', JSON.stringify($scope.users));
				
				$window.location.href = 'users.html';
			};
			
			$scope.deleteItem = function (index) {
				console.log('In : '+index);
				$scope.users.splice(index, 1);
				localStorage.setItem('users', JSON.stringify($scope.users));
			}
			
		}
	]);

app.controller('MainCtrl', ['$window', '$scope', 'CustomerService', function ($window, $scope, CustomerService) {

			$scope.countries = CustomerService.getCountry();

			$scope.getCountryStates = function () {
				$scope.sates = CustomerService.getCountryState($scope.emp.country);
				$scope.cities = [];
			}

			$scope.getStateCities = function () {
				$scope.cities = CustomerService.getStateCity($scope.emp.state);
			}
			
			$scope.emp = {};
			
			$scope.saved = localStorage.getItem('users');
			$scope.saved_usr = localStorage.getItem('login_user');
			
			console.log($scope.saved);
			console.log($scope.saved_usr);
			
			var emailRegex = /^[A-Za-z0-9._]*\@[A-Za-z]*\.[A-Za-z]{2,5}$/;
			var login_ok = false;
				
			sucBox.innerHTML = "";
			errorBox.innerHTML = "";
			
			$scope.users = (localStorage.getItem('users')!==null) ? JSON.parse($scope.saved) : [ {"first_name":"Srivatsan","last_name":"Tharageswaran","e_id":"001","e_mail":"sri@think.com","pass":"pass","phone":"123","address":"XXX","country":3,"state":6,"city":31,"pin_code":"600015","gender":"male"} ];
			localStorage.setItem('users', JSON.stringify($scope.users));
			
			$scope.login_user = (localStorage.getItem('login_user')!==null) ? JSON.parse($scope.saved_usr) : "Test Usr";
			
			//localStorage.removeItem('login_user');
			
			$scope.LoginEmp = function () {
				
				if (!$scope.emp.e_mail) {
					e_mail.focus();
					document.getElementById("errorBox").innerHTML = "Enter your email";
					return false;
				} else if (!emailRegex.test($scope.emp.e_mail)) {
					e_mail.focus();
					errorBox.innerHTML = "Enter a valid email";
					return false;
				}
				
				if (!$scope.emp.pass) {
					pass.focus();
					errorBox.innerHTML = "Enter a password";
					return false;
				}
				
				var oldUsers = $scope.users;
				angular.forEach(oldUsers, function(user){
					
					console.log(user);
					
					if ($scope.emp.e_mail == user.e_mail && $scope.emp.pass == user.pass) {
						
						localStorage.setItem('login_user', JSON.stringify(user));
						login_ok = true;
					}
											
				});
				
				if(login_ok == true) {
					$window.location.href = 'success.html';
				} else {
					errorBox.innerHTML = "Invalid Login";
					return false;
				}
				
			};
			
			$scope.createEmp = function () {

				if (!$scope.emp.first_name) {
					first_name.focus();
					errorBox.innerHTML = "Enter the first name";
					return false;
				}

				if (!$scope.emp.last_name) {
					last_name.focus();
					errorBox.innerHTML = "Enter the last name";
					return false;
				}

				if (!$scope.emp.e_id) {
					e_id.focus();
					errorBox.innerHTML = "Enter employee id";
					return false;
				}

				if (!$scope.emp.e_mail) {
					e_mail.focus();
					document.getElementById("errorBox").innerHTML = "Enter your email";
					return false;
				} else if (!emailRegex.test($scope.emp.e_mail)) {
					e_mail.focus();
					errorBox.innerHTML = "Enter a valid email";
					return false;
				}
				
				if (!$scope.emp.pass) {
					pass.focus();
					errorBox.innerHTML = "Enter a password";
					return false;
				}

				if (!$scope.emp.phone) {
					phone.focus();
					errorBox.innerHTML = "Enter your phone";
					return false;
				} else if (isNaN($scope.emp.phone)) {
					phone.focus();
					errorBox.innerHTML = "Enter a valid phone";
					return false;
				}

				if (!$scope.emp.address) {
					address.focus();
					document.getElementById("errorBox").innerHTML = "Enter your address";
					return false;
				}

				if (!$scope.emp.country) {
					country.focus();
					errorBox.innerHTML = "Select your country";
					return false;
				}

				if (!$scope.emp.state) {
					state.focus();
					errorBox.innerHTML = "Select your state";
					return false;
				}

				if (!$scope.emp.city) {
					city.focus();
					errorBox.innerHTML = "Select your city";
					return false;
				}

				if (!$scope.emp.pin_code) {
					pin_code.focus();
					errorBox.innerHTML = "Enter your Pin Code";
					return false;
				} else if (isNaN($scope.emp.pin_code)) {
					pin_code.focus();
					errorBox.innerHTML = "Enter a valid Pin Code";
					return false;
				}

				if ($scope.emp.gender[0].checked == false && $scope.emp.gender[1].checked == false) {
					errorBox.innerHTML = "Select your gender";
					return false;
				}
				
				var theJSON = JSON.stringify($scope.emp);
				//var uri = "data:application/json;charset=UTF-8," + encodeURIComponent(theJSON);
				
				$scope.users.push($scope.emp);
				localStorage.setItem('users', JSON.stringify($scope.users));
				$scope.emp = {};
				
				sucBox.innerHTML = "<a href=\"mylogin.html\">Registered. Login Here...</a>";
			};
		}
	]);

app.factory("CustomerService", ['$filter', function ($filter) {
			var service = {};

			var countrylist = [{
					"id" : 1,
					"country" : "USA"
				}, {
					"id" : 2,
					"country" : "Canada"
				}, {
					"id" : 3,
					"country" : "India"
				},
			];

			var statelist = [{
					"Id" : 1,
					"state" : "Alaska",
					"countryId" : 1
				}, {
					"Id" : 2,
					"state" : "California",
					"countryId" : 1
				}, {
					"Id" : 3,
					"state" : "New York",
					"countryId" : 1
				}, {
					"Id" : 4,
					"state" : "New Brunswick",
					"countryId" : 2
				}, {
					"Id" : 5,
					"state" : "Manitoba",
					"countryId" : 2
				}, {
					"Id" : 6,
					"state" : "Delhi",
					"countryId" : 3
				}, {
					"Id" : 7,
					"state" : "Bombay",
					"countryId" : 3
				}, {
					"Id" : 8,
					"state" : "Calcutta",
					"countryId" : 3
				}
			];

			var citylist = [{
					"Id" : 1,
					"city" : "Anchorage",
					"stateId" : 1
				}, {
					"Id" : 2,
					"city" : "Fairbanks",
					"stateId" : 1
				}, {
					"Id" : 3,
					"city" : "Lakes",
					"stateId" : 1
				}, {
					"Id" : 4,
					"city" : "Palmer",
					"stateId" : 1
				}, {
					"Id" : 5,
					"city" : "Adelanto",
					"stateId" : 2
				}, {
					"Id" : 6,
					"city" : "Artesia",
					"stateId" : 2
				}, {
					"Id" : 7,
					"city" : "Benicia",
					"stateId" : 2
				}, {
					"Id" : 8,
					"city" : "Clovis",
					"stateId" : 2
				}, {
					"Id" : 9,
					"city" : "Dublin",
					"stateId" : 2
				}, {
					"Id" : 10,
					"city" : "Manhattan",
					"stateId" : 3
				}, {
					"Id" : 11,
					"city" : "Bronx",
					"stateId" : 3
				}, {
					"Id" : 12,
					"city" : "Brooklyn",
					"stateId" : 3
				}, {
					"Id" : 13,
					"city" : "Queens",
					"stateId" : 3
				}, {
					"Id" : 14,
					"city" : "Staten Island",
					"stateId" : 3
				}, {
					"Id" : 15,
					"city" : "Bathurst",
					"stateId" : 4
				}, {
					"Id" : 16,
					"city" : "Campbellton",
					"stateId" : 4
				}, {
					"Id" : 17,
					"city" : "Dieppe",
					"stateId" : 4
				}, {
					"Id" : 18,
					"city" : "Edmundston",
					"stateId" : 4
				}, {
					"Id" : 19,
					"city" : "Fredericton",
					"stateId" : 4
				}, {
					"Id" : 20,
					"city" : "Miramichi",
					"stateId" : 4
				}, {
					"Id" : 21,
					"city" : "Moncton",
					"stateId" : 4
				}, {
					"Id" : 22,
					"city" : "Brandon",
					"stateId" : 5
				}, {
					"Id" : 23,
					"city" : "Dauphin",
					"stateId" : 5
				}, {
					"Id" : 24,
					"city" : "Flin Flon",
					"stateId" : 5
				}, {
					"Id" : 25,
					"city" : "Morden",
					"stateId" : 5
				}, {
					"Id" : 26,
					"city" : "Portage la Prairie",
					"stateId" : 5
				}, {
					"Id" : 27,
					"city" : "Selkirk",
					"stateId" : 5
				}, {
					"Id" : 28,
					"city" : "Steinbach",
					"stateId" : 5
				}, {
					"Id" : 29,
					"city" : "Thompson",
					"stateId" : 5
				}, {
					"Id" : 30,
					"city" : "Winkler",
					"stateId" : 5
				}, {
					"Id" : 31,
					"city" : "South Delhi",
					"stateId" : 6
				}, {
					"Id" : 32,
					"city" : "North Delhi",
					"stateId" : 6
				}, {
					"Id" : 33,
					"city" : "East Delhi",
					"stateId" : 6
				}, {
					"Id" : 34,
					"city" : "West Delhi",
					"stateId" : 6
				}, {
					"Id" : 35,
					"city" : "Old Delhi",
					"stateId" : 6
				}, {
					"Id" : 36,
					"city" : "New Delhi",
					"stateId" : 6
				}, {
					"Id" : 37,
					"city" : "Yamuna Paar",
					"stateId" : 6
				}, {
					"Id" : 38,
					"city" : "Chembur",
					"stateId" : 7
				}, {
					"Id" : 39,
					"city" : "Borivali West",
					"stateId" : 7
				}, {
					"Id" : 40,
					"city" : "Ghatkopar West",
					"stateId" : 7
				}, {
					"Id" : 41,
					"city" : "Juhu",
					"stateId" : 7
				}, {
					"Id" : 42,
					"city" : "Mira Road",
					"stateId" : 7
				}, {
					"Id" : 43,
					"city" : "Powai",
					"stateId" : 7
				}, {
					"Id" : 44,
					"city" : "Virar West",
					"stateId" : 7
				}, {
					"Id" : 45,
					"city" : "Rajarhat",
					"stateId" : 8
				}, {
					"Id" : 46,
					"city" : "Park Street",
					"stateId" : 8
				}, {
					"Id" : 47,
					"city" : "Golpark",
					"stateId" : 8
				}, {
					"Id" : 48,
					"city" : "Chandan Nagar",
					"stateId" : 8
				}
			];

			service.getCountry = function () {
				return countrylist;
			};

			service.getCountryState = function (countryId) {
				var states = ($filter('filter')(statelist, {
						countryId : countryId
					}));
				return states;
			};

			service.getStateCity = function (stateId) {

				var items = ($filter('filter')(citylist, {
						stateId : stateId
					}));
				return items;
			};

			return service;

		}
	]);
