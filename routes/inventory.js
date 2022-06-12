const express = require("express");
const router = express.Router();

const inventor_controller = require("../controllers/inventorController");
const item_controller = require("../controllers/itemController");
const item_instance_controller = require("../controllers/itemInstanceController");
const type_controller = require("../controllers/typeController");
const index_controller = require("../controllers/indexController");


router.get('/', index_controller.index);

/// ITEM ROUTES ///

// GET request for creating a item. NOTE This must come before routes that display item (uses id).
router.get('/item/create', item_controller.item_create_get);

// POST request for creating item.
router.post('/item/create', item_controller.item_create_post);

// GET request to delete item.
router.get('/item/:id/delete', item_controller.item_delete_get);

// POST request to delete item.
router.post('/item/:id/delete', item_controller.item_delete_post);

// GET request to update item.
router.get('/item/:id/update', item_controller.item_update_get);

// POST request to update item.
router.post('/item/:id/update', item_controller.item_update_post);

// GET request for one item.
router.get('/item/:id', item_controller.item_detail);

// GET request for list of all item items.
router.get('/items', item_controller.item_list);

/// ITEMINSTANCE ROUTES ///

// GET request for creating a itemInstance. NOTE This must come before route that displays itemInstance (uses id).
router.get('/iteminstance/create', item_instance_controller.iteminstance_create_get);

// POST request for creating itemInstance.
router.post('/iteminstance/create', item_instance_controller.iteminstance_create_post);

// GET request to delete itemInstance.
router.get('/iteminstance/:id/delete', item_instance_controller.iteminstance_delete_get);

// POST request to delete itemInstance.
router.post('/iteminstance/:id/delete', item_instance_controller.iteminstance_delete_post);

// GET request to update itemInstance.
router.get('/iteminstance/:id/update', item_instance_controller.iteminstance_update_get);

// POST request to update itemInstance.
router.post('/iteminstance/update', item_instance_controller.iteminstance_update_post);

// GET request for one itemInstance.
router.get('/iteminstance/:id', item_instance_controller.iteminstance_detail);

// GET request for list of all itemInstance.
router.get('/iteminstances', item_instance_controller.iteminstance_list);


/// INVENTOR ROUTES ///

// GET request for creating inventor. NOTE This must come before route for id (i.e. display inventor).
router.get('/inventor/create', inventor_controller.inventor_create_get);

// POST request for creating inventor.
router.post('/inventor/create', inventor_controller.inventor_create_post);

// GET request to delete inventor.
router.get('/inventor/:id/delete', inventor_controller.inventor_delete_get);

// POST request to delete inventor.
router.post('/inventor/:id/delete', inventor_controller.inventor_delete_post);

// GET request to update inventor.
router.get('/inventor/:id/update', inventor_controller.inventor_update_get);

// POST request to update inventor.
router.post('/inventor/:id/update', inventor_controller.inventor_update_post);

// GET request for one inventor.
router.get('/inventor/:id', inventor_controller.inventor_detail);

// GET request for list of all inventors.
router.get('/inventors', inventor_controller.inventor_list);

/// TYPE ROUTES ///

// GET request for creating a type. NOTE This must come before route that displays type (uses id).
router.get('/type/create', type_controller.type_create_get);

//POST request for creating type.
router.post('/type/create', type_controller.type_create_post);

// GET request to delete type.
router.get('/type/:id/delete', type_controller.type_delete_get);

// POST request to delete type.
router.post('/type/:id/delete', type_controller.type_delete_post);

// GET request to update type.
router.get('/type/:id/update', type_controller.type_update_get);

// POST request to update type.
router.post('/type/:id/update', type_controller.type_update_post);

// GET request for one type.
router.get('/type/:id', type_controller.type_detail);

// GET request for list of all type.
router.get('/types', type_controller.type_list);

module.exports = router;