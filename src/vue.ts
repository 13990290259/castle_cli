import Vue from 'vue'
export default class vue extends Vue {
    public $cookie: Cookie | any
    $Message: any = {}
    static $layer: any;
    static $notify: any;

}
interface CookieOption {
    domain: string,
    expires?: number | string
}
interface Cookie {
    set(key: string, val: string, option: CookieOption): boolean;
    delete(key: string, option: CookieOption): boolean;
    get(key: string): string;
}