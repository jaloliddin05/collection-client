import { environment } from '../../../environment';

const USER = `${environment.apiUrl}/user`;
const AUTH = `${environment.apiUrl}/auth`;
const COLLECTION = `${environment.apiUrl}/collection`;
const ITEM = `${environment.apiUrl}/item`;
const TAG = `${environment.apiUrl}/tag`;
const COMMENT = `${environment.apiUrl}/comment`;

export default { USER, COLLECTION, ITEM, TAG, AUTH, COMMENT };
