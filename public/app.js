angular
  .module("npr",["ui.router","ngResource", "react"])
  .config(["$stateProvider", "$locationProvider", function($stateProvider, $locationProvider){
      console.log("router working");
      $locationProvider.hashPrefix('');
      $stateProvider
          .state("landing", {
              url: '/',
              templateUrl: '/public/js/ng-views//landing/index.html',
              controller: 'IndexController',
              controllerAs: 'vm'
          })
          .state("index", {
              url: '/articles',
              templateUrl: '/public/js/ng-views/articles/index.html',
              controller: 'ArticleIndexController',
              controllerAs: 'vm'
          })
          .state("show",{
              url: '/articles/:title',
              templateUrl: '/public/js/ng-views/articles/show.html',
              controller: 'ArticleShowController',
              controllerAs: 'vm'
          })
          .state("index", {
              url: '/music',
              templateUrl: '/public/js/ng-views/music/index.html',
              controller: 'MusicIndexController',
              controllerAs: 'vm'
          })
          .state("show",{
              url: '/music/:title',
              templateUrl: '/public/js/ng-views/music/show.html',
              controller: 'MusicShowController',
              controllerAs: 'vm'
          })
    }
  ])
  .controller("ArticleIndexController",["$state", "ArticleFactory", function($state, ArticleFactory){
        console.log('Index Controller Working');
        this.articles = ArticleFactory.query();
  }])
  .controller("ArticleShowController", ["ArticleFactory", "$state", "$stateParams", function(ArticleFactory, $state, $stateParams){
        this.article = ArticleFactory.query({title: $stateParams.title})
  }])
  .controller("MusicIndexController",["$state", "MusicFactory", function($state, MusicFactory){
        console.log('Index Controller Working');
        this.music = MusicFactory.query();
  }])
  .controller("MusicShowController", ["MusicFactory", "$state", "$stateParams", function(MusicFactory, $state, $stateParams){
        this.music = MusicFactory.query({title: $stateParams.title})
  }])
  .factory("ArticleFactory",["$resource", function($resource){
    console.log('factory working')
        return $resource("api/articles/:title", {}, {
            update: { method: "PUT"}
        })
  }])
  .factory("MusicFactory",["$resource", function($resource){
        console.log('factory working')
        return $resource("api/music/:title", {}, {
            update: { method: "PUT"}
        })
  }])
//
// function IndexControllerFunction($state, EventFactory){
//   console.log("controller working")
//   this.events = EventFactory.query()
//   console.log(this.events)
//
//   this.newEvent = new EventFactory()
//   this.createEvent = function () {
//   this.newEvent.$save().then(function(event){
//     $state.go("show", { title: event.title })
//   })
// }
// }
//
// function ShowControllerFunction(EventFactory, $state, $stateParams){
//   var self = this
//   this.event = EventFactory.get({title: $stateParams.title})
//   this.update = function () {
//     this.event.$update({title: $stateParams.title})
//   }
//   this.destroy = function () {
//     this.event.$delete({title: $stateParams.title}).then(function(){
//       $state.go("index")
//     })
//   }
  // this.totalDonations = 0
  // console.log(this.event.donations.length)
  // // this.event.donations.forEach(function(donation, i){
  // //   self.totalDonations += donation.amount
  // // })
  //
  // this.event.currentAmount = this.totalDonations
  // this.event.$update({title: $stateParams.title})
  //
  // this.addDonation = function(){
  //   self.newDonation = {name: self.name, amount: self.amount, body: self.body}
  //   self.event.donations.push(self.newDonation)
  //   self.newCurrentAmount = self.event.currentAmount + parseInt(self.amount)
  //   self.event.currentAmount = self.newCurrentAmount
  //   console.log(self.newCurrentAmount)
  //   self.event.$update({title: $stateParams.title})
  //   console.log(self.event.currentAmount)
  // }




