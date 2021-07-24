import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';
import { BookAbbreviationPipe } from './book-abbreviation.pipe';

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
  public bookAbbreviations: string[] = [];
  public currentBook: string = 'Genesis';
  public bookText: string = '';
  public activeBookAbbr: string = this._bookAbbreviatonPipe.transform('Genesis');
  public hoverActive = false;

  constructor(
    private _http: HttpClient,
    private _bookAbbreviatonPipe: BookAbbreviationPipe
  ) { }

  ngOnInit(): void {
    this._http.get('https://api.biblia.com/v1/bible/contents/ASV?key=' + environment.API_KEY).subscribe((booksObject: any) => {
      this.books = booksObject.books.map((book: any) => book.passage);
      this.bookAbbreviations = this.books.map((book: string) => this._bookAbbreviatonPipe.transform(book));
      this.currentBook = this.books[0];
    });

    this._http.get(`https://api.biblia.com/v1/bible/content/ASV.txt.json?passage=Genesis&key=` + environment.API_KEY).subscribe((bookTextObject: any) => {
      this.bookText = bookTextObject.text;
    });
  }

  onChange(newBook: string) {
    this.hoverActive = false;
    this.currentBook = newBook;
    this.activeBookAbbr = this._bookAbbreviatonPipe.transform(this.currentBook);
    this._http.get(`https://api.biblia.com/v1/bible/content/ASV.txt.json?passage=${this.currentBook}&key=` + environment.API_KEY).subscribe((bookTextObject: any) => {
      this.bookText = bookTextObject.text;
    });
  }

  mouseenter() {
    this.hoverActive = true;
  }

}
