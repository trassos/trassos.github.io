import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.css']
})
export class BookUpdateComponent implements OnInit {

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
    this.book.id = this.route.snapshot.paramMap.get('id')
    this.findByID();
  }

  update(): void {
    this.service.update(this.book).subscribe((resposta) => {
      this.router.navigate(['categories/' + this.id_cat+'/books']); 
      this.service.mensagem('Livro atualizado com sucesso!');
    }, err => {
      this.router.navigate(['categories/' + this.id_cat+'/books']); 
      this.service.mensagem("Erro na atualização do Livro!")
      });
  }


  cancel(): void {
    this.router.navigate(['categories/' + this.id_cat+'/books']); 
  }

  findByID(): void {
    this.service.findById(this.book.id).subscribe((resposta) =>{
      this.book = resposta;
    })
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

