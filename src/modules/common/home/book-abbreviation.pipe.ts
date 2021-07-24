import { Pipe, PipeTransform } from '@angular/core';
/*
 * Abbreviate a Bible book name.
 * Usage:
 *   book | abbreviateBook
 * Example:
 *   {{ 'Genesis' | abbreviateBook }}
 *   formats to: 'Ge'
*/
@Pipe({ name: 'abbreviateBook' })
export class BookAbbreviationPipe implements PipeTransform {
    private readonly BOOK_ABBREVIATIONS: { [key: string]: string } = {
        'Genesis': 'Ge',
        'Exodus': 'Ex',
        'Leviticus': 'Lv',
        'Numbers': 'Nm',
        'Deuteronomy': 'De',
        'Joshua': 'Jo',
        'Judges': 'Jd',
        'Ruth': 'Ru',
        '1 Samuel': '1Sm',
        '2 Samuel': '2Sm',
        '1 Kings': '1Ki',
        '2 Kings': '2Ki',
        '1 Chronicles': '1Ch',
        '2 Chronicles': '2Ch',
        'Ezra': 'Ezr',
        'Nehemiah': 'Neh',
        'Esther': 'Est',
        'Job': 'Job',
        'Psalms': 'Ps',
        'Proverbs': 'Prv',
        'Ecclesiastes': 'Ecl',
        'Song of Solomon': 'Sng',
        'Isaiah': 'Isa',
        'Jeremiah': 'Jer',
        'Lamentations': 'Lam',
        'Ezekiel': 'Eze',
        'Daniel': 'Dan',
        'Hosea': 'Hos',
        'Joel': 'Jol',
        'Amos': 'Ams',
        'Obadiah': 'Obd',
        'Jonah': 'Jnh',
        'Micah': 'Mic',
        'Nahum': 'Nah',
        'Habakkuk': 'Hab',
        'Zephaniah': 'Zep',
        'Haggai': 'Hag',
        'Zechariah': 'Zec',
        'Malachi': 'Mal',
        'Matthew': 'Mat',
        'Mark': 'Mrk',
        'Luke': 'Luk',
        'John': 'Jhn',
        'Acts': 'Act',
        'Romans': 'Rom',
        '1 Corinthians': '1Co',
        '2 Corinthians': '2Co',
        'Galatians': 'Gal',
        'Ephesians': 'Eph',
        'Philippians': 'Phl',
        'Colossians': 'Col',
        '1 Thessalonians': '1Th',
        '2 Thessalonians': '2Th',
        '1 Timothy': '1Ti',
        '2 Timothy': '2Ti',
        'Titus': 'Ti',
        'Philemon': 'Phm',
        'Hebrews': 'Heb',
        'James': 'Jm',
        '1 Peter': '1Pt',
        '2 Peter': '2Pt',
        '1 John': '1Jn',
        '2 John': '2Jn',
        '3 John': '3Jn',
        'Jude': 'Jud',
        'Revelation': 'Rev'
    }


    transform(bookName: string): string {
        return this.BOOK_ABBREVIATIONS[bookName];
    }
}