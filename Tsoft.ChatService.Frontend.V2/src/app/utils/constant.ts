export const defaultRequestList = {
  listTextSearch: [],
  currentPage: 1,
  pageSize: 20,
  sort: '-EditedDate', // -: desc | +: asc
};

export const userRequestList = {
  fulltextsearch: "",
  page: 1,
  size: 20,
  sort: '-EditedDate', // -: desc | +: asc
};

export const countryRequestList = {
  FullTextSearch: "",
  page: 1,
  size: 20,
  sort: '-EditedDate', // -: desc | +: asc
};

export const GRID_ATTRIBUTES: any = {
  total: 0,
  pi: 1,
  ps: 10,
  sorter: '',
};

export const SELECT_DATAS = {
  PRODUCT_PRODUCT: {
    t: 'product_product',
    cs: ['id', 'default_code', 'product_tmpl_id'],
    w: 'active = 1',
  },
  UOM_UOM: {
    t: 'uom_uom',
    cs: ['id', 'name', 'category_id', 'factor'],
    w: 'active = 1',
    lm: '999',
  },
  MRP_LOCATION: {
    t: 'stock_location',
    cs: ['id', 'name', 'complete_name'],
    lm: '999',
  },
  MRP_WORKCENTER: {
    t: 'mrp_workcenter',
    cs: ['id', 'name'],
    w: 'active = 1',
    l: '',
    pl: 'name:',
  },
  RES_LANG: {
    t: 'res_lang',
    cs: ['id', 'name', 'code'],
    w: 'active = 1',
    lm: '999',
  },
  PRODUCT_CATEGORY: {
    t: 'product_category',
    cs: ['id', 'name', 'parent_path', 'complete_name'],
    lm: '999',
  },
  ACCOUNT_TAX: {
    t: 'account_tax',
    cs: ['id', 'name'],
    w: "type_tax_use = 'sale' and active = 1",
    lm: '999',
  },
  PRODUCT_ATTRIBUTE: {
    t: 'product_attribute',
    cs: ['id', 'name'],
    lm: '999',
  },
  PRODUCT_ATTRIBUTE_VALUE: {
    t: 'product_attribute_value',
    cs: ['id', 'name', 'attribute_id'],
    lm: '999',
  },
  IDM_USER: {
    t: 'idm_user',
    cs: ['id', 'name'],
    w: 'isLocked = 0',
  },
  RES_CURRENCY: {
    t: 'res_currency',
    cs: ['id', 'name'],
    w: 'active = 1',
  },
  ACCOUNT_PAYMENT_TERM: {
    t: 'account_payment_term',
    cs: ['id', 'name'],
    w: 'active = 1',
  },
  MRP_PRODUCTION: {
    t: 'mrp_production',
    cs: ['id', 'name'],
    w: '',
    l: '',
    pl: 'name:',
  },
  RES_COMPANY: {
    t: 'res_company',
    cs: ['id', 'name'],
    w: '',
    l: '',
    pl: 'name:',
  },
  RES_COUNTRY_STATE: {
    t: 'res_country_state',
    cs: ['id', 'name'],
    w: '',
    l: '',
    pl: 'name:',
  },
  RES_COUNTRY: {
    t: 'res_country',
    cs: ['id', 'name'],
    w: '',
    l: '',
    pl: 'name:',
  },
  STOCK_WAREHOUSE: {
    t: 'stock_warehouse',
    cs: ['id', 'name'],
    w: '',
    l: '',
    pl: 'name:',
  },
  UOM_CATEGORY: {
    t: 'uom_category',
    cs: ['id', 'name'],
    l: '',
    pl: 'name:',
  },
};
export const PRODUCT_TEMPLATE_TYPE = [
  { text: 'Tiêu dùng', value: 'consu' },
  { text: 'Dịch vụ', value: 'service' },
  { text: 'Sản phẩm', value: 'product' },
];
export const PU_ORDER_STATE_SELECT = [
  { text: 'Chưa thực hiện', value: '0' },
  { text: 'Đang thực hiện', value: '1' },
  { text: 'Hoàn thành', value: '2' },
  { text: 'Hủy bỏ', value: '3' },
];
export const SALE_ORDER_STATE_SELECT = [
  { text: 'Đang soạn thảo', value: 'draft' },
  { text: 'Đang thực hiện', value: 'sent' },
  { text: 'Đã xác nhận', value: 'sale' },
  { text: 'Hoàn thành', value: 'done' },
];
export const SALE_ORDER_STATE = {
  DRAFT: 'draft',
  SENT: 'sent',
  SALE: 'sale',
  DONE: 'done',
  LOCK: 'lock',
};
export const PU_ORDER_STATE = {
  WARNING: '0',
  PROGRESS: '1',
  DONE: '2',
  CANCEL: '3',
  LOCK: '4',
};
export const workOrderState = {
  PROGRESS: 'progress',
  PENDING: 'pending',
  DONE: 'done',
  READY: 'ready',
};
export const MEASURE_TYPE = {
  volume: 'volume',
  unit: 'unit',
  weight: 'weight',
  time: 'time',
  length: 'length',
};
export const MEASURE_TYPE_SELECT = [
  { text: 'Units', value: 'unit' },
  { text: 'Khối lượng', value: 'weight' },
  { text: 'Thời gian', value: 'time' },
  { text: 'Chiều dài', value: 'length' },
  { text: 'Thể tích', value: 'volume' },
];
export const UOM_TYPE = {
  bigger: 'bigger',
  reference: 'reference',
  smaller: 'smaller',
};
export const UOM_TYPE_SELECT = [
  { text: 'Lớn hơn đơn vị đo lường gốc', value: 'bigger' },
  { text: 'Đơn vị gốc của nhóm này', value: 'reference' },
  { text: 'Nhỏ hơn đơn vị gốc của nhóm này', value: 'smaller' },
];
export const STOCK_INVENTORY_STATE = [
  { text: 'Lưu nháp', value: '0' },
  { text: 'Gửi duyệt', value: '1' },
  { text: 'Đã duyệt', value: '2' },
];
export const STOCK_TRANSFER_STATE = [
  { text: 'Nháp', value: 'draft' },
  { text: 'Chờ', value: 'assigned' },
  { text: 'Sẵn sàng', value: 'confirmed' },
  { text: 'Hoàn thành', value: 'done' },
  { text: 'Đã hủy', value: 'cancel' },
];
export const STOCK_INVENTORY_VOUCHER_TYPE = {
  MATERIAL: 0,
  FINISHED_PRODUCT: 1,
  SCRAPPED: 2,
  FINISH_PRODUCT_WORK_ORDER: 4,
};
export const STOCK_INVENTORY_FILTER = [
  { text: 'Chỉ một sản phẩm', value: 'product' },
  { text: 'Chọn sản phẩm một cách thủ công', value: 'partial' },
];
export const RES_PARTNER_TITLE = {
  COMPANY: '0',
  INDIVIDUAL: '1',
  INDIVIDUAL_OF_COMPANY: '2',
};
export const RES_PARTNER_WARN = [
  { text: 'Không tin nhắn', value: '0' },
  { text: 'Cảnh báo', value: '1' },
  { text: 'Chặn tin nhắn', value: '2' },
];
export const LOCATION_DEFAULT = {
  locationDefaultId: '01d801c5-44ae-4f76-a9a9-1309db29ae44',
  virtualLocationScrapped: 'F320C02E-6FF2-4D1D-8399-E27D2DC9A319',
  virtualLocationProduction: '3c905bcc-71f1-48d1-85b2-5868561714af',
};

