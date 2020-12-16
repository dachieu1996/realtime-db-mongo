// import  from './constant';
import { environment } from '@env/environment';
export const ProductRouter = {
  Create: 'api/product/create',
};
export const ResourceCalendar = {
  GetListResourceCalendar: `api/v${environment.API_VERSION}/mrp/resource_calendar/getlist`,
};
export const configurationRouter = {
  selectdata: `api/v${environment.API_VERSION}/mrp/configuration/search_data`,
  sysParams: `api/v${environment.API_VERSION}/mrp/configuration/sys_params`,
};
export const nodeUploadRouter = {
  nodeUploadBlob: `api/v${environment.API_VERSION}/core/nodes/upload/physical/blob`,
};
export const navigationRouter = {
  getNavigationOwner: `api/v${environment.API_VERSION}/bsd/navigations/owner`,
};
export const sysParamRouter = {
  getSysParam: `v${environment.API_VERSION}/sys-params`,
  getAllCurrency: `v${environment.API_VERSION}/currencies`,
};
export const resCountryRouter = {
  getFilter: `v${environment.API_VERSION}/country/filter`,
  create: `v${environment.API_VERSION}/country`,
  getById: `v${environment.API_VERSION}/country`,
  update: `v${environment.API_VERSION}/country`,
  delete: `api/v${environment.API_VERSION}/mrp/res-country/delete/many`,
};
export const resCountryStateRouter = {
  getListResCountryState: `api/v${environment.API_VERSION}/mrp/res-country-state/list`,
  createResCountryState: `api/v${environment.API_VERSION}/mrp/res-country-state/create`,
  getResCountryStateById: `api/v${environment.API_VERSION}/mrp/res-country-state/detail`,
  editResCountryState: `api/v${environment.API_VERSION}/mrp/res-country-state/edit`,
  deleteResCountryState: `api/v${environment.API_VERSION}/mrp/res-country-state/delete/many`,
};
export const idmUser = {
  getListRight: `api/v${environment.API_VERSION}/idm/users/`,
  filter: `api/v${environment.API_VERSION}/idm/users/filter`,
};
export const trackingRouter = {
  listTracking: `api/v${environment.API_VERSION}/bsd/logs`,
};
export const noticeRouter = {
  getAllNoticeByUser: `api/v${environment.API_VERSION}/sys/notices/get-by-user`,
  markAsReadNoticeByUser: `api/v${environment.API_VERSION}/sys/notices/mark-as-read`,
};
export const baseOrganizationRouter = {
  getFilter: `v${environment.API_VERSION}/organization/filter`,
  create: `v${environment.API_VERSION}/organization`,
  getById: `v${environment.API_VERSION}/organization`,
  update: `v${environment.API_VERSION}/organization`,
  delete: `v${environment.API_VERSION}/organization/delete/many`,
};
export const filenetArchiveTypeRouter = {
  getFilter: `v${environment.API_VERSION}/archive-type/filter`,
  getById: `v${environment.API_VERSION}/archive-type`,
  getAllArchiveType: `v${environment.API_VERSION}/archive-type`,
  createArchiveType: `v${environment.API_VERSION}/archive-type`,
  update: `v${environment.API_VERSION}/archive-type`,
  delete: `v${environment.API_VERSION}/archive-type`,
  deleteMany: `v${environment.API_VERSION}/archive-type/delete/many`,
  getReport: `v${environment.API_VERSION}/archive-type/record-collections/reports`,
};
export const filenetArchivalFondRouter = {
  getFilter: `v${environment.API_VERSION}/archivalFond/filter`,
  create: `v${environment.API_VERSION}/archivalFond`,
  deleteMany: `v${environment.API_VERSION}/archivalFond/delete/many`,
  getById: `v${environment.API_VERSION}/archivalFond`,
  update: `v${environment.API_VERSION}/archivalFond`,
};
export const filenetRecordCollectionRouter = {
  getFilter: `v${environment.API_VERSION}/record-collection/filter`,
  create: `v${environment.API_VERSION}/record-collection`,
  getById: `v${environment.API_VERSION}/record-collection`,
  update: `v${environment.API_VERSION}/record-collection`,
  deleteMany: `v${environment.API_VERSION}/record-collection/delete/many`,
  getReport: `v${environment.API_VERSION}/record-collection/report`,
};
export const filenetRecordRouter = {
  getFilter: `v${environment.API_VERSION}/record/filter`,
  create: `v${environment.API_VERSION}/record`,
  deleteMany: `v${environment.API_VERSION}/record/delete/many`,
  getById: `v${environment.API_VERSION}/record`,
  update: `v${environment.API_VERSION}/record`,
};
export const filenetReportRouter = {
  getReportArchiveType: `v${environment.API_VERSION}/report/archive-type/record-collections`,
  getReportTotal: `v${environment.API_VERSION}/report/total`
};
export const managerFileRouter = {
  uploadaAFile: `v${environment.API_VERSION}/files`,
  uploadMultiFile: `v${environment.API_VERSION}/files/multiple`,
  getFileByParent: `v${environment.API_VERSION}/files`,
  downloadFile: `v${environment.API_VERSION}/download`,
  deleteFile: `v${environment.API_VERSION}/files`,
  updateFile: `v${environment.API_VERSION}/files`,
  getFile: `v${environment.API_VERSION}/files`,
  getFileFilter: `v${environment.API_VERSION}/files/filter`,
  generateTokenLinkByParentId: `v${environment.API_VERSION}/download/linksByParent`,
  generateTokenLinkByDocumentId: `v${environment.API_VERSION}/download`,
};
export const filenetReaderProfileRouter = {
  getFilter: `v${environment.API_VERSION}/reader-profile/filter`,
  create: `v${environment.API_VERSION}/reader-profile`,
  getById: `v${environment.API_VERSION}/reader-profile`,
  getByUserId: `v${environment.API_VERSION}/reader-profile/get-by-user-id`,
  update: `v${environment.API_VERSION}/reader-profile`,
  deleteMany: `v${environment.API_VERSION}/reader-profile/delete/many`,
  getCountry: `v${environment.API_VERSION}/countries`,
  getCountryByCountryCode: `v${environment.API_VERSION}/countries`,
};
export const filenetReaderRequestRouter = {
  getFilter: `v${environment.API_VERSION}/reader-request/filter`,
  create: `v${environment.API_VERSION}/reader-request`,
  getById: `v${environment.API_VERSION}/reader-request`,
  update: `v${environment.API_VERSION}/reader-request`,
  deleteMany: `v${environment.API_VERSION}/reader-request/delete/many`,
  sendRequest: `v${environment.API_VERSION}/reader-request`,
  performRequest: `v${environment.API_VERSION}/reader-request`,
};

