odoo.define('bi_pos_default_customer.DefaultCustomer', function (require) {
"use strict";

    var models = require('point_of_sale.models');
    models.load_fields('pos.config', 'res_partner_id');

    var DefaultCustomer = models.Order.prototype;
    models.Order = models.Order.extend({
        initialize: function(attr,options) {
            DefaultCustomer.initialize.call(this,attr,options);
            var default_customer = this.pos.config.res_partner_id;
            var default_customer_by_id = this.pos.db.get_partner_by_id(default_customer[0]);
            if (default_customer_by_id) {
                this.set_client(default_customer_by_id);
            }
            else {
               this.set_client(null);
            }
        },
    });
});