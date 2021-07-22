import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';

interface Chapter {
  chapterPassage: string;
}

interface Book {
  bookPassage: string;
  chapters?: Chapter[]  
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public books: string[] = [];
  public currentBook: string = 'Genesis';
  public bookText: string = '';

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    this._http.get('https://api.biblia.com/v1/bible/contents/ASV?key=' + environment.API_KEY).subscribe((booksObject: any) => {
      this.books = booksObject.books.map((book: any) => book.passage);
      this.currentBook = this.books[0];
    });

    this._http.get(`https://api.biblia.com/v1/bible/content/ASV.txt.json?passage=Genesis&key=` + environment.API_KEY).subscribe((bookTextObject: any) => {
      this.bookText = bookTextObject.text;
    });
  }

  onChange(newBook: string) {
    this.currentBook = newBook;
    this._http.get(`https://api.biblia.com/v1/bible/content/ASV.txt.json?passage=${this.currentBook}&key=` + environment.API_KEY).subscribe((bookTextObject: any) => {
      this.bookText = bookTextObject.text;
    });
  }

}
