namespace Facade {
  enum DataTypes {
    BOOKS,
    FILMS,
    GAMES,
  }

  class BookFetcher implements IFetcher {
    books = ['book1', 'book2', 'book3'];

    fetch() {
      return this.books;
    }
  }

  class FilmFetcher implements IFetcher {
    films = ['film1', 'film2', 'film3'];

    fetch() {
      return this.fetch;
    }
  }

  class GameFetcher implements IFetcher {
    games = ['game1', 'game2', 'game3'];

    fetch() {
      return this.games;
    }
  }

  interface IFetcher {
    fetch(type: DataTypes): any;
  }

  class Fetcher implements IFetcher {
    private bookFetcher: BookFetcher;
    private filmFetcher: FilmFetcher;
    private gameFetcher: GameFetcher;

    constructor() {
      this.bookFetcher = new BookFetcher();
      this.filmFetcher = new FilmFetcher();
      this.gameFetcher = new GameFetcher();
    }

    fetch(type: DataTypes) {
      switch (type) {
        case DataTypes.BOOKS:
          return this.bookFetcher.fetch();
        case DataTypes.FILMS:
          return this.filmFetcher.fetch();
        case DataTypes.GAMES:
          return this.gameFetcher.fetch();
        default:
          throw new Error('Unknown data type');
      }
    }
  }

  (function clientCode() {
    const bookFetcher = new Fetcher();

    const books = bookFetcher.fetch(DataTypes.BOOKS);

    console.log(books); // ['book1', 'book2', 'book3']
  })();
}