export const TRACKING_ACTION = [
  {
    name: 'ADD',
    style: {
      'background-color': '#28a745',
      color: '#fff',
    },
    color: '',
    value: 'Thêm mới',
    i18n: 'message.tracking.add',
  },
  {
    name: 'UPDATE',
    style: {
      'background-color': '#ffc107',
      color: '#fff',
    },
    color: '#',
    value: 'Cập nhật',
    i18n: 'message.tracking.update',
  },
  {
    name: 'DELETE',
    style: {
      'background-color': '#dc3545',
      color: '#fff',
    },
    color: '#',
    value: 'Xóa',
    i18n: 'message.tracking.delete',
  },
  {
    name: 'LOGIN',
    style: {
      'background-color': '#007bff',
      color: '#fff',
    },
    color: '#',
    value: 'Đăng nhập',
    i18n: 'message.tracking.login',
  },
  {
    name: 'LOGOUT',
    style: {
      'background-color': '#6c757d',
      color: '#fff',
    },
    color: '#',
    value: 'Đăng xuất',
    i18n: 'message.tracking.logout',
  },
  {
    name: 'DUPLICATE',
    style: {
      'background-color': '#17a2b8',
      color: '#fff',
    },
    color: '#',
    value: 'Nhân bản',
    i18n: 'message.tracking.duplicate',
  },
  {
    name: 'SUBMIT',
    style: {
      'background-color': '#f8f9fa',
      color: '#212529',
    },
    color: '#',
    value: 'Gửi',
    i18n: 'message.tracking.submit',
  },
];
export const ACTION_TYPE = [{ text: 'Dịch chuyển nội bộ', value: 'direct' }];
export const DATE_UTC_FORMAT = 'yyyy-MM-ddTHH:mm:ss';
export const WORKFLOW_SCHEME = {
  PU_REQUEST: {
    schemeCode: 'TG.PU_REQUEST',
    referenceObject: 'PURequest',
  },
  PU_ORDER: {
    schemeCode: 'TG.PU_ORDER',
    referenceObject: 'PUOrder',
  },
  SALE_QUOTA: {
    schemeCode: 'TG.SALE_QUOTA',
    referenceObject: 'SAOrder',
  },
  PU_STOCK_PICKING: {
    schemeCode: 'TG.PU_STOCK_PICKING',
    referenceObject: 'stock_picking',
  },
  SO_STOCK_PICKING: {
    schemeCode: 'TG.SO_STOCK_PICKING',
    referenceObject: 'stock_picking',
  },
};
export const PHONE_NUMBER_REGEX = /^[0-9\.\-\/\+\(\)\s]+$/;
export const EMAIL_REGEX = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
// export const FAX_REGEX = /^\+?[0-9]{6,}$/;
export const FAX_REGEX = /^[0-9\.\-\/\+\(\)\s]+$/;
export const ERROR_MESSAGE = {
  InvalidUser: 'InvalidUser'
}