export const filenetReaderRequestRecordRouter = {
  getFilter: `v${environment.API_VERSION}/reader-request-record/filter`,
  create: `v${environment.API_VERSION}/reader-request-record`,
  getById: `v${environment.API_VERSION}/reader-request-record`,
  update: `v${environment.API_VERSION}/reader-request-record`,
  createMany: `v${environment.API_VERSION}/reader-request-record/create/many`,
  updateMany: `v${environment.API_VERSION}/reader-request-record/update/many`,
  deleteMany: `v${environment.API_VERSION}/reader-request-record/delete/many`,
  getByRequestId: `v${environment.API_VERSION}/reader-request-record/get-by-request-id`,
};

export const managerReaderRouter = {
  create: `v${environment.API_VERSION}/reader-profile`,
  getUsers: `v${environment.API_VERSION}/users`,
};

export const managerACLRouter = {
  getRole: `v${environment.API_VERSION}/roles`,
  getUser: `v${environment.API_VERSION}/users`,
  getRight: `v${environment.API_VERSION}/rights`,
};

export const metadataServiceRouter = {
  getFilter: `v${environment.API_VERSION}/metaclass/filter`,
};

export const userManagerRouter = {
  getUsers: `user`,
  getUserById: `v${environment.API_VERSION}/users`,
  checkUserAvailable: `v${environment.API_VERSION}/users/`,
  checkEmailAvailable: `v${environment.API_VERSION}/users/`,
  create: `user`,
  resendPassword: `v${environment.API_VERSION}/users`,
  getParameter: `v${environment.API_VERSION}/parameters`,
};

export const customerRouter = {
  getCustomer: `customer`,
  deleteCustomer: `customer/delete/many`,
};

export const roleManagerRouter = {
  getRole: `permisson`,
  createRole: `role`,
  getDetailRole: `role`,
  updateRole: `role`,
  getListRole: `role`,
  deleteManyRole: `role/delete/many`,
};
export const employeeManagerRouter = {
  createEmployee: `employee`,
  getDetailEmployee: `employee/detail`,
  updateEmployee: `employee`,
  getListEmployee: `employee`,
  deleteEmployee: `employee/delete/many`
};
export const employeeRouter = {
  getEmployee: `employee`,
  deleteEmployee: `employee/delete/many`
};

export const filenetReaderRequestRecordLinkRouter = {
  createMany: `v${environment.API_VERSION}/reader-request-record-link/create/many`,
};
export const warehousePackageTypeRouter = {
  create: `v${environment.API_VERSION}/packagetype`,
  getFilter: `v${environment.API_VERSION}/packagetype/filter`,
  getById: `v${environment.API_VERSION}/packagetype`,
  update: `v${environment.API_VERSION}/packagetype`,
  deleteMany: `v${environment.API_VERSION}/packagetype/delete/many`,
  checkExist: `v${environment.API_VERSION}/packagetype/check-exist`,
};

