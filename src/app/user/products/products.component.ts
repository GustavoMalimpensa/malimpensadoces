import { Component, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CarrinhoService } from '../../services/carrinho.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  categories: string[] = ['bolo_pote', 'cone_trufado', 'bolo', 'pudim'];
  filteredProducts: Product[] = [];
  selectedCategory: string = '*';
  precoTotal: number = 0;
  itenTotal: number = 0;
  cancelarClicado: boolean = false;
  carrinho: any[] = [];
  modalRef?: BsModalRef;
  title: string = '';
  produtoDetalhado: any;
  quantidadeSelecionada: number = 1; // Inicialmente, a quantidade é 1
  showSearchBar: boolean = false;

  allProducts: Product[] = [
    {
      id: 1,
      category: 'bolo_pote',
      name: 'Ninho c/ Morango',
      description: 'Brigadeiro de ninho com morango e pedaços de morango.',
      imageUrl: './assets/img/bolodedepote.jpeg',
      keywords: 'morango',
      price: 13,
      quantidade: 1,
    },
    //{
    //  id: 2,
    //  category: 'bolo_pote',
    //  name: 'Ninho c/ Abacaxi',
    //  description: 'Brigadeiro de ninho com pedaços de abacaxi',
    //  imageUrl: './assets/img/bolode.jpeg',
    //  keywords: 'chocolate',
    //  price: 13,
    //  quantidade: 1, 
    //},
    {
      id: 3,
      category: 'bolo_pote',
      name: 'Ninho c/ Nutella',
      description: 'Brigadeiro de ninho com nutella',
      imageUrl: './assets/img/ninhonutela.jpeg',
      keywords: 'nutella',
      price: 13,
      quantidade: 1,
    },
    // {
    //  id: 4,
    //  category: 'bolo_pote',
    //  name: 'Prestigio',
    //  description: 'Bolo de chocolate , brigadeiro cremoso e cocada cremosa',
    //  imageUrl: './assets/img/bolodedepote.jpeg',
    //  keywords: 'morango',
    //  price: 12,
    //  quantidade: 1,
    // },
    //{
    //  id: 5,
    //  category: 'bolo_pote',
    //  name: 'Brigadeiro',
    //  description: 'Bolo de chocolate e brigadeiro cremoso com chocolate',
    //  imageUrl: './assets/img/bolofatia.jpeg',
    //  keywords: 'morango',
    //  price: 12,
    //  quantidade: 1,
    //},
    {
      id: 6,
      category: 'bolo_pote',
      name: 'Nozes',
      description: 'Bolo branco, brigadeiro branco e pedaços de nozes',
      imageUrl: './assets/img/bolodepotenozes.jpeg',
      keywords: 'morango',
      price: 13,
      quantidade: 1,
    },
    {
      id: 7,
      category: 'bolo_pote',
      name: 'Ameixa',
      description: 'Bolo branco, brigadeiro branco com ameixas',
      imageUrl: './assets/img/ameixa.jpeg',
      keywords: 'morango',
      price: 13,
      quantidade: 1,
    },
    //{
    //  id: 8,
    //  category: 'bolo_pote',
    //  name: 'Surpresa de Maracujá',
    //  description: 'Bolo branco, creme de choclate, brigadeiro cremoso e mousse de maracujá',
    //  imageUrl: './assets/img/bolofatia.jpeg',
    //  keywords: 'morango',
    //  price: 12,
    //  quantidade: 1,
    //},
    {
     id: 9,
     category: 'cone_trufado',
     name: 'Prestígio',
     description: 'Cone banhado no chocolate, recheio com brigadeiro e coco ',
     imageUrl: './assets/img/coneprestigio.jpeg',
     keywords: 'morango',
     price: 7,
     quantidade: 1,
    },
    {
      id: 10,
      category: 'cone_trufado',
      name: 'Ninho c/ Cereja',
      description: 'Cone banhado no chocolate, recheado com brigadeiro de ninho com pedaços de cereja',
      imageUrl: './assets/img/conecereja.peg',
      keywords: 'morango',
      price: 8,
      quantidade: 1,
    },
    // {
    //   id: 11,
    //   category: 'cone_trufado',
    //   name: 'Ninho c/ Nutella',
    //   description: 'Cone banhado no chocolate, recheado com brigadeiro de ninho com nutella',
    //   imageUrl: './assets/img/bolofatia.jpeg',
    //   keywords: 'morango',
    //   price: 8,
    //   quantidade: 1,
    // },
    {
      id: 12,
      category: 'cone_trufado',
      name: 'Ovomaltine',
      description: 'Cone banhado no chocolate, recheado com ganache de chocolate ao leite com ovomaltine',
      imageUrl: './assets/img/cone.jpeg',
      keywords: 'morango',
      price: 8,
      quantidade: 1,
    },
    // {
    //   id: 13,
    //   category: 'cone_trufado',
    //   name: 'Brigadeiro',
    //   description: 'Cone banhado no chocolate, recheado com brigadeiro cremoso',
    //   imageUrl: './assets/img/bolodedepote.jpeg',
    //   keywords: 'morango',
    //   price: 7,
    //   quantidade: 1,
    // },
    {
      id: 14,
      category: 'bolo',
      name: 'Ninho c/ Morango',
      description: 'Brigadeiro de ninho com morango e pedaços de morango.',
      imageUrl: './assets/img/fatriamorango.jpeg',
      keywords: 'morango',
      price: 13,
      quantidade: 1,
    },
    // {
    //   id: 15,
    //   category: 'bolo',
    //   name: 'Ninho c/ Abacaxi',
    //   description: 'Brigadeiro de ninho com pedaços de abacaxi',
    //   imageUrl: './assets/img/bolofatia.jpeg',
    //   keywords: 'chocolate',
    //   price: 13,
    //   quantidade: 1,
      
    // },
    // {
    //   id: 16,
    //   category: 'bolo',
    //   name: 'Ninho c/ Nutella',
    //   description: 'Brigadeiro de ninho com nutella',
    //   imageUrl: './assets/img/cone.jpeg',
    //   keywords: 'uva',
    //   price: 13,
    //   quantidade: 1,
    // },
    {
      id: 17,
      category: 'bolo',
      name: 'Prestigio',
      description: 'Bolo de chocolate , brigadeiro cremoso e cocada cremosa',
      imageUrl: './assets/img/prestigio.jpeg',
      keywords: 'morango',
      price: 12,
      quantidade: 1,
    },
    // {
    //   id: 18,
    //   category: 'bolo',
    //   name: 'Brigadeiro',
    //   description: 'Bolo de chocolate e brigadeiro cremoso com chocolate',
    //   imageUrl: './assets/img/bolofatia.jpeg',
    //   keywords: 'morango',
    //   price: 12,
    //   quantidade: 1,
    // },
    // {
    //   id: 19,
    //   category: 'bolo',
    //   name: 'Nozes',
    //   description: 'Bolo branco, brigadeiro branco e pedaços de nozes',
    //   imageUrl: './assets/img/cone.jpeg',
    //   keywords: 'morango',
    //   price: 13,
    //   quantidade: 1,
    // },
    {
      id: 20,
      category: 'bolo',
      name: 'Ameixa',
      description: 'Bolo branco, brigadeiro branco com ameixas',
      imageUrl: './assets/img/fatioaamexa.jpeg',
      keywords: 'morango',
      price: 13,
      quantidade: 1,
    },
    // {
    //   id: 21,
    //   category: 'bolo',
    //   name: 'Surpresa de Maracujá',
    //   description: 'Bolo branco, creme de choclate, brigadeiro cremoso e mousse de maracujá',
    //   imageUrl: './assets/img/bolofatia.jpeg',
    //   keywords: 'morango',
    //   price: 12,
    //   quantidade: 1, 
    // },
    {
      id: 22,
      category: 'pudim',
      name: 'Mini pudim',
      description: 'Sobremesa que todos conhecemos mas no tamanho "mini" ',
      imageUrl: './assets/img/pudim.jpeg',
      keywords: 'morango',
      price: 5,
      quantidade: 1,
    },
    // Adicione outros produtos fictícios aqui
  ];
  

  constructor(
    private modalService: BsModalService,
    private carrinhoService: CarrinhoService,
    private router: Router,
  ) {
    this.carrinho = []; // Inicialize a variável carrinho aqui
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  filterProducts(category: string) {
    this.selectedCategory = category;
    this.filteredProducts = category === '*' ?
      this.allProducts :
      this.allProducts.filter(product => product.category === category);
  }

  //filtrar por pesquisa

  loadProducts() {
    // Inicialmente, exiba todos os produtos
    this.filteredProducts = this.allProducts;
  }

  //modal para detalhes do produto

  abrirModalDetalhesProduto(product: any) {
    this.produtoDetalhado = product;
    this.modalRef = this.modalService.show(this.modalDetalhesProduto);
  }
  
  fecharModalDetalhesProduto() {
    this.modalRef?.hide();
  }

  adicionarAoCarrinho(produto: Product) {
    console.log('Adicionando produto ao carrinho:', produto);
    const itemNoCarrinho = this.getCarrinhoItem(produto);
  
    if (itemNoCarrinho) {
      // Se o produto já estiver no carrinho, atualize a quantidade com base na quantidade selecionada
      itemNoCarrinho.quantidade += this.quantidadeSelecionada;
    } else {
      // Se o produto não estiver no carrinho, crie um novo item no carrinho com a quantidade selecionada
      produto.quantidade = this.quantidadeSelecionada;
      this.carrinho.push(produto);
    }
  
    // Limpe a quantidade selecionada
    this.quantidadeSelecionada = 1;
  
    // Feche o modal após adicionar ao carrinho
    this.modalRef?.hide();
  
    // Atualize o preço total do carrinho
    this.itenTotal = this.calcularItenTotal();
    this.precoTotal = this.calcularPrecoTotal();
    this.carrinhoService.adicionarProdutoAoCarrinho(produto);
  }

  aumentarQuantidade() {
    this.quantidadeSelecionada++;
    console.log('Quantidade selecionada aumentada para', this.quantidadeSelecionada);
  }

  diminuirQuantidade() {
    if (this.quantidadeSelecionada > 1) {
      this.quantidadeSelecionada--;
      console.log('Quantidade selecionada diminuída para', this.quantidadeSelecionada);
    }
  }

  //modal finalizar compra
  
  openModal(buttonNumber: number) {
    this.cancelarClicado = false;
    this.modalRef = this.modalService.show(this.modalTemplate);
  }
  
  
  removerDoCarrinho(item: any) {
    if (item.quantidade === 1) {
      const index = this.carrinho.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        this.carrinho.splice(index, 1);
      }
    } else {
      item.quantidade--;
    }
  
    this.itenTotal = this.calcularItenTotal();
    this.precoTotal = this.calcularPrecoTotal();
  }

  limparCarrinho() {
    this.carrinho = [];
  }
  
  calcularItenTotal(): number {
    return this.carrinho.reduce((total, item) => total + item.quantidade, 0);
  }

  calcularPrecoTotal(): number {
    return this.carrinho.reduce((total, item) => total + item.price * item.quantidade, 0);
  }

  getCarrinhoItem(product: Product) {
    return this.carrinho.find((item) => item.id === product.id);
  }

  estaNoCarrinho(product: Product): boolean {
    return this.carrinho.some((item) => item.id === product.id);
  }

  finalizarCompra() {
    this.modalRef?.hide();
    this.router.navigate(['/pedido'], { queryParams: { from: 'home' } });
  }
  
  
  @ViewChild('modalTemplate') modalTemplate!: string;

  @ViewChild('modalDetalhesProduto') modalDetalhesProduto!: string;

}













  