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

  categories: string[] = ['bolo', 'cone_trufado', 'bolo_pote'];
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
      category: 'bolo',
      name: 'Bolo de Morango',
      description: 'Bolo com pedaços de morango',
      imageUrl: './assets/img/bolodedepote.jpeg',
      keywords: 'morango',
      price: 12,
    },
    {
      id: 2,
      category: 'trufa',
      name: 'Trufa Recheada',
      description: 'Bolo com pedaços de morango',
      imageUrl: './assets/img/bolofatia.jpeg',
      keywords: 'chocolate',
      price: 15,
    },
    {
      id: 3,
      category: 'bolo_pote',
      name: 'Bolo com uva',
      description: 'Bolo com pedaços de morango',
      imageUrl: './assets/img/cone.jpeg',
      keywords: 'uva',
      price: 16,
    },
    {
      id: 4,
      category: 'cone_trufado',
      name: 'Bolo de Morango',
      description: 'Bolo com pedaços de morango',
      imageUrl: './assets/img/bolodedepote.jpeg',
      keywords: 'morango',
      price: 12,
    },
    {
      id: 5,
      category: 'bolo',
      name: 'Trufa Recheada',
      description: 'Bolo com pedaços de morango',
      imageUrl: './assets/img/bolofatia.jpeg',
      keywords: 'morango',
      price: 15,
    },
    {
      id: 6,
      category: 'cone_trufado',
      name: 'Bolo com uva',
      description: 'Bolo com pedaços de morango',
      imageUrl: './assets/img/cone.jpeg',
      keywords: 'morango',
      price: 16,
    },
    {
      id: 7,
      category: 'cone_trufado',
      name: 'Bolo de Morango',
      description: 'Bolo com pedaços de morango',
      imageUrl: './assets/img/bolodedepote.jpeg',
      keywords: 'morango',
      price: 12,
    },
    {
      id: 8,
      category: 'bolo',
      name: 'Trufa Recheada',
      description: 'Bolo com pedaços de morango',
      imageUrl: './assets/img/bolofatia.jpeg',
      keywords: 'morango',
      price: 15,
    },
    {
      id: 9,
      category: 'cone_trufado',
      name: 'Bolo com uva',
      description: 'Bolo com pedaços de morango',
      imageUrl: './assets/img/cone.jpeg',
      keywords: 'morango',
      price: 16,
    },
    {
      id: 10,
      category: 'bolo_pote',
      name: 'Bolo de Morango',
      description: 'Bolo com pedaços de morango',
      imageUrl: './assets/img/bolodedepote.jpeg',
      keywords: 'morango',
      price: 12,
    },
    {
      id: 11,
      category: 'bolo_pote',
      name: 'Trufa Recheada',
      description: 'Bolo com pedaços de morango',
      imageUrl: './assets/img/bolofatia.jpeg',
      keywords: 'morango',
      price: 15,
    },
    {
      id: 12,
      category: 'bolo_pote',
      name: 'Bolo com uva',
      description: 'Bolo com pedaços de morango',
      imageUrl: './assets/img/cone.jpeg',
      keywords: 'morango',
      price: 16,
    },
    {
      id: 13,
      category: 'bolo_pote',
      name: 'Bolo de Morango',
      description: 'Bolo com pedaços de morango',
      imageUrl: './assets/img/bolodedepote.jpeg',
      keywords: 'morango',
      price: 12,
    },
    {
      id: 14,
      category: 'bolo_pote',
      name: 'Trufa Recheada',
      description: 'Bolo com pedaços de morango',
      imageUrl: './assets/img/bolofatia.jpeg',
      keywords: 'morango',
      price: 15,
    },
    {
      id: 15,
      category: 'bolo_pote',
      name: 'Bolo com uva',
      description: 'Bolo com pedaços de morango',
      imageUrl: './assets/img/cone.jpeg',
      keywords: 'morango',
      price: 16,
    },
    {
      id: 16,
      category: 'cone_trufado',
      name: 'Bolo com uva',
      description: 'Bolo com pedaços de morango',
      imageUrl: './assets/img/cone.jpeg',
      keywords: 'morango',
      price: 16,
    },
    {
      id: 17,
      category: 'bolo',
      name: 'Bolo de Morango',
      description: 'Bolo com pedaços de morango',
      imageUrl: './assets/img/bolodedepote.jpeg',
      keywords: 'morango',
      price: 12,
    },
    {
      id: 18,
      category: 'bolo',
      name: 'Trufa Recheada',
      description: 'Bolo com pedaços de morango',
      imageUrl: './assets/img/bolofatia.jpeg',
      keywords: 'morango',
      price: 15,
    },
    {
      id: 19,
      category: 'cone_trufado',
      name: 'Bolo com uva',
      description: 'Bolo com pedaços de morango',
      imageUrl: './assets/img/cone.jpeg',
      keywords: 'morango',
      price: 16,
    },
    {
      id: 20,
      category: 'bolo',
      name: 'Bolo de Morango',
      description: 'Bolo com pedaços de morango',
      imageUrl: './assets/img/bolodedepote.jpeg',
      keywords: 'morango',
      price: 12,
    },
    {
      id: 21,
      category: 'bolo',
      name: 'Trufa Recheada',
      description: 'Bolo com pedaços de morango',
      imageUrl: './assets/img/bolofatia.jpeg',
      keywords: 'morango',
      price: 15,
    },
    {
      id: 22,
      category: 'cone_trufado',
      name: 'Bolo com uva',
      description: 'Bolo com pedaços de morango',
      imageUrl: './assets/img/cone.jpeg',
      keywords: 'morango',
      price: 16,
    },
    {
      id: 23,
      category: 'bolo',
      name: 'Bolo de Morango',
      description: 'Bolo com pedaços de morango',
      imageUrl: './assets/img/bolodedepote.jpeg',
      keywords: 'morango',
      price: 12,
    },
    {
      id: 24,
      category: 'trufa',
      name: 'Trufa Recheada',
      description: 'Bolo com pedaços de morango',
      imageUrl: './assets/img/bolofatia.jpeg',
      keywords: 'morango',
      price: 15,
    },
    {
      id: 25,
      category: 'bolo',
      name: 'Bolo com uva',
      description: 'Bolo com pedaços de morango',
      imageUrl: './assets/img/cone.jpeg',
      keywords: 'morango',
      price: 16,
    },
    {
      id: 26,
      category: 'trufa',
      name: 'Trufa Recheada',
      description: 'Bolo com pedaços de morango',
      imageUrl: './assets/img/bolofatia.jpeg',
      keywords: 'morango',
      price: 15,
    },
    {
      id: 27,
      category: 'cone_trufado',
      name: 'Bolo com uva',
      description: 'Bolo com pedaços de morango',
      imageUrl: './assets/img/cone.jpeg',
      keywords: 'morango',
      price: 16,
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
    const itemNoCarrinho = this.getCarrinhoItem(produto);
  
    if (itemNoCarrinho) {
      // Se o produto já estiver no carrinho, atualize a quantidade com base na quantidade selecionada
      itemNoCarrinho.quantidade += this.quantidadeSelecionada;
    } else {
      // Se o produto não estiver no carrinho, crie um novo item no carrinho com a quantidade selecionada
      const newItem = { ...produto, quantidade: this.quantidadeSelecionada };
      this.carrinho.push(newItem);
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
  }

  diminuirQuantidade() {
    if (this.quantidadeSelecionada > 1) {
      this.quantidadeSelecionada--;
    }
  }

  //modal finalizar compra
  
  openModal(buttonNumber: number) {
    this.title = 'Carrinho';
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
    this.router.navigate(['/pedido']);
  }
  
  @ViewChild('modalTemplate') modalTemplate!: string;

  @ViewChild('modalDetalhesProduto') modalDetalhesProduto!: string;

  
  
}













  