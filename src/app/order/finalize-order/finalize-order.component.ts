import { Component, OnInit  } from '@angular/core';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-finalize-order',
  templateUrl: './finalize-order.component.html',
  styleUrls: ['./finalize-order.component.css']
})
export class FinalizeOrderComponent implements OnInit {

  metodoEntregaOpcao: string = 'entregar'; // Declare a variável
  metodoPagamento: string = 'pix';
  metodoEntrega: string = 'retirar';
  enderecoEntrega: string = '';
  dataHora: string = '';
  numeroLoja: string = '+5519999372133';
  produtosDoCarrinho: any[] = []; // Declare a propriedade produtosDoCarrinho aqui
  tipoEntrega: string = ''; // Variável para armazenar o tipo de entrega
  defaultHorario: string;
  editandoHorario: boolean = false;
  horarioPersonalizado: string = '';
  totalCompra: number = 0;


  constructor(private carrinhoService: CarrinhoService ) {
    // Obtém a hora atual
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 1);

    // Formata a hora no formato 'hh:mm'
    this.defaultHorario = this.formatHorario(currentDate);
  }

  ngOnInit() {
    // Obtenha os produtos do carrinho usando o serviço
    this.produtosDoCarrinho = this.carrinhoService.obterProdutosDoCarrinho();
  }

  toggleEndereco() {
    if (this.tipoEntrega === 'entregar') {
      // Se a opção "Entrega no Endereço" estiver selecionada, mostre o campo de endereço
      return true;
    }
    // Caso contrário, oculte o campo de endereço
    return false;
  }

  calcularPrecoTotal(): number {
    let total = 0;
    for (const item of this.produtosDoCarrinho) {
      total += item.price * item.quantidade;
    }
    return total;
  }

  calcularPrecoTotalCompra(): number {
    
    let total = 0;
  
    for (const produto of this.produtosDoCarrinho) {
      total += produto.price * produto.quantidade;
    }
    return total;
  }


  // Função para formatar a hora
  formatHorario(date: Date): string {
    const hours = this.padZeroes(date.getHours());
    const minutes = this.padZeroes(date.getMinutes());

    return `${hours}:${minutes}`;
  }

  // Função auxiliar para adicionar zeros à esquerda
  padZeroes(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  
    

  // Função para habilitar a edição do horário personalizado
  editarHorario() {
    this.editandoHorario = true;
  }

  concluirCompra() {

    if (this.produtosDoCarrinho.length === 0) {
      return;
    }
    const mensagem =
      'Olá, gostaria de realizar um pedido!\n\n' +
      this.produtosDoCarrinho.map(item => `${item.quantidade}x ${item.name} - R$${(item.price * item.quantidade).toFixed(2)}`).join('\n') +
      '\n-------------------------------\n' +
      `Ficando no Total: R$${this.calcularPrecoTotal().toFixed(2)}\n\n` +
      `O método de pagamento vai ser: ${this.metodoPagamento}\n` +
      `Metodo de entrega: ${this.metodoEntrega === 'retirar' ? 'Vou retirar o pedido' : 'Vou querer que entregue (' + this.enderecoEntrega + ')'}\n` +
      `Tudo isso quero para o dia: ${this.dataHora}`;

    const linkWhatsApp = `https://wa.me/${this.numeroLoja}?text=${encodeURIComponent(mensagem)}`;

    window.open(linkWhatsApp, '_blank');
  }

}
