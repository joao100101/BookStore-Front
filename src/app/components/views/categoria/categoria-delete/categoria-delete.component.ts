import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaReadComponent } from '../categoria-read/categoria-read.component';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.css']
})
export class CategoriaDeleteComponent implements OnInit {

  constructor(private dialog: MatDialog, private service: CategoriaService) { }

  categoria: Categoria = {
    id: '',
    nome: '',
    descricao: ''
  }
  ngOnInit(): void {
  }

  close(){
    this.dialog.closeAll();
  }

  findById(id: String){
    this.service.findById(id).subscribe((response) =>{
      this.categoria = response;
      console.log(response); 
    });
  }
  delete(): void{
    this.service.delete(CategoriaReadComponent.getId()).subscribe((resposta) =>{
      this.dialog.closeAll();
      window.location.reload();
      this.service.mensagem("Categoria deletada com sucesso.");
    });
  }

}
