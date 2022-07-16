import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoriaDeleteComponent } from '../categoria-delete/categoria-delete.component';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';

var ID = '';

@Component({
  selector: 'app-categoria-read',
  templateUrl: './categoria-read.component.html',
  styleUrls: ['./categoria-read.component.css']
})


export class CategoriaReadComponent implements OnInit {

  categorias: Categoria[] = [];


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
    ID = id;
   this.openDialog('0ms', '0ms');
  }

  static getId(){
    return ID;
  }

  //Abre uma caixa de dialogo para confirmar se deseja ou não deletar a categoria
  //O conteudo mostrado na caixa de dialogo é o que está no Componente CategoriaDelete
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CategoriaDeleteComponent, {
      width: '40rem',
      panelClass: "custom",
      enterAnimationDuration,
      exitAnimationDuration
    });
  }
}
