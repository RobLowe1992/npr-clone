angular
  .module("npr",["ui.router","ngResource", "react"])
  .config([
    "$stateProvider", function($stateProvider){
      console.log("router working");
      $stateProvider
          .state("landing", {
              url: '/',
              templateUrl: '/assets/js/ng-views/welcome.html'
          })
          .state("index", {
              url: '/articles',
              templateUrl: '/assets/js/ng-views/index.html',
              controller: 'IndexController',
              controllerAs: 'vm'
          })
          .state("show",{
              url: '/articles/:title',
              templateUrl: '/assets/js/ng-views/show.html',
              controller: 'ShowController',
              controllerAs: 'vm'
          })
    }
  ])
  .controller("IndexController",["$state", "EventFactory", function($state, ArticleFactory){
        console.log('Index Controller Working');
        this.articles = ArticleFactory.query();
  }])
  .controller("ShowController", ["ArticleFactory", "$state", "$stateParams", function(ArticleFactory, $state, $stateParams){
        this.article = ArticleFactory.query({title: $stateParams.title})
  }])
  .factory("EventFactory",["$resource", function($resource){
    console.log('factory working')
        return $resource("api/articles/:title", {}, {
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




