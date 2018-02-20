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

    this.tweets.forEach(function(e){
      var i = e.text.search(/\$[a-zA-Z]{3}\s/);
      var j = e.text.search(/\$[a-zA-Z]{4}\s/);
      console.log('===========');
      console.log(e.text);
      console.log('i -> '+i+', j -> '+j);
      if(i > -1){ tmp.push(e.text.substring(i+1, i+4)); }
      if(j > -1){ 
        console.log(e.text.substring(j+1, j+5));
        tmp.push(e.text.substring(j+1, j+5)); 
      }
    });

    this.coins = tmp.join(', ');

  }

}
