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
          .state("ThreadIndex", {
              url: '/threads',
              templateUrl: '/public/js/ng-views/threads/index.html',
              controller: 'ThreadIndexController',
              controllerAs: 'vm'
          })
          .state("ThreadShow",{
              url: '/threads/:id',
              templateUrl: '/public/js/ng-views/threads/show.html',
              controller: 'ThreadShowController',
              controllerAs: 'vm'
          })
    }
  ])
  .controller("IndexController", ['ThreadFactory', function(ThreadFactory) {
}])
  .controller("ThreadIndexController",["$state", "ThreadFactory", function($state, ThreadFactory){
      this.threads = ThreadFactory.query();
      this.newThread = new ThreadFactory.query()
      this.createThread = ()=>{
        this.newThread.$save().then((thread)=>{
          $state.go('ThreadShow', {id: event.id})
        })
      }

  }])
  .controller("ThreadShowController", ["ThreadFactory", "$state", "$stateParams", function(ThreadFactory, $state, $stateParams){
      this.thread = ThreadFactory.get({id: $stateParams.id})
      console.log(this.thread)
  }])
  .factory("ThreadFactory",["$resource", function($resource){
    return $resource("api/threads/:id", {}, {
      update: { method: "PUT"}
    });
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




