import { USER_PERMISSION } from './UserPermissionMapping';

export const UrlPermission = [
    //Check Quyền URL Cơ hội
    {
        url: 'opportunity/opportunities',
        codeRight: USER_PERMISSION.OPPORTUNITY_OPPORTUNITY_READ
    },
    {
        url: 'opportunity/opportunities/create',
        codeRight: USER_PERMISSION.OPPORTUNITY_OPPORTUNITY_CREATE
    },
    {
        url: 'opportunity/opportunities/detail',
        codeRight: USER_PERMISSION.OPPORTUNITY_OPPORTUNITY_UPDATE
    },
    //Check Quyền URL Hồ Sơ Khảo Sát
    {
        url: 'surveyrecords/survey-records',
        codeRight: USER_PERMISSION.OPPORTUNITY_SURVEYRECORDS_READ
    },
    {
        url: 'surveyrecords/survey-records/create',
        codeRight: USER_PERMISSION.OPPORTUNITY_SURVEYRECORDS_CREATE
    },
    {
        url: 'surveyrecords/survey-records/detail',
        codeRight: USER_PERMISSION.OPPORTUNITY_SURVEYRECORDS_UPDATE
    },

    //Check Quyền URL Báo giá
    {
        url: 'pricequote/pricequote',
        codeRight: USER_PERMISSION.OPPORTUNITY_PRICEQUOTE_READ
    },
    {
        url: 'pricequote/pricequote/create',
        codeRight: USER_PERMISSION.OPPORTUNITY_PRICEQUOTE_CREATE
    },
    {
        url: 'pricequote/pricequote/detail',
        codeRight: USER_PERMISSION.OPPORTUNITY_PRICEQUOTE_UPDATE
    },

    //Check Quyền URL Cơ hội
    {
        url: 'contract/contract',
        codeRight: USER_PERMISSION.CONTACT_CONTRACT_READ
    },
    {
        url: 'contract/contract/create',
        codeRight: USER_PERMISSION.CONTACT_CONTRACT_CREATE
    },

    {
        url: 'contract/contract/detail',
        codeRight: USER_PERMISSION.CONTACT_CONTRACT_UPDATE
    },

]