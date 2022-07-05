import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

  id_cat: String = ''

  book: Book = {
    id: '',
    title: '',
    author_name: '',
    text: ''
  }

  title = new FormControl('', [Validators.minLength(3)])
  author_name = new FormControl('', [Validators.minLength(5)])
  text = new FormControl('', [Validators.minLength(10)])


  constructor(private service: BookService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')
  }

  create(): void {
    this.service.create(this.book, this.id_cat).subscribe((resposta) => {
      this.router.navigate(['categories/' + this.id_cat+'/books']); 
      this.service.mensagem('Livro criado com sucesso!');
    }, err => {
      this.router.navigate(['categories/' + this.id_cat+'/books']); 
      this.service.mensagem("Erro na criação do Livro!")
      });
  }

  cancel(): void {
    this.router.navigate(['categories/' + this.id_cat+'/books']); 
  }
  getMessageTitle() {
    if (this.title.invalid) {
      return "O campo título deve conter entre 3 e 100 caracteres";
    }
    return false;
  }
  getMessageAuthor() {
    if (this.author_name.invalid) {
      return "O campo título deve conter entre 5 e 200 caracteres";
    }
    return false;
  }
  getMessageText() {
    if (this.text.invalid) {
      return "O campo título deve conter entre 10 e 10000 caracteres";
    }
    return false;
  }

}
