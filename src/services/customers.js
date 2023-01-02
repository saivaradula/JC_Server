const db = require('./db.service');
const helper = require('../utils/helper.util');
const config = require('../configs/general.config');
var md5 = require('md5');

const addCustomer = async (customerDetails) => {
    console.log(customerDetails)
    try {
        let cust = `
            INSERT INTO customers 
            (
                name, customer_id, customer_type, company_name,
                summary, registration_id, vat, primary_contact_name,
                primary_contact_number, secondary_contact_number, primary_email,
                website, social_handles, delivery_address, source,
                billing_name, accounts_payable_contact_name, accounts_payable_email, 
                created_by, termsconditions, university, course, tutor
            )
            VALUES 
            (
                "${customerDetails?.pcn || 'N/A'}", "${customerDetails.customer_id}", "${customerDetails.customer_type}",
                 "${customerDetails?.company_name || 'N/A'}", 
                "${customerDetails?.summary || 'N/A'}", "${customerDetails?.company_reg_no || 'N/A'}",
                "${customerDetails?.company_vat || 'N/A'}", "${customerDetails?.pcn || 'N/A'}", "${customerDetails?.cnp || 'N/A'}",
                "${customerDetails?.cns || 'N/A'}", "${customerDetails?.email || 'N/A'}", "${customerDetails?.website || 'N/A'}",
                "${customerDetails?.social || 'N/A'}", "${customerDetails?.daddress || 'N/A'}", 
                "${customerDetails?.source || 'N/A'}", "${customerDetails?.billname || 'N/A'}", "${customerDetails?.apn || 'N/A'}",
                "${customerDetails?.ape || 'N/A'}", "${customerDetails.created_by || 'N/A'}", "${customerDetails?.cterms || 'N/A'}",
                "${customerDetails?.university || 'N/A'}", "${customerDetails.course || 'N/A'}", "${customerDetails?.tutor || 'N/A'}"
            )
        `;
        console.log(cust)
        const nCustomer = await db.query(cust);

        console.log("customerDetails.bname_1", customerDetails.bname_1.length)

        if (customerDetails.bname_1 !== ''
            || customerDetails.bname_1 !== 'undefined'
            || customerDetails.bname_1 !== undefined) {
            let brand = `INSERT INTO brands ( customer_id, brand_name, created_by, btype, notes )
            VALUES 
            (
                "${nCustomer.insertId}", "${customerDetails.bname_1}",
                "${customerDetails.created_by}", 'branch', 'NULL'
            )`;
            console.log(brand)
            await db.query(brand);
        }

        if (customerDetails.bname_2 !== '' || customerDetails.bname_2 !== undefined || customerDetails.bname_2 !== 'undefined') {
            let brand = `INSERT INTO brands ( customer_id, brand_name, created_by, btype, notes )
            VALUES 
            (
                "${nCustomer.insertId}", "${customerDetails.bname_2}",
                "${customerDetails.created_by}", 'branch', 'NULL'
            )`;

            await db.query(brand);
        }

        if (customerDetails.bname_3 !== '' || customerDetails.bname_3 !== undefined || customerDetails.bname_3 !== 'undefined') {
            let brand = `INSERT INTO brands ( customer_id, brand_name, created_by, btype, notes )
            VALUES 
            (
                "${nCustomer.insertId}", "${customerDetails.bname_3}",
                "${customerDetails.created_by}", 'branch', 'NULL'
            )`;

            await db.query(brand);
        }
        return nCustomer;

    } catch (error) {
        return { error };
    }
}

const addBrand = async (brandDetails) => {
    let brand = `INSERT INTO brands ( customer_id, brand_name, created_by, notes )
    VALUES 
    (
        "${brandDetails.customerId}", "${brandDetails.brand_name}",
        "${brandDetails.created_by}", "${brandDetails.brand_notes}"
    )`
    const nBrand = await db.query(brand);
    return nBrand.insertId;
}


const addProduct = async (productDetails) => {
    let product = `INSERT INTO products  
                ( customer_id, brand_id, season_id, collection_id, created_by, notes, name )
            VALUES 
            (
                "${productDetails.customer_id}", "${productDetails.brand_id}", 
                "${productDetails.season_id}", "${productDetails.collection_id}", 
                "${productDetails.created_by}", "${productDetails.product_notes}", 
                "${productDetails.product_name}"
            )
        `
    const nProduct = await db.query(product)
    return nProduct.insertId;
}



const addComponent = async (cDetails) => {
    let component = `INSERT INTO components  
                ( customer_id, brand_id, season_id, collection_id, product_id, 
                    created_by, notes, name )
            VALUES 
            (
                "${cDetails.customer_id}", "${cDetails.brand_id}", "${cDetails.season_id}",
                "${cDetails.collection_id}", "${cDetails.product_id}",
                "${cDetails.created_by}",
                "${cDetails.component_notes}", "${cDetails.component_name}"
            )
        `;
    return await db.query(component);
}

const getCustomers = async () => {
    try {
        const sql = `
            SELECT C.* 
            FROM customers C 
            WHERE
                C.is_active = 1`;
        let rows = await db.query(sql);
        const data = helper.emptyOrRows(rows);
        return {
            data
        }
    } catch (error) {
        return { error }
    }
}

const getCustomerBrands = async (id) => {
    try {
        const sql = `
            SELECT B.* 
            FROM brands B 
            WHERE
                B.customer_id = ${id} AND
                B.is_active = 1`;
        let rows = await db.query(sql);
        const data = helper.emptyOrRows(rows);
        return {
            data
        }
    } catch (error) {
        return { error }
    }
}

