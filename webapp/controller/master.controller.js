sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "../utils/formatter",
    "sap/ui/core/UIComponent",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageBox,MessageToast,formatter, UIComponent, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("examen.controller.master", {

            formatter: formatter,

            onInit: function () {

            },
            verDetalles:function(oEvent){
                var bundle= this.getView().getModel("i18n").getResourceBundle();
                var nombre = oEvent.getSource().getBindingContext().getProperty("ProductName");
                var precio= oEvent.getSource().getBindingContext().getProperty("UnitPrice");
                var cantidadStock = oEvent.getSource().getBindingContext().getProperty("UnitsInStock");
                
                var toast= "Producto: "+nombre+ ", "+ "Precio: "+precio + ", "+ "Stock: "+cantidadStock
                MessageBox.confirm(
                    bundle.getText("MensajePopUp"),
                    function(oAction){
                        if(MessageBox.Action.OK===oAction){
                            MessageToast.show(toast)
                        }
                    },
                    bundle.getText("TituloPopUp")
                )
            },
            viewDetail:function(oEvent){
                var oRouter = UIComponent.getRouterFor(this);
                var selectedItem = oEvent.getSource().getBindingContext().getObject();
                var selectedProductId=selectedItem.ProductID;
                oRouter.navTo("Routedetail", {
                    productId: selectedProductId
                });
            },
            barraBusqueda:function(oEvent){
                var filters=[];
                var query= oEvent.getParameter("query");
                if(query && query.length>0){
                    filters.push(new Filter({
                        path: "UnitsInStock",
                        operator: FilterOperator.LT,
                        value1:query
                    }));
                }
                var tabla= this.getView().byId("tablaProductos");
                var binding= tabla.getBinding("rows");
                binding.filter(filters)
            }
        });
    });
