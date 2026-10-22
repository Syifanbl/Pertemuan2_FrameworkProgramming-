import { Injectable } from '@nestjs/common';
import { Book } from './entities/book-entity.js';
import { CreateBookDto } from './dto/create-book.dto.js';
import { get } from 'http';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>
    ) {}

    // mencari semua data buku
    async findAll(): Promise<Book[]> {
        return await this.bookRepository.find({
            order: { createdAt: 'ASC' }
        });
    }

    // menyimpan data buku
    async create(book: CreateBookDto): Promise<Book> {
        const newBook = this.bookRepository.create(book);

        return await this.bookRepository.save(newBook);
 
    // private books: Book[] = [
    //     {
    //         id: 1,
    //         title: 'The Great Gatsby',
    //         author: 'F. Scott Fitzgerald',
    //         isbn: '9780743273565',
    //         publishedYear: 1925,
    //         isAvailable: true
    //     }
    // ]
    // findAll(): Book[] {
    //     return this.books;
    // }

    // // menyimpan data buku baru
    // create(book: CreateBookDto): Book{
    //     const newBook: Book = {
    //         id: this.books.length + 1,
    //         title: book.title,
    //         author: book.author,
    //         isbn: book.isbn,
    //         publishedYear: book.publishedYear,
    //         isAvailable: true
    //     };
    //     //simpan ke database
    //     this.books.push(newBook);

    //     return newBook;
    // }
    // getBookById(id: number): Book | undefined {
    //     return this.books.find(book => book.id === id);
    // }
    // // mengedit data buku berdasarkan id
    // update(id: number, updatedBook: Partial<Book>): Book | undefined {
    //     const bookIndex = this.books.findIndex(book => book.id === id);
    //     if (bookIndex !== -1) {
    //         this.books[bookIndex] = { ...this.books[bookIndex], ...updatedBook };
    //         return this.books[bookIndex];
    //     }
    //     return undefined;
    // }

    // // menghapus data buku berdasarkan id
    // delete(id: number): void {
    //     this.books = this.books.filter(book => book.id !== id);
    }
}
