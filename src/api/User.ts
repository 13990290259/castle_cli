import Request from 'castle-request'
class User extends Request {
    _pk = "UID"
    async relogin() {
        return false;
    }
    async getMyPermission() {
        return [];
    }
    async logout() { }
    async login() { }
}
const r = new User();
export default r