const getCustomerSeason = async (id, brandId) => {
    try {
        let where = `S.customer_id = ${id} AND S.is_active = 1`
        // where = brandId > 0 ? `${where} AND S.brand_id = ${brandId}` : where

        let sql = `SELECT S.*, B.brand_name FROM seasons S 
                   LEFT JOIN brands B on B.id = S.brand_id WHERE ${where}`
        let rows = await db.query(`${sql}`);
        const data = helper.emptyOrRows(rows);
        return {
            data
        }
    } catch (error) {
        return { error }
    }
}

const getCustomerCollection = async (id, brandId, seasonId) => {
    try {
        let select = 'C.*'
        let tables = `collections C`
        let where = `C.customer_id = ${id} AND C.is_active = 1`;

        // where = brandId > 0 ? `${where} AND B.id = ${brandId} AND B.id = C.brand_id` : where
        // where = seasonId > 0 ? `${where} AND C.season_id = S.id AND S.id = ${seasonId} ` : where
        const sql = `
                    SELECT C.*, B.brand_name, S.name AS sname 
                    FROM collections C
                    LEFT JOIN brands B on B.id = C.brand_id
                    LEFT JOIN seasons S on S.id = C.season_id 
                    WHERE ${where}
                    `
        let rows = await db.query(sql);
        const data = helper.emptyOrRows(rows);
        return {
            data
        }
    } catch (error) {
        return { error }
    }
}

const getCustomerProducts = async (id, brandId, seasonId, collectionId, mouldId, componentId) => {
    try {

        let where = `P.customer_id = ${id} AND P.is_active = 1`;

        where = brandId > 0 ? `${where} AND B.id = ${brandId} AND B.id = P.brand_id` : where
        where = seasonId > 0 ? `${where} AND P.season_id = S.id AND S.id = ${seasonId} ` : where
        where = collectionId > 0 ? `${where} AND C.id = P.collection_id AND C.id = ${collectionId} ` : where
        where = mouldId > 0 ? `${where} AND M.id = P.mould_id AND M.id = ${mouldId} ` : where
        where = componentId > 0 ? `${where} AND CP.id = P.component_id AND CP.id = ${componentId} ` : where

        const sql = `
                    SELECT P.*, B.brand_name, S.name AS sname, C.name as cname
                    FROM products P
                    LEFT JOIN brands B on B.id = P.brand_id
                    LEFT JOIN seasons S on S.id = P.season_id 
                    LEFT JOIN collections C on C.id = P.collection_id
                    LEFT JOIN moulds M on M.id = P.mould_id
                    LEFT JOIN components CP ON CP.id = P.component_id
                    WHERE ${where}
                    `
        let rows = await db.query(sql);
        const data = helper.emptyOrRows(rows);
        return {
            data
        }
    } catch (error) {
        return { error }
    }
}

const getCustomerMoulds = async (id, brandId, seasonId, collectionId) => {
    try {

        let where = `M.customer_id = ${id} AND M.is_active = 1`;
        where = brandId > 0 ? `${where} AND B.id = ${brandId} AND B.id = M.brand_id` : where
        where = seasonId > 0 ? `${where} AND M.season_id = S.id AND S.id = ${seasonId} ` : where
        where = collectionId > 0 ? `${where} AND C.id = M.collection_id AND C.id = ${collectionId} ` : where
        // where = productId > 0 ? `${where} AND PR.id = M.product_id AND PR.id = ${productId} ` : where

        const sql = `
                    SELECT M.*, B.brand_name, S.name AS sname, C.name as cname
                    FROM moulds M
                    LEFT JOIN brands B on B.id = M.brand_id
                    LEFT JOIN seasons S on S.id = M.season_id 
                    LEFT JOIN collections C on C.id = M.collection_id
                    WHERE ${where}`

        let rows = await db.query(sql);
        const data = helper.emptyOrRows(rows);
        return {
            data
        }
    } catch (error) {
        return { error }
    }
}

const getCustomerComponents = async (id, brandId, seasonId, collectionId) => {
    try {

        let where = `M.customer_id = ${id} AND M.is_active = 1`;
        where = brandId > 0 ? `${where} AND B.id = ${brandId} AND B.id = M.brand_id` : where
        where = seasonId > 0 ? `${where} AND M.season_id = S.id AND S.id = ${seasonId} ` : where
        where = collectionId > 0 ? `${where} AND C.id = M.collection_id AND C.id = ${collectionId} ` : where
        // where = productId > 0 ? `${where} AND PR.id = M.product_id AND PR.id = ${productId} ` : where

        const sql = `
                    SELECT M.*, B.brand_name, S.name AS sname, C.name as cname
                    FROM components M
                    LEFT JOIN brands B on B.id = M.brand_id
                    LEFT JOIN seasons S on S.id = M.season_id 
                    LEFT JOIN collections C on C.id = M.collection_id
                    WHERE ${where}`

        let rows = await db.query(sql);
        const data = helper.emptyOrRows(rows);
        return {
            data
        }
    } catch (error) {
        return { error }
    }
}

module.exports = {
    addCustomer,
    getCustomers,
    getCustomerBrands,
    getCustomerSeason,
    getCustomerCollection,
    getCustomerProducts,
    getCustomerMoulds,
    getCustomerComponents
}