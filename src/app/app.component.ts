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
  }

}
