import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-createarticle',
  templateUrl: './createarticle.component.html',
  styleUrls: ['./createarticle.component.css']
})
export class CreatearticleComponent implements OnInit, OnDestroy {


  editor: any = Editor ;
  html: any = '';

  ngOnInit(): void {
    this.editor = new Editor();
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  article: any = {

    title: '',
    content: '',
    tags: [],
    description: ''

  }

  tag: any ='';

  image: any;

  select(e: any){
    this.image = e.target.files[0];
  }

  constructor(private _auth: AuthService, private data:DataService, private router: Router) { }

  create(){
    let fd =new FormData(); // use FormData because data have upload image
    fd.append('title',this.article.title)
    fd.append('content',this.article.content)
    fd.append('tags',this.article.tags.toString()) //can't pass tags in fomat array then change it to String 
    fd.append('description',this.article.description)
    fd.append('image',this.image)
    fd.append('idAuthor',this._auth.getAuthorDataFromToken()._id)

    this.data.create(fd)
      .subscribe(
        res=>{
          this.router.navigate(['/home']);
        },
        err=>{
          console.log(err);
        }
      );

  }
}



