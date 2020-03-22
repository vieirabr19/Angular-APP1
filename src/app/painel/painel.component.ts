import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Frase } from '../shared/frase.model';
import { FRASES } from './frase-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

  public instrucoes: string = 'Traduza esta frase:';
  public frases: Frase[] = FRASES;
  public resposta: string = '';

  public rodada: number = 0;
  public rodadaFrase: Frase;

  public progresso: number = 0;
  public tentativas: number = 3;

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.atualizaFrase();
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    
  }

  public atualizaResposta(resposta: Event): void{
    this.resposta = (<HTMLInputElement>resposta.target).value;
  }

  public verificarResposta(): void{
    if(this.rodadaFrase.frasePtBr == this.resposta){
      this.rodada++;
      this.progresso = this.progresso + (100 / this.frases.length);

      if(this.rodada === 4){
        this.encerrarJogo.emit('vitoria');
      }

      this.atualizaFrase();

    }else{
      // diminuir a variavel tentativa
      this.tentativas--;
      if(this.tentativas === -1){
        this.encerrarJogo.emit('derrota');
      }
    }
  }

  public atualizaFrase(): void{
    this.rodadaFrase = this.frases[this.rodada];

    // limpa frase resposta
    this.resposta = '';
  }

}
