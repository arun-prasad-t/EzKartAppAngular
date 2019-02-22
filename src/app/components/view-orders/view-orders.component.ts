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
    {headerName: 'Order Details', field: 'productDetails',cellClass: "cell-wrap-text",autoHeight: true },
    {headerName: 'Address', field: 'address',cellClass: "cell-wrap-text",autoHeight: true },
    {headerName: 'Phone', field: 'phone',cellClass: "cell-wrap-text",autoHeight: true},
    {headerName: 'TotalPrice', field: 'totalPrice',cellClass: "cell-wrap-text",autoHeight: true},
    {headerName: 'Order Status', field: 'status',cellClass: "cell-wrap-text",autoHeight: true}
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
      let responseData = data.json();
      if(responseData){
        //let jsonResponse = JSON.stringify(data);
        this.rowData = responseData;
      }
      else{
        this.rowData = [];
      }
    });
  }

}
