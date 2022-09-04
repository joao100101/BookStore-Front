import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';
@Component({
  selector: 'app-livros-read',
  templateUrl: './livros-read.component.html',
  styleUrls: ['./livros-read.component.css']
})

export class LivrosReadComponent implements OnInit {
  ID: String = ''
  url: String = 'https://images-na.ssl-images-amazon.com/images/I/51nNwwVSclL.jpg';

  public livros: Livro[] = [];
  constructor(private service: LivroService, private routeActive: ActivatedRoute) {
    this.ID = String(this.routeActive.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    this.findAll();    
  }





  findAll() {
    this.service.findAllByCategory(this.ID).subscribe((resposta) => {
          this.livros = resposta;
          console.log("Livros carregados.")
          console.log(resposta)
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
}
