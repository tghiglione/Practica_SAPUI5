sap.ui.define([], function () {
    "use strict";
    return {

        discontinuedState: function (sDiscontinued) {
            if (sDiscontinued == true) {
                return "Prod Discontinuado";
            } else {
                return "Prod No Discontinuado";
            }
        },
        Status:function(sPrice){
            if (sPrice > 10) {
                return "Alto";
            } else {
                return "Bajo";
            }
        }   
    };
});