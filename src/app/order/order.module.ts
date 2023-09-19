import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinalizeOrderComponent } from './finalize-order/finalize-order.component';
import { OrderComponent } from './order.component';
import { CarrinhoService } from '../services/carrinho.service';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    FinalizeOrderComponent,
    OrderComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [CarrinhoService]
})
export class OrderModule { }
