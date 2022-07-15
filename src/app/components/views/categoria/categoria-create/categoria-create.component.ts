import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.css']
})
export class CategoriaCreateComponent implements OnInit {

  categoria: Categoria = {
    nome: '',
    descricao: ''
  }

  constructor(private service: CategoriaService, private route: Router) { }

  ngOnInit(): void {
  }

  voltar(){
    this.route.navigate(['categorias'])
  }

  create(): void{

    this.service.create(this.categoria).subscribe((resposta) =>{
      this.service.mensagem('Categoria criada com sucesso!')
      this.route.navigate(['categorias'])
    }, err => {
      for(let i in err.error.messages){
        this.service.mensagem(err.error.messages[i].message)
      }
    });
  }
}
