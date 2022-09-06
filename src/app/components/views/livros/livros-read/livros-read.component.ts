import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';
@Component({
  selector: 'app-livros-read',
  templateUrl: './livros-read.component.html',
  styleUrls: ['./livros-read.component.css']
})

export class LivrosReadComponent implements OnInit {
  menu: boolean = false;
  carregado: boolean = false;
  ID: String = ''
  url: String = 'https://images-na.ssl-images-amazon.com/images/I/51nNwwVSclL.jpg';

  public livros: Livro[] = [];
  constructor(private service: LivroService, private routeActive: ActivatedRoute) {
    this.ID = String(this.routeActive.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    this.findAll();

  }

  toggleMenu() {
    this.menu = !this.menu;
  }




  findAll() {
    this.service.findAllByCategory(this.ID).subscribe((resposta) => {
      this.livros = resposta;
      this.carregado = true;
    })

  }


  criarLivros(book: Livro) {
    let container = document.getElementById('container');

    let bloco = document.createElement('div');
    bloco.classList.add('bloco');

    container?.appendChild(bloco);

    let photo = document.createElement('div');
    photo.classList.add('photo');
    photo.style.backgroundImage = `url('${book.urlCapa}')`;
    photo.style.backgroundSize = 'cover';

    bloco.appendChild(photo);

    let desc = document.createElement('div');
    desc.classList.add('desc');
    bloco.appendChild(desc);
  }
  isCarregadoAndVazio(): boolean {
    return this.livros.length == 0 && this.carregado;
  }


  getImg(livro: Livro): String{
    const img = new Image();
    img.src = String(livro.urlCapa);
    img.onerror = () => {
      livro.urlCapa = 'https://img.freepik.com/premium-psd/book-cover-mockup-template_68185-415.jpg?w=2000'
    }
    return livro.urlCapa;
  }
}
