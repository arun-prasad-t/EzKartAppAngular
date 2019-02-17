import { GridApi } from 'ag-grid-community';
import { OrderService } from './../../services/orders.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {

  columnDefs = [
    {headerName: 'Order Details', field: 'productDetails' },
    {headerName: 'Address', field: 'address' },
    {headerName: 'Phone', field: 'phone'},
    {headerName: 'TotalPrice', field: 'totalPrice'},
    {headerName: 'Order Status', field: 'status'}
  ];

  rowData=[];
  gridApi:GridApi;

  constructor(private orderService:OrderService) { 
    this.getOrders();    
  }

  ngOnInit() {
  }

  onGridReady(params){
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  getOrders(){
    this.orderService.getOrder().subscribe(data=>{
      if(data){
        let jsonResponse = JSON.stringify(data);
        this.rowData = JSON.parse(JSON.parse(jsonResponse)._body);
      }
      else{
        this.rowData = [];
      }
    });
  }

}
