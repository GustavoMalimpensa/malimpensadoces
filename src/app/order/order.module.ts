import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinalizeOrderComponent } from './finalize-order/finalize-order.component';
import { OrderComponent } from './order.component';
import { CarrinhoService } from '../services/carrinho.service';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FinalizeOrderComponent,
    OrderComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [CarrinhoService]
})
export class OrderModule { }
