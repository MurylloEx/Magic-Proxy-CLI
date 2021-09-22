"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBitsFromRoles = exports.getRolesFromBits = exports.RoleValues = exports.Roles = void 0;
exports.Roles = {
    Manager: 'manager',
    Administrator: 'admin'
};
exports.RoleValues = Object.values(exports.Roles);
function getRolesFromBits(role) {
    let roleKeys = [];
    exports.RoleValues.map((v, k) => {
        if ((role & Math.pow(2, k)) == Math.pow(2, k))
            roleKeys.push(k);
    });
    return roleKeys.map(v => exports.RoleValues[v]);
}
exports.getRolesFromBits = getRolesFromBits;
function getBitsFromRoles(roles) {
    let roleBits = roles.map((v, k) => {
        let index = exports.RoleValues.indexOf(v.toLocaleLowerCase());
        return index != -1 ? Math.pow(2, index) : 0;
    });
    return roleBits.reduce((a, b) => a + b, 0);
}
exports.getBitsFromRoles = getBitsFromRoles;
//# sourceMappingURL=roles.enum.js.map