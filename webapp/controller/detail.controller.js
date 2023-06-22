sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,UIComponent, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("examen.controller.detail", {

            onInit: function () {
                var oRouter=UIComponent.getRouterFor(this);
                oRouter.getRoute("Routedetail").attachPatternMatched(this._onProductMatched,this); 
            },
            _onProductMatched: function(oEvent){
                var oArgs, oView;
                oArgs = oEvent.getParameter("arguments");
                oView = this.getView();
                oView.bindElement({
                    path: "/Products(" + oArgs.productId + ")",
                    events: {
                        dataRequested: function () {
                            this.getView().setBusy(true);
                        },
                        dataReceived: function () {
                            this.getView().setBusy(false);
                        }
                    }  
                });
                var oList = oView.byId("listaOrdenes");
                var oBinding = oList.getBinding("items");
                oBinding.filter(new Filter({
                    path: "ProductID",
                    operator: FilterOperator.EQ,
                    value1: oArgs.productId
                }));
            },
        });
    });