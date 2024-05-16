const { gql } = require('apollo-server');
const fs = require('fs');
const path = require('path');

// Load JSON schema files
const poData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'PO.json')));
const deliveryOrderData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'Delivery_Ordertax_Invoice.json')));
const creditNoteData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'Credit_Note.json')));
const debitNoteData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'Dedit_Note.json')));
const receiptTaxInvoiceData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'ReceiptTax_Invoice.json')));

// Define GraphQL schema
const typeDefs = gql `
  type Tax {
    Code: String
    Rate: Float
    Amount: Float
  }

  type Item {
    No: String
    Id: Int
    Name: String
    Description: String
    Quantity: Int
    Unit: String
    Price: Float
    Amount: Float
    Tax: Tax
    TaxAmount: Float
    Total: Float
  }

  type LineItems {
    Item: [Item]
  }

  type Buyer {
    ID: String
    Name: String
    TaxID: String
    Branch: String
    BuildingNo: Int
    Street: String
    District: String
    City: String
    Province: String
    PostalCode: Int
    CountryCode: String
    CountryName: String
    Telephone: String
    Contact: String
  }

  type Seller {
    ID: String
    Name: String
    TaxID: String
    Branch: String
    BuildingNo: Int
    Street: String
    District: String
    City: String
    Province: String
    PostalCode: Int
    CountryCode: String
    CountryName: String
    Telephone: String
    Contact: String
  }

  type PO {
    TypeCode: String
    No: String
    Date: String
    Seller: Seller
    Buyer: Buyer
    LineItems: LineItems
    Total: Float
  }

  type DeliveryOrder {
    TypeCode: String
    No: String
    Date: String
    Seller: Seller
    Buyer: Buyer
    LineItems: LineItems
    Total: Float
  }

  type CreditNote {
    CreditNoteNo: String
    InvoiceNo: String
    Date: String
    Amount: Float
    Description: String
  }

  type DebitNote {
    DebitNoteNo: String
    InvoiceNo: String
    Date: String
    Amount: Float
    Description: String
  }

  type ReceiptTaxInvoice {
    TypeCode: String
    TypeNameTh: String
    TypeNameEn: String
    No: String
    Date: String
    Seller: Seller
    Buyer: Buyer
    LineItems: LineItems
    Total: Float
  }

  type Query {
    getPO: PO
    getDeliveryOrder: DeliveryOrder
    getCreditNotes: [CreditNote]
    getDebitNotes: [DebitNote]
    getReceiptTaxInvoices: [ReceiptTaxInvoice]
  }
`;

// Define resolvers
const resolvers = {
    Query: {
        getPO: () => poData,
        getDeliveryOrder: () => deliveryOrderData,
        getCreditNotes: () => creditNoteData,
        getDebitNotes: () => debitNoteData,
        getReceiptTaxInvoices: () => receiptTaxInvoiceData,
    },
};

module.exports = {
    typeDefs,
    resolvers
};