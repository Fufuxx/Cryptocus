import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  query: String = '';
  tweets: any[];

  coins: String = '';
  marketCapCoins: any[];
  coinready: boolean = false;

  offset = 0;

  constructor(private http: HttpClient){

  }

  ngOnInit(){
    this.getCoins();
  }

  getCoins(){
    this.http.get('https://api.coinmarketcap.com/v1/ticker/?start='+this.offset)
        .subscribe(
          data => this.handleCoinMarketCap(data), 
          error => console.log('Error',error)
        );
  }

  getTweets(){
    console.log('Fetching tweets for query -> '+this.query);
    var body = JSON.stringify({ query: this.query });
    this.http.post('/tweets', body)
        .subscribe(
          data => this.handleTweets(data), 
          error => console.log('Error',error)
        );
  }

  handleTweets(data){
    console.log(data);
    this.tweets = data.tweets.statuses;
    //Remove Duplicates
    this.tweets = this.tweets.filter((el, index, self) =>
      index === self.findIndex((t) => (
        t.text === el.text
      ))
    );

    var tmp = [];

    this.tweets.forEach(function(e){
      var i = e.text.search(/\$[a-zA-Z]{3}\s/);
      var j = e.text.search(/\$[a-zA-Z]{4}\s/);

      if(i > -1){ 
        if(tmp.filter(function(el){ return el ==  e.text.substring(i+1, i+4) }).length == 0){
          tmp.push(e.text.substring(i+1, i+4)); }
      }
      //Only first found - usually main topic subject of tweet
      else if(j > -1){ 
        if(tmp.filter(function(el){ return el ==  e.text.substring(j+1, j+4) }).length == 0){
          tmp.push(e.text.substring(j+1, j+5)); }
      }
    });
    this.coins = tmp.join(', ');
  }

  handleCoinMarketCap(data){
    //Get 300 first coins listed
    if(this.offset < 300){
      data.forEach(function(e){
        this.marketCapCoins.push(e);
      });
      this.offset = this.offset + 100;
      this.getCoins();
    }
    else{ 
      console.log('Coins set');
      console.log(this.marketCapCoins);
      this.coinready = true; 
    }
  }

}
