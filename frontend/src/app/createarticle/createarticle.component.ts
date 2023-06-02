import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createarticle',
  templateUrl: './createarticle.component.html',
  styleUrls: ['./createarticle.component.css']
})
export class CreatearticleComponent implements OnInit {
  article: any = {

    title: '',
    content: '',
    tags: [],
    description: ''

  }
  constructor() { }

  ngOnInit(): void {
  }

}
