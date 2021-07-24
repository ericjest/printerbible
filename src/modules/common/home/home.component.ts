import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';
import { BookAbbreviationPipe } from './book-abbreviation.pipe';

interface Chapter {
  chapterPassage: string;
}

interface Book {
  passage: string;
  chapterCount: number  
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public oldTestamentBooks: Book[] = [];
  public newTestamentBooks: Book[] = [];
  public displayOldTestament = true;
  public bookAbbreviations: string[] = [];
  public currentBook: Book = <Book>{ passage: 'Genesis', chapterCount: 50 };
  public bookTextHTML: string = '';
  public activeBookAbbr: string = this._bookAbbreviatonPipe.transform('Genesis');
  public hoverActive = false;
  public currentChapter = 1;

  constructor(
    private _http: HttpClient,
    private _bookAbbreviatonPipe: BookAbbreviationPipe
  ) { }

  ngOnInit(): void {
    this._http.get('https://api.biblia.com/v1/bible/contents/ASV?key=' + environment.API_KEY).subscribe((booksObject: any) => {
      const books = booksObject.books.map((book: any) => {
        return <Book>{
          passage: book.passage,
          chapterCount: book.chapters.length
        };
      });
      const matthewIndex = books.findIndex((book: Book) => book.passage.toLowerCase() === "matthew");
      this.oldTestamentBooks = books.slice(0, matthewIndex);
      this.newTestamentBooks = books.slice(matthewIndex, books.length);
      this.bookAbbreviations = books.map((book: Book) => this._bookAbbreviatonPipe.transform(book.passage));
      this.currentBook = <Book>{ passage: books[0].passage, chapterCount: books[0].chapterCount };
    });

    this._http.get('https://api.biblia.com/v1/bible/content/ASV.html?passage=Genesis1&style=fullyFormatted&key='
        + environment.API_KEY, { responseType: 'text' }).subscribe((bookTextHTML: any) => {
      this.bookTextHTML = bookTextHTML;
    });
  }

  setBook(newBook: Book | string) {
    this.hoverActive = false;
    if (typeof newBook === "string") {
      const books = [...this.oldTestamentBooks, ...this.newTestamentBooks];
      const bookIndex = books.findIndex((book: Book) => book.passage === newBook);
      this.currentBook = <Book>{ passage: newBook, chapterCount: books[bookIndex].chapterCount };
    } else {
      this.currentBook = newBook;
    }
    this.currentChapter = 1;
    this.activeBookAbbr = this._bookAbbreviatonPipe.transform(this.currentBook.passage);
    this._getBibleChapter(this.currentBook.passage, this.currentChapter);
  }

  setChapter(chapterSelection: string) {
    this.currentChapter = parseInt(chapterSelection, 10);
    this._getBibleChapter(this.currentBook.passage, this.currentChapter);
  }
  
  setTestament(testamentSelection: string) {
    this.displayOldTestament = testamentSelection === "Old Testament";
    if (this.displayOldTestament) {
      this._getBibleChapter("Genesis", 1);
    } else {
      this._getBibleChapter("Matthew", 1);
    }
  }

  mouseenter() {
    this.hoverActive = true;
  }

  private _getBibleChapter(bookPassage: string, chapter: number) {
    this._http.get(`https://api.biblia.com/v1/bible/content/ASV.html?passage=${bookPassage}${chapter}&style=fullyFormatted&key=`
        + environment.API_KEY, { responseType: 'text'}).subscribe((bookTextHTML: any) => {
      this.bookTextHTML = bookTextHTML;
    });
  }

}
