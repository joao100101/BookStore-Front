import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-read',
  templateUrl: './categoria-read.component.html',
  styleUrls: ['./categoria-read.component.css']
})
export class CategoriaReadComponent implements OnInit {

  categorias: Categoria[] = []

  displayedColumns: string[] = ['id', 'nome', 'descricao', 'livros', 'acoes'];
  constructor(private dialog: MatDialog, private service: CategoriaService, private router: Router) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.categorias = resposta;
    })
  }

  gotToCategoriaCreate(){
    this.router.navigate(['categorias/create'])
  }

  deleteCategoria(id?: any){
    console.log(id);
   //this.dialog.open(CategoriaReadComponent, CategoriaDeleteComponent);
  }
}
