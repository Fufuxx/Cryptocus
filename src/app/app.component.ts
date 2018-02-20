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

  constructor(private http: HttpClient){

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

    //Debug
    var debug = this.tweets[0];
    console.log(debug.text);
    var ind = debug.text.search(/[$][a-zA-Z]{3}\s$/);
    console.log('Search - > '+ind);
    console.log('Get the coin -> '+debug.text.substring(ind, ind+4));

    this.tweets.forEach(function(e){
      var i = e.text.search(/[$][a-zA-Z]{3}\s/);
      if(i > -1){ tmp.push(e.text.substring(i, i+4)); }
    });
    console.log('Tmp', tmp);
    this.coins = tmp.join(',');
  }

}
