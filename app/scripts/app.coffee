app = angular.module 'regexjs', []

app.config -> console.log 'angular!'

app.controller 'RegExpController', ['$scope', ($scope) ->
  $scope.expression = new RegExp()
]

app.filter 'raw', ['$sce', ($sce) ->
  return (val) -> return $sce.trustAsHtml(val)
]

app.directive 'header', ->
  restrict: 'E'
  templateUrl: 'templates/header.html'

app.directive 'regexp', ->
  restrict: 'AE'
  templateUrl: 'templates/expression.html'
  controller: ['$rootScope', '$scope', ($rootScope, $scope) ->
    $scope.regex = {
      pattern: ''
      global: false
      multiline: false
      ignore: false
    }

    $scope.$watch 'regex.pattern', (pattern) ->
      try
        exp = new RegExp(pattern)
      catch err
        $scope.error = err
        return
      $rootScope.$broadcast 'pattern', exp
      $scope.error = null
  ]

app.directive 'tester', ->
  restrict: 'AE'
  templateUrl: 'templates/tester.html'
  controller: ['$rootScope', '$scope', ($rootScope, $scope) ->
    $scope.tests = []
    $scope.newTest = ''

    $scope.addTest = (test) ->
      $scope.tests.push {source: test}
      $scope.newTest = ''

    $scope.formatTest = (test) ->
      test.source.replace test.match, "<strong>#{test.match}</strong>"

    $rootScope.$on 'pattern', (evt, pattern) ->
      angular.forEach $scope.tests, (test) ->
        captures = pattern.exec test.source
        if captures?
          test.match = captures.shift()
          test.captures = captures
        else
          test.match = null
          test.captures = null
  ]