export const warehousePackageRouter = {
  create: `v${environment.API_VERSION}/package`,
  getFilter: `v${environment.API_VERSION}/package/filter`,
  getById: `v${environment.API_VERSION}/package`,
  update: `v${environment.API_VERSION}/package`,
  deleteMany: `v${environment.API_VERSION}/package/delete/many`,
  arrangeItemInPackage: `v${environment.API_VERSION}/package/arrange-item`,
  getLocation: `v${environment.API_VERSION}/package`,
  getRecordLocation: `v${environment.API_VERSION}/package/get-record-location`,
  checkExist: `v${environment.API_VERSION}/package/check-exist`,
  checkItemExist: `v${environment.API_VERSION}/package/check-item-exist`,
};
export const warehouseRouter = {
  create: `v${environment.API_VERSION}/warehouse`,
  getWarehouseById: `v${environment.API_VERSION}/warehouse`,
  getFilterWarehouseRack: `v${environment.API_VERSION}/warehouseRack`,
  updateWarehouse: `v${environment.API_VERSION}/warehouse`,
  getFilter: `v${environment.API_VERSION}/warehouse/filter`,
  deleteMany: `v${environment.API_VERSION}/warehouse/delete/many`,
  checkExist: `v${environment.API_VERSION}/warehouse/check-exist`,
};

export const warehouseRackRouter = {
  create: `v${environment.API_VERSION}/warehouseRack`,
  getById: `v${environment.API_VERSION}/warehouseRack`,
  update: `v${environment.API_VERSION}/warehouseRack`,
  getFilter: `v${environment.API_VERSION}/warehouseRack/filter`,
  deleteMany: `v${environment.API_VERSION}/warehouseRack/delete/many`,
  getRackAttribute: `v${environment.API_VERSION}/warehouseRack/`,
};

export const warehouseRackAttributeRouter = {
  getByRackId: `v${environment.API_VERSION}/warehouseRackAttribute/get-by-warehouse-rack-id`,
};

export const packageRackRouter = {
  create: `v${environment.API_VERSION}/packageRack`,
  getByAttributeId: `v${environment.API_VERSION}/packageRack/get-by-rack-attribute-id`,
};

export const packageRouter = {
  create: `v${environment.API_VERSION}/package`,
  getById: `v${environment.API_VERSION}/package`,
  update: `v${environment.API_VERSION}/package`,
  getFilter: `v${environment.API_VERSION}/package/filter`,
  deleteMany: `v${environment.API_VERSION}/package/delete/many`,
};

export const partnerRouter = {
  getAll: `v${environment.API_VERSION}/res-partner`,
  getFilter: `v${environment.API_VERSION}/res-partner/filter`,
  getById: `v${environment.API_VERSION}/res-partner`,
};

export const opportunitiesRouter = {
  create: `v${environment.API_VERSION}/opportunity`,
  getFilter: `v${environment.API_VERSION}/opportunity`,
  deleteMany: `v${environment.API_VERSION}/opportunity/delete/many`,
  getOpportunity: `v${environment.API_VERSION}/opportunity`,
  update: `v${environment.API_VERSION}/opportunity`,
  updateMany: `v${environment.API_VERSION}/opportunity/id/process`,
};
export const categoryActionRouter = {
  getFilter: `v${environment.API_VERSION}/category-action`,
  create: `v${environment.API_VERSION}/category-action`,
  getCategoryAction: `v${environment.API_VERSION}/category-action`,
  checkExist: `v${environment.API_VERSION}/category-action/check-exist`,
};
export const marketingSourceRouter = {
  create: `v${environment.API_VERSION}/marketing-source`,
  getFilter: `v${environment.API_VERSION}/marketing-source`,
  deleteMany: `v${environment.API_VERSION}/marketing-source/delete/many`,
  getMarketingSource: `v${environment.API_VERSION}/marketing-source`,
  update: `v${environment.API_VERSION}/marketing-source`,
  checkExist: `v${environment.API_VERSION}/marketing-source/check-exist`,
};
export const sureyRecordRouter = {
  getFilter: `v${environment.API_VERSION}/survey-record`,
  deleteMany: `v${environment.API_VERSION}/survey-record/delete/many`,
  create: `v${environment.API_VERSION}/survey-record`,
  getById: `v${environment.API_VERSION}/survey-record`,
  update: `v${environment.API_VERSION}/survey-record`,
  sendRequest: `v${environment.API_VERSION}/survey-record/request`,
};

export const businessTypeRouter = {
  getFilter: `v${environment.API_VERSION}/res-business-type`,
  deleteMany: `v${environment.API_VERSION}/res-business-type/delete/many`,
  getById: `v${environment.API_VERSION}/res-business-type`,
}
export const authenticationRouter = {
  login: `authentication/login`
}

export const customerManagerRouter = {
  getCustomer: `customer`,
  create: `customer`,
  edit: `customer`,
  deleteMany: 'customer/delete/many'
};


export const addressManagerRouter = {
  getListAddress: `addresslist`,
};

export const fileManagerRouter = {
  uploadFile: `filemanager/uploadfile`
};

