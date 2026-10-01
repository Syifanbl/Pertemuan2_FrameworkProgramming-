import { Controller, Get, Param, Put, Delete, Body, Post } from '@nestjs/common';
import { BooksService } from './books.service.js';
import { CreateBookDto } from './dto/create-book.dto.js';
import { Book } from './entities/book-entity.js';


@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}
    //menampilkan semua data buku
    @Get()
    getBooks() {
        return this.booksService.findAll();
    }

    @Post()
    postBook(@Body() createBookDto: CreateBookDto) {
        return this.booksService.create(createBookDto);
    }

    // mengambil data buku berdasarkan id
    @Get(':id')
    getBookById(@Param('id') id: string) {
        return this.booksService.getBookById(Number(id));
    }

    // mengedit data buku berdasarkan id
    @Put(':id')
    updateBook(@Param('id') id: string, @Body() updatedBook: Partial<Book>) {
        const book = this.booksService.update(Number(id), updatedBook);
        if (!book) {
            return `Buku dengan id ${id} tidak ditemukan`;
        }
        return book;
    }

    // menghapus data buku berdasarkan id
    @Delete(':id')
    deleteBook(@Param('id') id: string) {
        return `Data buku dengan id ${id} berhasil dihapus`;
    }
}